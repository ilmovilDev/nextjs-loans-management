import { UserStatus } from "@prisma/client";
import { z } from "zod";

// Validaciones reutilizables
const trimAndLowercase = (schema: z.ZodString) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    schema
  );

const firstnameSchema = trimAndLowercase(
  z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(155, { message: "O nome deve ter no máximo 255 caracteres" })
);
const lastnameSchema = trimAndLowercase(
  z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(155, { message: "O nome deve ter no máximo 255 caracteres" })
);

const emailSchema = z
  .string()
  .email({ message: "E-mail inválido" })
  .transform((value) =>
    typeof value === "string" ? value.trim().toLowerCase() : value
  );

export const cpfSchema = z
  .string()
  .length(14)
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" });

const phoneSchema = z
  .string()
  .min(10, { message: "O telefone deve ter pelo menos 10 dígitos" })
  .max(20, { message: "O telefone deve ter no máximo 20 dígitos" });

const addressSchema = trimAndLowercase(
  z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres" })
    .max(255, { message: "O endereço deve ter no máximo 255 caracteres" })
);

const uuidSchema = z.string().uuid({ message: "ID inválido" });

const statusSchema = z
  .nativeEnum(UserStatus, {
    errorMap: () => ({ message: "Status inválido" }),
  })
  .optional();

// Esquemas principales
export const agentSchema = z.object({
  firstname: firstnameSchema,
  lastname: lastnameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
  address: addressSchema,
  status: statusSchema,
});

export const upsertAgentSchema = agentSchema;

export const deleteAgentSchema = z.object({
  agentId: uuidSchema,
});

// Tipos inferidos
export type AgentSchema = z.infer<typeof agentSchema>;
export type UpsertAgentSchema = z.infer<typeof upsertAgentSchema>;
export type DeleteAgentSchema = z.infer<typeof deleteAgentSchema>;
