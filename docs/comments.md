### Comments
- I couldn't create the [indexes concurrently](https://www.postgresql.org/docs/current/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY) because the ORM doesn't yet provide stable support for this. I consider it a good practice to not crash large tables.



