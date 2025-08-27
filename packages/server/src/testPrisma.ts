import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

export async function testPrisma() {
  try {
    await prisma.$connect();
    console.log("Connected to DB!");
  } catch (e) {
    console.error("DB connection error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
