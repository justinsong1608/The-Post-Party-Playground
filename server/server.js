import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import authorizationMiddleware from './lib/authorization-middleware.js';
import pg from 'pg';
import ClientError from './lib/client-error.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// Gets the information for catalog page //
app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
      SELECT "productId",
             "name",
             "price",
             "description",
             "minPlayers",
             "maxPlayers",
             "imageUrl"
        FROM "products"
    `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Gets the featured products for carousel //
app.get('/api/featuredProducts', async (req, res, next) => {
  try {
    const sql = `
      SELECT "p"."imageUrl" as "imageUrl",
             "p"."name" as "name",
             "f"."featuredId" as "featuredId",
             "f"."productId" as "productId"
        FROM "products" as "p"
        JOIN "featuredProducts" as "f" USING ("productId")
    `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Gets the product details //
app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer!');
    }
    const sql = `
      SELECT "productId",
             "name",
             "price",
             "imageUrl",
             "description",
             "minPlayers",
             "maxPlayers"
        FROM "products"
       WHERE "productId" = $1
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `Cannot find the product that matches productId${productId}`);
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Searches for the product using the search bar //
app.get('/api/search', async (req, res, next) => {
  try {
    const searchTerm = req.query.term;
    if (!searchTerm) {
      throw new ClientError(400, 'search term is required');
    }
    const sql = `
      SELECT *
        FROM "products"
        WHERE "name" ILIKE $1
    `;
    const params = [`%${searchTerm}%`];
    const result = await db.query(sql, params);
    const searchedProducts = result.rows;
    if (result.rows.length === 0) {
      throw new ClientError(400, 'No related product found! Please search again!');
    }
    res.status(200).json(searchedProducts);
  } catch (err) {
    next(err);
  }
});

// Creating an account //
app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email, address, state, city, zipCode } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'Username and Password are required');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      INSERT INTO "customerAccounts" ("firstName", "lastName", "email", "address", "state", "city", "zipCode", "username", "hashedPassword")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING "customerId", "username", "firstName", "lastName", "email", "address", "state", "city", "zipCode"
    `;
    const params = [firstName, lastName, email, address, state, city, zipCode, username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// User signing in //
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'Username and Password are required');
    }
    const sql = `
      SELECT "customerId",
             "hashedPassword"
        FROM "customerAccounts"
       WHERE "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'Invalid Login');
    }
    const { customerId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'Invalid Login');
    }
    const payload = { customerId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(201).json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/* ⛔ Every route after this middleware requires a token! ⛔ */
app.use(authorizationMiddleware);

// Gets the cart products //
app.get('/api/cart', async (req, res, next) => {
  try {
    const { customerId } = req.user;
    const sql = `
      SELECT "p"."name" as "name",
             "p"."price" as "price",
             "p"."description" as "description",
             "p"."minPlayers" as "minPlayers",
             "p"."maxPlayers" as "maxPlayers",
             "p"."productId" as "productId",
             "p"."imageUrl" as "imageUrl",
             "c"."quantity" as "quantity",
             "c"."cartId" as "cartId"
         FROM "products" as "p"
         JOIN "cart" as "c" USING ("productId")
        WHERE "c"."customerId" = $1
        ORDER by "c"."cartId"
    `;
    const params = [customerId];
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Adds a product to their cart //
app.post('/api/cart', async (req, res, next) => {
  try {
    const { customerId } = req.user;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      throw new ClientError(400, 'productId and quantity are required fields!');
    }
    const sql = `
      INSERT INTO "cart" ("customerId", "productId", "quantity")
          VALUES ($1, $2, $3)
      RETURNING "customerId", "productId", "quantity"
    `;
    const params = [customerId, productId, quantity];
    const result = await db.query(sql, params);
    const [product] = result.rows;
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// Removes a product from their cart //
app.delete('/api/cart', async (req, res, next) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      throw new ClientError(400, 'cartId is a required field!');
    }
    const sql = `
      DELETE
        FROM "cart"
        WHERE "cartId" = $1
    `;
    const params = [cartId];
    const result = await db.query(sql, params);
    res.status(204).json(result);
  } catch (err) {
    next(err);
  }
});

// Updates the quantity inside of their carts //
app.patch('/api/cart', async (req, res, next) => {
  try {
    const { quantity, cartId } = req.body;
    if (!cartId) {
      throw new ClientError(400, 'cartId is a required field!');
    }
    if (Number(quantity) > 3) {
      throw new ClientError(400, 'Total quantity in cart cannot be greater than 3!');
    }
    const sql = `
      UPDATE "cart"
          SET "quantity" = $1
        WHERE "cartId" = $2
      RETURNING *
    `;
    const params = [quantity, cartId];
    const result = await db.query(sql, params);
    const [updated] = result.rows;
    if (!updated) {
      throw new ClientError(404, 'cartId is not found!');
    }
    res.status(202).json(updated);
  } catch (err) {
    next(err);
  }
});

// Gets account info //
app.get('/api/account', async (req, res, next) => {
  try {
    const { customerId } = req.user;
    const sql = `
      SELECT "firstName",
             "lastName",
             "email",
             "address",
             "state",
             "city",
             "zipCode"
         FROM "customerAccounts"
        WHERE "customerId" = $1
    `;
    const params = [customerId];
    const result = await db.query(sql, params);
    const [info] = result.rows;
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
