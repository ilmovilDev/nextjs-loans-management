// utils/handlePrismaError.ts
"use server";

import { Prisma } from "@prisma/client";

export const handlePrismaError = (error: unknown): string => {
  console.error("Erro Prisma:", error); // Log detallado solo en backend

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMessages: Record<string, string> = {
      P2002: "Os dados informados já estão cadastrados.",
      P2025: "O registro solicitado não foi encontrado.",
      P2003: "Erro ao processar a solicitação.",
    };

    if (error.code === "P2002") {
      const duplicatedFields = (error.meta?.target as string[]) || [];
      return duplicatedFields.length
        ? `O campo ${duplicatedFields.join(", ")} já está em uso.`
        : errorMessages["P2002"];
    }

    return (
      errorMessages[error.code] ??
      "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde."
    );
  }

  if (error instanceof Error) {
    console.error("Erro genérico:", error); // Log do erro real no backend
    return "Ocorreu um erro inesperado. Já estamos trabalhando para resolver.";
  }

  console.error("Erro desconhecido:", error); // Captura qualquer outro erro inesperado
  return "Erro interno no servidor. Tente novamente mais tarde.";
};
