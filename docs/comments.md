### Comments
- I couldn't create the [indexes concurrently](https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY) because the ORM doesn't yet provide stable support for this. I consider it a good practice to not crash large tables.
- I chose to use the CSV structure as it fits the requirements but probably in the real world I would like to have all id's as `UUID` type.
- For reports, I chose to use Metabase because it is open source and provides several reporting options. It is available on [port 400](http://localhost:4000).



