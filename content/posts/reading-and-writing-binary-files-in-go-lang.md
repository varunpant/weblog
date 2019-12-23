
+++
title = "reading and writing binary files in go lang"
date = "2017-08-29"
author = " "
cover = ""
description = ""
category = ["golang"]
+++

Reading and writing binary files can often be a fast and very efficient alternatives to csv. They obviously have their challenges, however in this post I intent to present a very basic example of saving models (struct) into binary file and later reading it.

  

```python
package main

import (
	"log"
	"os"
	"encoding/binary"
	"bytes"
	"fmt"
	"math/rand"
	"time"
)

//this type represnts a record with three fields
type payload struct {
	One float32
	Two float64
	Three uint32
}

func main() {

	writeFile()
	readFile()

}

func readFile() {

	file, err := os.Open("test.bin")
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}

	m := payload{}
	for i := 0; i < 10; i++ {
		data := readNextBytes(file, 16)
		buffer := bytes.NewBuffer(data)
		err = binary.Read(buffer, binary.BigEndian, &m)
		if err != nil {
			log.Fatal("binary.Read failed", err)
		}

		fmt.Println(m)
	}

}

func readNextBytes(file *os.File, number int) []byte {
	bytes := make([]byte, number)

	\_, err := file.Read(bytes)
	if err != nil {
		log.Fatal(err)
	}

	return bytes
}

func writeFile() {
	file, err := os.Create("test.bin")
	defer file.Close()
	if err != nil {
		log.Fatal(err)
	}

	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	for i := 0; i < 10; i++ {


		s := &payload{
			r.Float32(),
			r.Float64(),
			r.Uint32(),
		}
		var bin\_buf bytes.Buffer
		binary.Write(&bin\_buf, binary.BigEndian, s)
		//b :=bin\_buf.Bytes()
		//l := len(b)
		//fmt.Println(l)
		writeNextBytes(file, bin\_buf.Bytes())

	}
}
func writeNextBytes(file *os.File, bytes []byte) {

	\_, err := file.Write(bytes)

	if err != nil {
		log.Fatal(err)
	}

}



```
  The code presented above will randomly populate 10 records of type payload and save it to a binary file, then it will read those 10 records as well. 

 ### Performance

 To see how long it takes to create and then read 10000000 records try changeing the 10 to 10000000 and then building an executable by running go build filename.go, once built execute by typing time ./filename

 on my macbook pro it took  0m35.433s to generate and then read all records (without priniting them on shell) 

```real    0m35.433s
user    0m16.713s
sys     0m19.031s

```
   hope this helps. 



