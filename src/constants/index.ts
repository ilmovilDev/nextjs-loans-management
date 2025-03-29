import { UserStatus } from "@prisma/client";

export const getStatusLabel = (status: UserStatus): string => {
  const statusMap: Record<UserStatus, string> = {
    ACTIVE: "Ativar",
    INACTIVE: "Desativar",
  };
  return statusMap[status] || status;
};

export const getStatusProfile = (status: UserStatus): string => {
  const statusMap: Record<UserStatus, string> = {
    ACTIVE: "Ativo",
    INACTIVE: "Desabilitado",
  };
  return statusMap[status] || status;
};
