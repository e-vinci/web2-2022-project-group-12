create table users 
(
    id_user serial         not null
        constraint users_pk primary key,
    firstname varchar(150)      not null,
    lastname varchar(150)       not null,
    email varchar(150)          not null,
    password char(60)           not null
);
create table products
(
    id_product serial         not null
        constraint users_pk primary key,
    productname varchar(150)      not null,
    type varchar(150)       not null,
    prix varchar(150)          not null
    
);