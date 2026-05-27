import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config"

import { category } from "../schema";
import { categories } from "./data/category";

async function seed() {
  const db = drizzle(process.env.DATABASE_URL!)
  await db.insert(category).values(categories)

  console.log('Datos ingresados correctamente')
}


seed();