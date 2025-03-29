import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Cleaning database...");

  // Eliminar datos previos
  await prisma.customer.deleteMany();
  await prisma.agent.deleteMany();

  console.log("🌱 Seeding database...");

  // Crear 15 clientes
  const customers = Array.from({ length: 15 }).map(() => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: `(41)9${faker.string.numeric(4)}-${faker.string.numeric(4)}`, // Ejemplo: (41)98421-0000
    status: "ACTIVE" as const,
    cpf: `${faker.string.numeric(3)}.${faker.string.numeric(
      3
    )}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`, // Ejemplo: 000.000.000-00
    address: faker.location.streetAddress(),
    userId: "user_2uqqtSZ9YyOU40T6SRXzXM261eM",
  }));

  // Crear 3 agentes
  const agents = Array.from({ length: 3 }).map(() => ({
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    phone: `(41)9${faker.string.numeric(4)}-${faker.string.numeric(4)}`, // Ejemplo: (41)98421-0000
    status: "ACTIVE" as const,
    cpf: `${faker.string.numeric(3)}.${faker.string.numeric(
      3
    )}.${faker.string.numeric(3)}-${faker.string.numeric(2)}`, // Ejemplo: 000.000.000-00
    address: faker.location.streetAddress(),
    userId: "user_2uqqtSZ9YyOU40T6SRXzXM261eM",
  }));

  // Insertar en la base de datos
  await prisma.customer.createMany({ data: customers });
  await prisma.agent.createMany({ data: agents });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
