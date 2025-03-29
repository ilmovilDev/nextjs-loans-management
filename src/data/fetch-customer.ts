import { db } from "@/lib/prisma";
import { UserStatus } from "@prisma/client";

interface FetchCustomerPros {
  whereClause: { userId: string; status?: UserStatus };
  page: number;
  pageSize: number;
}

interface GetCustomerProfileProps {
  whereClause: { id: string };
}

interface FetchAllCustomersProps {
  whereClause: { id: string; status?: UserStatus };
}

export async function fetchCustomer({
  whereClause,
  page,
  pageSize,
}: FetchCustomerPros) {
  const [customers, totalCustomers] = await Promise.all([
    db.customer.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.customer.count({ where: whereClause }),
  ]);

  const totalPages = Math.max(Math.ceil(totalCustomers / pageSize), 1);

  return {
    customers,
    totalCustomers,
    totalPages,
  };
}

export async function getCustomerProfile({
  whereClause,
}: GetCustomerProfileProps) {
  return db.customer.findUnique({
    where: whereClause,
    // include: {
    // Aquí puedes agregar futuras relaciones, por ejemplo:
    // orders: true, // Relación con pedidos
    // address: true, // Relación con direcciones
    // },
  });
}

export async function fetchAllCustomers({
  whereClause,
}: FetchAllCustomersProps) {
  const customers = await db.customer.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  // Mapear el fullname
  const customersWithFullname = customers.map((customer) => ({
    id: customer.id,
    fullname: `${customer.firstname} ${customer.lastname}`, // Concatenar nombre completo
  }));

  return customersWithFullname;
}
