create table if not exists merchants
(
    id         uuid                                   not null primary key,
    reference text unique                             not null,
    email  text    unique                             not null,
    live_on      date                                 not null,
    disbursement_frequency  text not null,
    minimum_monthly_fee  numeric(3, 1) not null default 0.0
);

COPY merchants FROM '/docker-entrypoint-initdb.d/merchants.csv' DELIMITER ';' CSV HEADER;

create table if not exists orders
(
    id         text                                   not null primary key,
    merchant_reference text                              not null,
    amount  numeric(5, 2) not null default 0.0,
    created_at  date not null default NOW(),
    CONSTRAINT fk_merchant
    FOREIGN KEY(merchant_reference)
    REFERENCES merchants(reference)
);

COPY orders FROM '/docker-entrypoint-initdb.d/orders.csv' DELIMITER ';' CSV HEADER;

CREATE DATABASE metabase;
