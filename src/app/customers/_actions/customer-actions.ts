"use server";

import { handlePrismaError } from "@/utils/handle-errors";
import { validateAuthentication } from "@/utils/validate-authentication";
import {
  deleteCustomerSchema,
  upsertCustomerSchema,
} from "../_schemas/customer-schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UserStatus } from "@prisma/client";

interface UpsertCustomerParams {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  status?: UserStatus;
}

export async function upsertCustomer(params: UpsertCustomerParams) {
  // Validación de datos y obtención del usuario autenticado
  upsertCustomerSchema.parse(params);
  const userId = await validateAuthentication();

  // Intentamos la operación de upsert en la base de datos
  const result = await upsertCustomerData(params, userId);
  return result;
}

export async function deleteCustomer({ customerId }: { customerId: string }) {
  try {
    deleteCustomerSchema.parse({ customerId });
    await validateAuthentication();

    await db.customer.delete({ where: { id: customerId } });

    revalidatePath("/customers");

    return { success: true };
  } catch (error) {
    return { success: false, message: handlePrismaError(error) };
  }
}

async function upsertCustomerData(
  params: UpsertCustomerParams,
  userId: string
) {
  try {
    // Realizamos la operación upsert en Prisma
    await db.customer.upsert({
      where: { id: params.id ?? "" },
      update: { ...params, userId },
      create: { ...params, userId },
    });

    // Revalidamos el path
    revalidatePath("/customers");

    return { success: true };
  } catch (error) {
    // En caso de error, retornamos un mensaje más comprensible
    return { success: false, message: await handlePrismaError(error) };
  }
}
