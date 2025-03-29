"use server";

import { handlePrismaError } from "@/utils/handle-errors";
import { validateAuthentication } from "@/utils/validate-authentication";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteAgentSchema, upsertAgentSchema } from "../schemas/agent-schema";
import { UserStatus } from "@prisma/client";

interface UpsertAgentParams {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
  status?: UserStatus;
}

export async function upsertAgent(params: UpsertAgentParams) {
  // Validación de datos y obtención del usuario autenticado
  upsertAgentSchema.parse(params);
  const userId = await validateAuthentication();

  // Intentamos la operación de upsert en la base de datos
  const result = await upsertAgentData(params, userId);
  return result;
}

export async function deleteAgent({ agentId }: { agentId: string }) {
  try {
    deleteAgentSchema.parse({ agentId });
    await validateAuthentication();

    await db.agent.delete({ where: { id: agentId } });

    revalidatePath("/agents");

    return { success: true };
  } catch (error) {
    return { success: false, message: handlePrismaError(error) };
  }
}

async function upsertAgentData(params: UpsertAgentParams, userId: string) {
  try {
    // Realizamos la operación upsert en Prisma
    await db.agent.upsert({
      where: { id: params.id ?? "" },
      update: { ...params, userId },
      create: { ...params, userId },
    });

    // Revalidamos el path
    revalidatePath("/agents");

    return { success: true };
  } catch (error) {
    // En caso de error, retornamos un mensaje más comprensible
    return { success: false, message: await handlePrismaError(error) };
  }
}
