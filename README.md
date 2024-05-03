# ts-orders-service

### Problem statement
We have to implement a system to automate the calculation of merchants’ disbursements payouts and seQura commissions for existing, present in the CSV files, and new orders.

The system must comply with the following requirements:
- All orders must be disbursed precisely once.
- Each disbursement, the group of orders paid on the same date for a merchant, must have a unique alphanumerical reference.
- Orders, amounts, and fees included in disbursements must be easily identifiable for reporting purposes.

The disbursements calculation process must be completed, for all merchants, by 8:00 UTC daily, only including those merchants that fulfill the requirements to be disbursed on that day. Merchants can be disbursed daily or weekly. We will make weekly disbursements on the same weekday as their live_on date (when the merchant started using seQura, present in the CSV files). Disbursements groups all the orders for a merchant in a given day or week.

For each order included in a disbursement, seQura will take a commission, which will be subtracted from the merchant order value gross of the current disbursement, following this pricing:
- 1.00 % fee for orders with an amount strictly smaller than 50 €.
- 0.95 % fee for orders with an amount between 50 € and 300 €.
- 0.85 % fee for orders with an amount of 300 € or more.

_Remember that we are dealing with money, so we should be careful with related operations. In this case, we should round up to two decimals following._

Lastly, on the first disbursement of each month, we have to ensure the `minimum_monthly_fee` for the previous month was reached. The `minimum_monthly_fee` ensures that seQura earns at least a given amount for each merchant.

When a merchant generates less than the `minimum_monthly_fee` of orders’ commissions in the previous month, we will charge the amount left, up to the `minimum_monthly_fee` configured, as “monthly fee”. Nothing will be charged if the merchant generated more fees than the `minimum_monthly_fee`.

Charging the `minimum_monthly_fee` is out of the scope of this challenge. It is not subtracted from the disbursement commissions. Just calculate and store it for later usage.

We expect you to:

- Create the necessary data structures and a way to persist them for the provided data. You don’t have to follow CSV’s schema if you think another one suits you better.
- Calculate and store the disbursements following described requirements for all the orders included in the CSV, and prepare the system to do the same for new orders.
- Fill the following table and include it in the README.  

| Year  | Number of disbursements | Amount disbursed to merchants | Amount of order fees | Number of monthly fees charged (From minimum monthly fee) | Amount of monthly fee charged (From minimum monthly fee) |
| ------------- |-------------------------|-------------------------------|----------------------|-----------------------------------------------------------|----------------------------------------------------------| 
| 2022  | -                       | - €                           | - €                  | -                                                         | - €                                                      |
| 2023  | -                       | - €                           | - €                  | -                                                         | - €                                                      |

_Note that the table values are samples, not the correct numbers._

### Made with:
- Open API Documentation generate with [Swagger](https://swagger.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [Metabase](https://www.metabase.com/)

### Steps to run
- Up containers `docker-compose up`

### Available Scripts
- Run tests: `docker-compose run api npm test`
  - Or if you want, you can run outside container(make sure that you have performed `npm i` before): `npm test`
- Migrations are created (make sure that you have performed `npm i` before)Create migration: `typeorm migration:create ./src/migrations/NAME`

### Documentation
- [Comments](./docs/comments.md)
- [Next-Steps](./docs/next-steps.md)
