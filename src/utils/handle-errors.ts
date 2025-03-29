"use server";

import { Prisma } from "@prisma/client";

export const handlePrismaError = async (error: unknown): Promise<string> => {
  console.error("Erro Prisma:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Definimos mensajes predefinidos según el código de error de Prisma
    const errorMessages: Record<string, string> = {
      P2002: "Os dados informados já estão cadastrados.",
      P2025: "O registro solicitado não foi encontrado.",
      P2003: "Erro ao processar a solicitação.",
    };

    // Manejo específico para el error de duplicación de campos
    if (error.code === "P2002") {
      const duplicatedFields = (error.meta?.target as string[]) || [];
      return duplicatedFields.length
        ? `O campo ${duplicatedFields.join(", ")} já está em uso.`
        : errorMessages["P2002"];
    }

    // Si no es un error de duplicación, devolvemos el mensaje predefinido
    return (
      errorMessages[error.code] ??
      "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde."
    );
  }

  if (error instanceof Error) {
    console.error("Erro genérico:", error);
    return "Ocorreu um erro inesperado. Já estamos trabalhando para resolver.";
  }

  console.error("Erro desconhecido:", error);
  return "Erro interno no servidor. Tente novamente mais tarde.";
};
