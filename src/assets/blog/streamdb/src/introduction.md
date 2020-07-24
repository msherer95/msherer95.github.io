# Introduction

## Who Am I

I'm not any of the things typically associated with this type of project. I'm not a database expert, nor a systems engineer. I'm a self-taught, full-stack-ish web developer. I add the *ish* because I don't spend much time on the typical backend part of the stack nowadays; I'm mostly working with TypeScript and SQL Server all day. And software engineers always seem to get super angry when `fullstack` appears, so I'm a bit scared to use it here.

Anyway, my point is that I don't typically build databases. I started software engineering because I hated using ubiquitously awful webapps and wanted to design elegant, intuitive ones. I originally thought the concept of `Big Data` was kind of boring. That is, until a significant portion of my job became writing and optimizing SQL queries, and eventually managing a SQL Server instance. 

To be clear, I never played with the true definition of `Big Data`. I never did the whole distributed thing, or worked with pentabytes of data at Facebook. I just had lots of SQL data that needed to be queried at [webapp-level speed](https://www.hobo-web.co.uk/your-website-design-should-load-in-4-seconds/). So I became interested in making data fast, and got over my `Big Data` boredom.

## Project Overview

Like any good blog post, I'll give an overview of what I'm doing and hope you're still interested after the next couple of paragraphs. 

I wanted to work on something new and interesting. Something that'll help me grow as a developer and will produce an interesting product. I'm not trying to make anything production worthy, just a from-scratch system that's different from what I make at work.

A database management system (DBMS) seemed like a good project for this. It would let me work with systems-level concepts and languages, multithreading, complicated algorithms, all that good stuff. And it lets me explore my newly found interest in making data fast.

At first I figured I'd just make a very basic version of SQL Server, just to get a general understanding of how it worked. But I always find clones kind of boring, so instead I wanted to make it a bit more interesting by making a streaming database called `streamdb`. 

At it's core, it's just a typical DBMS, enhanced with a persistent connection feature that autorefreshes your data. Usually, you create a short-lived connection to your database that closes when your query returns some data. As a result, if you're relying on constantly-refreshing data, such as financial transactions, medical data, or IoT devices, you have to refresh (that is, re-query) the data on a timer. This presents several issues. 

1. You have to consume way too much CPU on each refresh cycle by rerunning the entire query. 
2. You might have to run your query even if your database hasn't changed. 
3. Multiple queries can't utilize their shared components effectively.

For the last part, think about a scenario where three separate queries all have the following subquery:

```SQL
    SELECT * FROM dbo.Users
    WHERE AddedDate > '10/1/2019'
```

We typically have to re-run that subquery for all those queries, rather than caching and reusing its results. Doesn't that seem inefficient? 

So I figured instead of making a typical DBMS, I'd create an altered version that's optimized for those scenarios. We could create a persistent connection, and send updated query results whenever available. This way, we eliminate timers, and only run query updates when needed. This not only saves us CPU usage, but allows data refreshes to be much faster, since they're not waiting for a timer cycle to complete. 

Let's try to conceptually optimize a little further. Instead of rerunning the query on the entire dataset each time, what if we could only rerun it with the newly added data. That is, whenever we get new data potentially pertaining to our query, we only rerun the query on that data. We maintain all query result changes, and simply combine past changes with the new change we just computed to determine our entire new result set. Admittedly, this seems a little abstract right now, but I'll describe it more in future posts. For now, think of combining these past changes as a similar process to rebuilding a typical SQL database from the transaction log. If that doesn't help, wait for the future posts.

Going back to that subquery result sharing, if we have three queries on persistent connections all relying on the same subquery, sharing subquery results seems relatively intuitive. These queries are refreshed with the same newly-added data, so we can safetly cache subquery results for all to-be-updated queries. 

Let's take this a touch further. Imagine we have a system with lots of persistent queries, many of which share subqueries. Since we can only run so many queries at once, we should run the queries that'll create the most shared-subquery cache results first, to avoid duplicate work as much as possible. I want to explore creating a subquery dependency graph, sorting it (topological sort for you fancy engineers), and using that sort as a guide for the query scheduler. There'll be plenty of other constraints, hence I say *as a guide*. 

## Language of Choice

I thought about this for a while. Most people seem to use C++ (RocksDb, MySQL, SQL Server) or C (Redis) for DB-related projects. After some research, I decided to throw Rust into the mix as well. Everyone was saying it was a great, modern alternative to C++. 

I've never used any of these languages, so take my reviews and decisions with a grain of salt. I instantly knocked out C. It's extreme low-levelness didn't seem necessary for this type of project, but it's lack of safety and organizational features seemed to be a pain. I was then choosing between C++ and Rust. Both are roughly comparable in speed and low-levelness. C++ is huge, with tons of features and a big community. Sure, it lacks memory safety, but lots of projects have used it successfully regardless. Rust is modern, very safe, but not nearly as big or full-featured. Honestly, these general overviews weren't enough for me, so I read a book about each language. 

I started with  *A Tour of C++* by Bjarne Stroustrup. Coming from TypeScript and C#, C++ seemed pretty unpleasant. Despite the convenience and familiarity of object-orientedness, C++ seemed overwhemlingly enormous. After reading the book, I could write basic C++ code, but understanding best practices and making design decisions seemed like extremely time-consuming learning processes. Coupled with the fact that there'd be lots and lots of learning about algorithms, operating systems, db systems, I didn't want to devote quite this much energy towards learning the language used in this project.

So I eagerly read [The Rust Book](https://doc.rust-lang.org/book/). At first, I was annoyed by the lack of object-orientated features, but quickly learned to appreciate Rust's view on composition over inheritence. It doesn't feel quite as reusable, but it feels very clear. Inheritence definitely has the potential to obscure implementation, whereas composition feels consistently transparent. Rust felt cleaner, smaller, and easier to digest than C++, while maintaining a sufficiently large feature set for this project. So I chose it. I felt like I could learn it faster, write cleaner, more best practice-focused code, and feel safer about my heavily multithreaded code. 

## Whom This is For

I want to say everyone. I really do. But I will expect some things from my readers. Specifically, I will expect basic algorithmic familiarity and a general understanding of SQL systems. You don't have to know how they work, you just have to have a rough idea of how to use one. If you've written SQL queries, you'll probably be set. I'll try to explain everything from the ground up, but a lot of concepts here are complicated, and I can't truly start groundup for everything and keep my posts sufficiently concise.

## Post Organization

Aside from this post, I want to have a very specific post structure to make it easier to read, skim, or skip around each post. There will be a couple core sections:

1. **Background:** Concepts, other people ideas, papers, books. All the stuff that led me to my own thoughts.
2. **How Others Did It:** Implementation discussions from other systems.
3. **Thoughts:** A discussion on my goals and implementation thoughts.
4. **Implentations:** My own code and implementation details. This will directly parallel the thoughts section.

I want to say that the most important sections are probably **Background** and **Thoughts**. All of my reasoning is based on other people's research, so my conclusions won't be entirely clear without **Background**. The core of the posts will be **Thoughts**, so please read those. **Implementation** details are only important if you want a more technical discussion, and to see my code snippets. You can understand most concepts without code snippets, so these sections aren't strictly necessary. 

I'll also include posts that are entirely focused on the theory needed for major parts of the project. 

## Final Thoughts

I'm only interested in the data-relevant parts of a DBMS. That is, the storage engine (storing and retrieving data chunks from disk), and the query engine (scheduling queries, subqueries, execution dataflows). I'm not very interested in language parsers, so I'm going to use some SQL parser library. I'm also not very interested in byte serialization, so I'm going to use a library for that as well. 

But I want to write all the other core sections completely from scratch. Yes, I can likely grab a more efficient and robust implementation of some algorithm from a library, but the point of this project is education, not productionalization. 

I think a lot of this stuff is pretty confusing and complicated. I'm going to try to explain everything as plainly and clearly as possible at first, the way I wish it had been explained to me. 

## Next Post

I'm going to start the project by writing the storage engine, which will effectively be a minimal RocksDb clone. Many concepts and implementation ideas will be taken directly from there. In the next post, I'll introduce the LSM tree, which will serve as my core data structure 

