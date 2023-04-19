set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."products" (
	"productId"          serial,
	"name"               TEXT        NOT NULL,
	"price"              DECIMAL     NOT NULL,
	"description"        TEXT        NOT NULL,
	"minPlayers"         int         NOT NULL,
	"maxPlayers"         int         NOT NULL,
	"imageUrl"           TEXT        NOT NULL,
	"thumbUrl"           TEXT        NOT NULL,
	"primaryPublisher"   TEXT        NOT NULL,
	"primaryDesigner"    TEXT        NOT NULL,
	CONSTRAINT "product_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."customerAccounts" (
	"customerId"         serial,
	"firstName"          TEXT        NOT NULL,
	"lastName"           TEXT        NOT NULL,
	"email"              TEXT        NOT NULL,
	"address"            TEXT        NOT NULL,
	"state"              TEXT        NOT NULL,
	"city"               TEXT        NOT NULL,
	"zipCode"            TEXT        NOT NULL,
	"username"           TEXT        NOT NULL,
	"password"           TEXT        NOT NULL,
	CONSTRAINT "customerAccounts_pk" PRIMARY KEY ("customerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId"             serial,
	"customerId"         int         NOT NULL,
	"productId"          int         NOT NULL,
	"quantity"           int         NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."wishlist" (
	"wishlistId"         serial,
	"customerId"         int         NOT NULL,
	"productId"          int         NOT NULL,
	CONSTRAINT "wishlist_pk" PRIMARY KEY ("wishlistId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."adminAccounts" (
	"adminId"            serial,
	"firstName"          TEXT        NOT NULL,
	"lastName"           TEXT        NOT NULL,
	"email"              TEXT        NOT NULL,
	"username"           TEXT        NOT NULL,
	"password"           TEXT        NOT NULL,
	CONSTRAINT "adminAccounts_pk" PRIMARY KEY ("adminId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId"            serial,
	"customerId"         int         NOT NULL,
	"total"              DECIMAL     NOT NULL,
	"status"             TEXT        NOT NULL,
	"createdAt"          TIMESTAMP   NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orderContents" (
	"orderContentsId"    serial,
	"orderId"            int         NOT NULL,
	"name"               TEXT        NOT NULL,
	"price"              DECIMAL     NOT NULL,
	"description"        TEXT        NOT NULL,
	"minPlayers"         int         NOT NULL,
	"maxPlayers"         int         NOT NULL,
	"imageUrl"           TEXT        NOT NULL,
	"thumbUrl"           TEXT        NOT NULL,
	"primaryPublisher"   TEXT        NOT NULL,
	"primaryDesigner"    TEXT        NOT NULL,
	CONSTRAINT "orderContents_pk" PRIMARY KEY ("orderContentsId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."featuredProducts" (
	"featuredId"          serial,
	"productId"          int         NOT NULL,
	"thumbUrl"           text        NOT NULL,
	CONSTRAINT "featuredProducts_pk" PRIMARY KEY ("featuredId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("customerId") REFERENCES "customerAccounts"("customerId");
ALTER TABLE "cart" ADD CONSTRAINT "cart_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");

ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_fk0" FOREIGN KEY ("customerId") REFERENCES "customerAccounts"("customerId");
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("customerId") REFERENCES "customerAccounts"("customerId");

ALTER TABLE "orderContents" ADD CONSTRAINT "orderContents_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");

ALTER TABLE "featuredProducts" ADD CONSTRAINT "featuredProducts_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
