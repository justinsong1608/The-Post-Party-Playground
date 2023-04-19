import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
import cors from 'cors';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(cors({ origin: '*' }));
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
             "thumbUrl"
        FROM "products"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Gets the fetured products for carousel //
app.get('/api/featuredProducts', async (req, res, next) => {
  try {
    const sql = `
      SELECT "p"."thumbUrl" as "img",
             "f"."featuredId" as "featuredId"
        FROM "products" as "p"
        JOIN "featuredProducts" as "f" USING ("productId")
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
