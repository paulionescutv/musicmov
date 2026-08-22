const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function connectDatabase() {
  await prisma.$connect();
  console.log("PostgreSQL connected.");
}

async function disconnectDatabase() {
  await prisma.$disconnect();
}

module.exports = { prisma, connectDatabase, disconnectDatabase };