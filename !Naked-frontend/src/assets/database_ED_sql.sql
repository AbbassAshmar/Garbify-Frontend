CREATE TABLE "public.Products" (
	"id" serial NOT NULL,
	"new_field" integer NOT NULL,
	"category_id" integer NOT NULL,
	"size" integer NOT NULL,
	"color" VARCHAR(255) NOT NULL,
	"date" DATETIME NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	CONSTRAINT "Products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.size" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"unit" TEXT NOT NULL,
	CONSTRAINT "size_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.color" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	CONSTRAINT "color_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.category" (
	"id" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	"parent" integer,
	CONSTRAINT "category_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.images" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"color" integer NOT NULL,
	"size" integer NOT NULL,
	"isThumbnail" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sales" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"discount" DECIMAL NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "sales_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.reviews" (
	"id" serial NOT NULL,
	"product_rating" integer NOT NULL DEFAULT '5',
	"user_height" integer,
	"user_weight" integer,
	"date" DATE NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"text" TEXT NOT NULL,
	"size_id" integer NOT NULL,
	"color_id" integer NOT NULL,
	"title" VARCHAR(255) NOT NULL,
	"helpful_count" integer NOT NULL DEFAULT '0',
	CONSTRAINT "reviews_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"password" TEXT NOT NULL,
	"remember_token" TEXT NOT NULL,
	"created_at" DATETIME NOT NULL,
	"updated_at" DATETIME NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"email_verified_at" DATETIME NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.reviews_images" (
	"id" serial NOT NULL,
	"review_id" integer NOT NULL,
	"image_url" TEXT NOT NULL UNIQUE,
	CONSTRAINT "reviews_images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.reviews_users" (
	"id" serial NOT NULL,
	"review_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "reviews_users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.alternative_sizes" (
	"id" serial NOT NULL,
	"size_id" integer NOT NULL,
	"size" TEXT NOT NULL,
	"unit" TEXT NOT NULL,
	CONSTRAINT "alternative_sizes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.personal_access_tokens" (
	"id" serial NOT NULL,
	"tokenable_id" integer NOT NULL,
	"tokenable_type" VARCHAR(255) NOT NULL,
	"token" integer NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"abilities" VARCHAR(255) DEFAULT '['client']',
	"created_at" DATETIME,
	"last_used_at" DATETIME,
	"updated_at" DATETIME,
	CONSTRAINT "personal_access_tokens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.orders" (
	"id" serial NOT NULL,
	"status" integer DEFAULT 'pending',
	"shipping_address_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"shipping_method_id" integer NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.shipping_addresses" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"country" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT,
	"email" TEXT NOT NULL,
	"phone_number" TEXT NOT NULL,
	"recipient_name" TEXT NOT NULL,
	"created_at" DATETIME,
	"updated_at" DATETIME,
	CONSTRAINT "shipping_addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.order_details" (
	"id" serial NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"product_quantity" integer NOT NULL,
	"color_id" integer NOT NULL,
	"size_id" integer NOT NULL,
	"total_price" integer NOT NULL,
	CONSTRAINT "order_details_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.shipping_methods" (
	"id" serial NOT NULL,
	"price" integer NOT NULL,
	"min_days" integer NOT NULL,
	"max_days" integer NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "shipping_methods_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Products" ADD CONSTRAINT "Products_fk0" FOREIGN KEY ("category_id") REFERENCES "category"("id");
ALTER TABLE "Products" ADD CONSTRAINT "Products_fk1" FOREIGN KEY ("size") REFERENCES "size"("id");
ALTER TABLE "Products" ADD CONSTRAINT "Products_fk2" FOREIGN KEY ("color") REFERENCES "color"("id");




ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("product_id") REFERENCES "Products"("id");
ALTER TABLE "images" ADD CONSTRAINT "images_fk1" FOREIGN KEY ("color") REFERENCES "color"("id");
ALTER TABLE "images" ADD CONSTRAINT "images_fk2" FOREIGN KEY ("size") REFERENCES "size"("id");

ALTER TABLE "sales" ADD CONSTRAINT "sales_fk0" FOREIGN KEY ("product_id") REFERENCES "Products"("id");

ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("product_id") REFERENCES "Products"("id");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk2" FOREIGN KEY ("size_id") REFERENCES "size"("id");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk3" FOREIGN KEY ("color_id") REFERENCES "color"("id");


ALTER TABLE "reviews_images" ADD CONSTRAINT "reviews_images_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id");

ALTER TABLE "reviews_users" ADD CONSTRAINT "reviews_users_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id");
ALTER TABLE "reviews_users" ADD CONSTRAINT "reviews_users_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "alternative_sizes" ADD CONSTRAINT "alternative_sizes_fk0" FOREIGN KEY ("size_id") REFERENCES "size"("id");

ALTER TABLE "personal_access_tokens" ADD CONSTRAINT "personal_access_tokens_fk0" FOREIGN KEY ("tokenable_id") REFERENCES "users"("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk2" FOREIGN KEY ("shipping_method_id") REFERENCES "shipping_methods"("id");

ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "order_details" ADD CONSTRAINT "order_details_fk0" FOREIGN KEY ("order_id") REFERENCES "orders"("id");
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_fk1" FOREIGN KEY ("product_id") REFERENCES "Products"("id");
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_fk2" FOREIGN KEY ("color_id") REFERENCES "color"("id");
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_fk3" FOREIGN KEY ("size_id") REFERENCES "size"("id");


















