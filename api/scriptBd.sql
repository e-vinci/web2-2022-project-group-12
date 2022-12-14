DROP SCHEMA IF EXISTS projetWeb CASCADE;

CREATE SCHEMA projetWeb;

CREATE TABLE  projetWeb.users(
    id_user SERIAL PRIMARY KEY,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    sex varchar(1) not null,
    email varchar(100) not null UNIQUE,
    password varchar(60) not null,
    is_admin boolean not null DEFAULT false
);

CREATE TABLE  projetWeb.photos_users(
    id_photo SERIAL PRIMARY KEY,
    url varchar(50) not null,
    id_user int not null UNIQUE,
    FOREIGN KEY (id_user) REFERENCES projetWeb.users(id_user)
);

CREATE TABLE  projetWeb.ratings(
    id_store int not null,
    id_user int not null,
    rating int not null,
    FOREIGN KEY (id_store) REFERENCES projetWeb.users(id_user),
    FOREIGN KEY (id_user) REFERENCES projetWeb.users(id_user),
    PRIMARY KEY (id_user,id_store)
);

CREATE TABLE  projetWeb.adresses(
    id_adress SERIAL PRIMARY KEY,
    country varchar(50) not null,
    city varchar(50) not null,
    zip_code varchar(50) not null,
    street varchar(100) not null,
    number varchar(10) not null
);

CREATE TABLE  projetWeb.seller(
    id_user int not null,
    store_name varchar(50) not null,
    id_adress int not null UNIQUE,
    FOREIGN KEY (id_user) REFERENCES projetWeb.users (id_user),
    FOREIGN KEY (id_adress) REFERENCES projetWeb.adresses (id_adress),
    PRIMARY KEY (id_user)
);

CREATE TABLE projetWeb.categories(
    id_category SERIAL PRIMARY KEY,
    name varchar(50),
    id_superior_cat int null,
    FOREIGN KEY (id_superior_cat) REFERENCES projetWeb.categories(id_category)
);

CREATE TABLE projetWeb.products(
    id_product SERIAL PRIMARY KEY,
    name varchar(100) not null,
    price float not null,
    description varchar(500) not null,
    color varchar(100) null,
    id_user int not null,
    id_category int not null,
    FOREIGN KEY (id_user) REFERENCES projetWeb.users(id_user),
    FOREIGN KEY (id_category) REFERENCES projetWeb.categories(id_category)
);

CREATE TABLE  projetWeb.photos_products(
    id_photo SERIAL PRIMARY KEY,
    url varchar(50) not null,
    id_product int not null,
    FOREIGN KEY (id_product) REFERENCES projetWeb.products(id_product)
);

CREATE TABLE projetWeb.product_reviews(
    id_review SERIAL PRIMARY KEY,
    message varchar(500) not null,
    id_user int not null,
    id_product int not null,
    FOREIGN KEY (id_user) REFERENCES projetWeb.users(id_user),
    FOREIGN KEY (id_product) REFERENCES  projetWeb.products(id_product)
);

CREATE TABLE projetWeb.review_answers(
    id_answer SERIAL PRIMARY KEY,
    message varchar(500) not null,
    id_user int not null,
    id_review int not null,
    FOREIGN KEY (id_user) REFERENCES projetWeb.users(id_user),
    FOREIGN KEY (id_review) REFERENCES projetWeb.product_reviews(id_review)
);

CREATE TABLE projetWeb.orders(
    id_order SERIAL PRIMARY KEY,
    id_user int not null,
    FOREIGN KEY (id_user) REFERENCES projetWeb.users(id_user)
);

CREATE TABLE projetWeb.order_products(
    id_order int not null,
    id_product int not null,
    quantity int not null,
    price float not null,
    FOREIGN KEY (id_order) REFERENCES projetWeb.orders(id_order),
    FOREIGN KEY (id_product) REFERENCES projetWeb.products(id_product),
    PRIMARY KEY (id_order,id_product)
);