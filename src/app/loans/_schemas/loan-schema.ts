import { LoansStatus } from "@prisma/client";
import { z } from "zod";

// Validaciones reutilizables
const trimAndLowercase = (schema: z.ZodString) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    schema
  );

const firstname = trimAndLowercase(
  z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(155, { message: "O nome deve ter no máximo 255 caracteres" })
);

const uuidSchema = z.string().uuid({ message: "ID inválido" });

const statusSchema = z
  .nativeEnum(LoansStatus, {
    errorMap: () => ({ message: "Status inválido" }),
  })
  .optional();

// Esquemas principales
export const loanSchema = z.object({
  firstname: firstname,
  clientId: uuidSchema,
  status: statusSchema,
});

export const upsertLoanSchema = loanSchema;

export const deleteLoanSchema = z.object({
  loanId: uuidSchema,
});

// Tipos inferidos
export type LoanSchema = z.infer<typeof loanSchema>;
export type UpsertLoanSchema = z.infer<typeof upsertLoanSchema>;
export type DeleteLoanSchema = z.infer<typeof deleteLoanSchema>;
