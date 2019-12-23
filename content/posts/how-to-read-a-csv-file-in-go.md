
+++
title = "How to read a csv file in go"
date = "2016-08-30"
author = " "
cover = ""
description = ""
category = ["golang"]
+++

One of the most common task for a programmer is either to read or write a csv file 

  ### Read a csv file

  package main import ( "bufio" "encoding/csv" "os" "fmt" "io" ) func main() { // Load a csv file. f, \_ := os.Open("/path/to/my/csv/file.csv") // Create a new reader. r := csv.NewReader(bufio.NewReader(f)) //define seperator r.Comma = ',' for { record, err := r.Read() // Stop at EOF. if err == io.EOF { break } // Display record. fmt.Println(record) // ... Display record length. fmt.Println(len(record)) // ... Display all individual elements of the slice. for value := range record { fmt.Printf(" %v\n", record[value]) } } }  



