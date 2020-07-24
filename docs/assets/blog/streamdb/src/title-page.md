# StreamDB
*By Mark Sherer and (hopefully) others*

StreamDB is a DBMS that aims to provide regular DBMS capability as well as additional streaming functionality. Specifically, I hope to solve the problem of providing constantly-refreshing data to consumers. Although constantly refreshing is usually a fine solution for many applications, it can consume too much CPU, increase latency, and be overall less efficient for high throughput systems. I want to provide a better solution for these systems.