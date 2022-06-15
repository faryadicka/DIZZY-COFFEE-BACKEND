-- public.blacklist_token definition

-- Drop table

-- DROP TABLE public.blacklist_token;

CREATE TABLE public.blacklist_token (
	id int8 NOT NULL,
	"token" varchar NOT NULL,
	CONSTRAINT balcklist_token_pk PRIMARY KEY (id)
);


-- public.category definition

-- Drop table

-- DROP TABLE public.category;

CREATE TABLE public.category (
	id int8 NOT NULL,
	category varchar(11) NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT category_product_pk PRIMARY KEY (id)
);


-- public.delivery_methods definition

-- Drop table

-- DROP TABLE public.delivery_methods;

CREATE TABLE public.delivery_methods (
	id int8 NOT NULL,
	delivery_name varchar NULL,
	created_at timestamp NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT delivery_methods_products_pk PRIMARY KEY (id)
);


-- public.payment_methods definition

-- Drop table

-- DROP TABLE public.payment_methods;

CREATE TABLE public.payment_methods (
	id int8 NOT NULL,
	pay_method varchar(25) NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT payment_method_pk PRIMARY KEY (id)
);


-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	id bigserial NOT NULL,
	name varchar(50) NOT NULL,
	price int4 NOT NULL,
	image text NULL,
	description text NULL,
	start_hour time NULL,
	end_hour time NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	category_id int4 NULL,
	delivery_info text NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);


-- public.promos definition

-- Drop table

-- DROP TABLE public.promos;

CREATE TABLE public.promos (
	id bigserial NOT NULL,
	discount int4 NOT NULL,
	description text NOT NULL,
	available_start timestamp NOT NULL,
	available_end timestamp NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	coupon varchar NOT NULL,
	size_id int4 NOT NULL,
	products_id int4 NOT NULL,
	image text NULL,
	CONSTRAINT promos_pk PRIMARY KEY (id)
);


-- public."role" definition

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE public."role" (
	id bigserial NOT NULL,
	role_type varchar NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	CONSTRAINT role_pk PRIMARY KEY (id)
);


-- public."size" definition

-- Drop table

-- DROP TABLE public."size";

CREATE TABLE public."size" (
	id serial4 NOT NULL,
	"size" varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	CONSTRAINT size_pk PRIMARY KEY (id)
);


-- public.transactions definition

-- Drop table

-- DROP TABLE public.transactions;

CREATE TABLE public.transactions (
	quantity int4 NULL,
	payment_methods varchar(10) NULL,
	"size" varchar(10) NOT NULL,
	products_id int4 NULL,
	users_id int4 NULL,
	total varchar NULL,
	subtotal varchar NULL,
	shipping varchar NULL,
	tax_and_fees varchar NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	id bigserial NOT NULL,
	category_id int4 NULL,
	delivery_methods varchar(18) NULL,
	"time" varchar NOT NULL,
	address varchar(256) NULL,
	phone varchar(15) NULL,
	deleted_at timestamp NULL,
	CONSTRAINT transactions_pk PRIMARY KEY (id)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	display_name varchar(100) NULL,
	address varchar(150) NULL,
	phone varchar(20) NOT NULL,
	image_profile text NULL,
	birthdate varchar(10) NULL,
	gender varchar(10) NULL,
	first_name varchar(20) NULL,
	last_name varchar(20) NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL,
	email varchar(100) NOT NULL,
	"password" varchar NOT NULL,
	id bigserial NOT NULL,
	role_id int4 NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);
