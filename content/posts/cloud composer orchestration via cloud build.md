### Cloud composer orchestration via cloud build

Google cloud composer is a managed [apache airflow](https://airflow.apache.org/) service that helps create, schedule, monitor and manage workflows.Cloud Composer automation helps you create Airflow environments quickly and use Airflow-native tools, such as the powerful Airflow web interface and command line tools, so you can focus on your workflows and not your infrastructure.

In this article I will descibe how an engineering team can manage, develop and publish [DAGS](https://airflow.apache.org/docs/stable/concepts.html) after running a full CI/CD build pipeline using google cloud build .

Lets imagine a typical engineering scenario:

1. Engineers break down a big process into series of small logical components or tasks.
2. Each  task is programmed as an operator in the dag.
3. Enginerring team  tests the dag locally and then copy it to composer (airflow) DAG folder.
4. Composer validates the dag and eventually it is ready to be run.

This generic process can suffer from various issues when multiple engineers are working continuesly speint after sprint, such as :

1. Deployment issues:

   e.g. Plugins used in development are not available in production

2. Dependency Errors.

   e.g. Enviroment Variables /connections required for DAG to run is not available in production

3. Processes errors.

   e.g Logical or programical errors in dag.

4. Lack of testing and automation.



Dags are code, hence must be treated as such, which means :

1. They should  be backed in repository such as GitHub.
2. Every PR should trigger automated tests before PR is reviewd by engineers.

2. Every merge/push to **test**, **uat** and **prod** branch must run a full suit of unit tests.

3. After successfull test, the dags must be automatically deployed to cloud composer.



### Google cloud composer folder structure

Cloud compose uses google cloud storage as its source and looks somethign like this

<img src="/img/image-20200513184510696.png" alt="image-20200513184510696" style="zoom:50%;" />

Dags go inside the **dags** folder, and same for **plugins** and **env_var.json**.

Airflow configuration must go in terraform if used.

### Developing a CI/CD Practice for Google Cloud Composer using Cloud Build

The idea here is to use github to back all the dags, use cloud build and preapre a docker image with airflow installed so that  tests can be run in docker cotainers.

The Benifits of this process are as follows

1. Faster development cycles of Airflow DAGs

2. Uniform repository structure within the team 

3. Reductions in errors when automating DAG deployments 

4. Faster to debug in the event of a failure
5. Code and configuration stay together in github and is tested and deployed using automation.



Here is an example docker file which creates airflow container to run tests against

```bash
FROM python:3.7

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
ENV AIRFLOW_HOME=/workspace/airflow
ENV AIRFLOW__CORE__LOAD_EXAMPLES=False
```

**requirements.txt** contains plugins and dependencies

```reStructuredText
werkzeug==0.15.4 # needed for airflow 1.10.3
apache-airflow[gcp,kubernetes,slack]==1.10.9
```

Git folder structure here resembles the folder structure used by composer in google cloud storage

<img src="/img/image-20200513185731807.png" alt="image-20200513185731807" style="zoom:50%;" />

Here is an example **cloudbuild.yaml** file

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  id: Pull docker cache
  entrypoint: 'bash'
  args:
  - '-c'
  - |
   docker pull gcr.io/$PROJECT_ID/airflow-dags-builder:latest || exit 0
- name: gcr.io/cloud-builders/docker
  id: Build Airflow DAGs Builder
  args: [
      'build',
      '-t', 'gcr.io/$PROJECT_ID/airflow-dags-builder',
      '--cache-from', 'gcr.io/$PROJECT_ID/airflow-dags-builder:latest',
      './'
    ]
- name: 'gcr.io/$PROJECT_ID/airflow-dags-builder'
  id: Validation Test
  # Validate the integrity of the DAG files.
  entrypoint: python
  env:
  - AIRFLOW__CORE__DAGS_FOLDER=/workspace/dags
  args:
  - -m
  - unittest
  - tests/dag_integrity_test.py

- name: gcr.io/cloud-builders/gsutil
  # Deploy the DAGs to your composer environment DAGs GCS folder
  id: Deploy DAGs
  args:
  - -m
  - rsync
  - -r
  - -c
  - -x
  - .*\.pyc|airflow_monitoring.py
  - dags
  - ${_DEPLOY_DAGS_LOCATION}/dags
images: ['gcr.io/$PROJECT_ID/airflow-dags-builder:latest']
```

The steps describe above are straight forward :

1. Pull or build airflow docker image using the described docker file.
2. run validation tests (in python inside the tests folder)
3. Deploy (rsync) the dags to the dag folder.
4. Extra steps can be added to rsync **env_vars.json** and **plugins** if required.



Sample Dag integrity test

```python
"""
DAG Integrity Tests
"""
import os
import unittest
from airflow.models import DagBag, Variable
 

class TestDags(unittest.TestCase):
    """DAG Test Case"""

    LOAD_THRESHOLD_SECONDS = 2

    def setUp(self):
        os.system("airflow initdb")
        for v in ["sample_var",
        "sample_var2", 
        "slack_channel",
        "slack_token",
        "slack_username",
        "slack_icon_url"]:
            Variable.set(v,v)
        self.dagbag = DagBag()

    def test_dags_syntax(self):
        """Assert DAG bag load correctly"""
        for key in self.dagbag.dags:
            print(key)
        self.assertFalse(
            len(self.dagbag.import_errors),
            f"DAG import errors. Errors: {self.dagbag.import_errors}")


if __name__ == '__main__':
    
    SUITE = unittest.TestLoader().loadTestsFromTestCase(TestDags)
    unittest.TextTestRunner(verbosity=2).run(SUITE)
```

### Running locally using google cloud build

Google cloud build can be used to run this locally if required

Install reps for running cloud build on you local machine

```bash
gcloud components install docker-credential-gcr
gcloud auth configure-docker
gcloud components install cloud-build-local
```

Run Build

```bash
mkdir -p /tmp/dags
mkdir -p /tmp/plugins
cloud-build-local \
	 --config=cloudbuild.yaml --dryrun=false \
	 --substitutions=_DEPLOY_DAGS_LOCATION=/tmp .
```

This will build and test the repo and deploy dags to tmp folder. 



Cloud build can eventually be used to act on a git trigger and deploy dags, variables and config to composer.