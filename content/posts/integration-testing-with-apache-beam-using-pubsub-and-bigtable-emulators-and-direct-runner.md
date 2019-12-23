
+++
title = "integration testing with apache beam using pubsub and bigtable emulators and direct runner"
date = "2018-08-03"
author = " "
cover = ""
description = ""
category = ["dataflow","apache-beam","java","google","bigdata","testing"]
+++

### Summary

 Recently I have been looking into ways to test my **Apache Beam** pipelines at work. Most common use cases of Beam generally involves either batch reading data from GCS and writing to analytical platforms such as Big Query or stream reading data from Pubsub and writing to perhaps Bigtable.

 A pipelines consists of transforms and its generally easy to test them in isolation as a independent unit test per stage, however I am personally a big fan of "end-to-end" testing or “Integration testing” and this is where things can sometimes get tricky.

  Apache beam has various [runners](https://beam.apache.org/documentation/runners/capability-matrix/), the" one of interest" for testing purposes is the [Direct runner](https://beam.apache.org/documentation/runners/direct/). 

 From the doc:

 
>  The Direct Runner executes pipelines on your machine and is designed to validate that pipelines adhere to the Apache Beam model as closely as possible. Instead of focusing on efficient pipeline execution, the Direct Runner performs additional checks to ensure that users do not rely on semantics that are not guaranteed by the model. Some of these checks include: 
>  * enforcing immutability of elements.
>  * enforcing encodability of elements.
>  * elements are processed in an arbitrary order at all points.
>  * serialization of user functions (DoFn, CombineFn, etc.)
>  
>   It’s also important to realise the memory considerations as mentioned below.

 
>  Local execution is limited by the memory available in your local environment. It is highly recommended that you run your pipeline with data sets small enough to fit in local memory. You can create a small in-memory data set using a Create transform, or you can use a Read transform to work with small local or remote files.   I am going to show an example where I have written a basic integration test which listens for some payload from pubsub emulator, transforms the data to Mutation and then writes it to BigTable emulator, there are no aggregations performed hence every thing works in global window and triggering of a write is immediate. This example can also serve as a good way to front your data warehouse with apache beam for dynamically scalable writing,i.e as the pubsub message load would increase, beam would add more workers and as the load would decrease beam would reduce the workers. 

 #### SetUp PubSub Emulator

 Guide is [here](https://cloud.google.com/pubsub/docs/emulator).

 ##### Code

 ```gcloud components install pubsub-emulator
gcloud components update
gcloud beta emulators pubsub start [options]

```
  optional step 

 ```$(gcloud beta emulators pubsub env-init)

```
 *You don’t need to run the optional step above as we would supply the url in the beam options. *

 #### SetUp BigTable Emulator

 Guide is [here](https://cloud.google.com/bigtable/docs/emulator).

 ##### Code

 ```gcloud components update beta
gcloud beta emulators bigtable start

```
 *This step is required if you want to use [cbt](https://cloud.google.com/bigtable/docs/cbt-overview) to point to BigTable to browse the data. *

 ```$(gcloud beta emulators bigtable env-init)

```
 ### Code

 Here are the steps involved in the pipeline.

 ```  		Pipeline p = Pipeline.create(options);

        p.apply("ReadPubsubMessages",
               
               PubsubIO.readMessages().fromSubscription(options.getSubscription()))

               .apply("ConvertMessageToBTMutation", new PubsubMessageToBigTableMutation())


                .apply("WriteToBigTable",

                        CloudBigtableIO.writeToTable(

                                getConfigurationForTable(options).withTableId(BIGTABLE\_TABLE\_ID).build()
                ));

        p.run().waitUntilFinish();

```
 The pipeline is triggered via main method which is extended to include a testing variable

 ```public interface EventListenerOptions extends StreamingOptions, PubsubOptions {
  
        @Description("Pub/Sub subscription to read from")
        @Validation.Required
        @Default.String("projects/test-project/subscriptions/evtsToBigTbl")
        String getSubscription();

        void setSubscription(String value);

        @Description("The Google Cloud project ID for the Cloud Bigtable instance.")
        @Validation.Required
        @Default.String("BT-PROD-PROJECT")
        String getBigtableProjectId();

        void setBigtableProjectId(String bigtableProjectId);

        @Description("The Google Cloud Bigtable instance ID .")
        @Validation.Required
        @Default.String("BT-PROD-INSTANCE")
        String getBigtableInstanceId();

        void setBigtableInstanceId(String bigtableInstanceId);


        @Description("For integration test.")
        @Validation.Required
        @Default.Boolean(true)
        Boolean getTesting();

        void setTesting(Boolean testing);


    }

```
 Insure that the project and instance id for bigtable matches those in the cofiguration file ~/.cbtrc for bigtable, you can check this by typing in cbt in the console.

 ``` EventListenerOptions options = PipelineOptionsFactory.fromArgs(args).withValidation()
                .as(EventListenerOptions.class);
        options.setProject("PubSubToBigTable");

        if (options.getTesting()) {

            options.setPubsubRootUrl(PUBSUB\_EMULATOR\_HOST);//must point to emulator http://localhost:8085
            options.setBigtableProjectId(BIGTABLE\_PROJECT\_ID);//must be the same as in ~/.cbtrc
            options.setBigtableInstanceId(BIGTABLE\_INSTANCE\_ID);//must be the same as in ~/.cbtrc

        }

        RunPipeLine(options);


```
 The intreseting bits are as follows

 ### Override PubsubOptions url in Beam

 This was easy, just make sure your options extend org.apache.beam.sdk.io.gcp.pubsub.PubsubOptions. This includes a method called options.setPubsubRootUrl, whcih then can be pointed to emulator. 

 ### Point beam to BigTable Emulator.

 This took me ages to figure out and eventually after digging in the code I was able to locate a bunch of properties which must be overridden.

 ```private static CloudBigtableTableConfiguration.Builder getConfigurationForTable(EventListenerOptions options) {

       CloudBigtableTableConfiguration.Builder config = new CloudBigtableTableConfiguration.Builder()
                .withProjectId(options.getBigtableProjectId())
                .withInstanceId(options.getBigtableInstanceId());
                
        if (options.getTesting()) {
            config.withConfiguration("google.bigtable.instance.admin.endpoint.host", "localhost")
                    .withConfiguration("google.bigtable.admin.endpoint.host", "localhost")
                    .withConfiguration("google.bigtable.endpoint.host", "localhost")
                    .withConfiguration("google.bigtable.endpoint.port", "8086")
                    .withConfiguration("google.bigtable.use.plaintext.negotiation", "true")
                    .withConfiguration("google.bigtable.grpc.read.partial.row.timeout.ms", "5000");
        }

        return config;


    }

```
 and thats it, calling  StarterPipeline.main(new String[]{"--testing=true", "--runner=DirectRunner"}); should do the trick.

 I will soon include full code.



