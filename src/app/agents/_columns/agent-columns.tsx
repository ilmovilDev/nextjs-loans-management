"use client";

import { Customer, UserStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { capitalizeWords } from "@/utils/capitalize-word";
import DeleteAgentButton from "../_components/delete-agent-button";
import { ActionButton } from "@/components/buttons/actions-button";
import { Badge } from "@/components/ui/badge";
import { getStatusProfile } from "@/constants";

interface CustomerWithFullname extends Customer {
  fullName: string; // Agregamos el campo fullName
}

export const agentColumns: ColumnDef<CustomerWithFullname>[] = [
  {
    accessorKey: "fullName",
    header: "Nome completo",
    cell: ({ row }) => capitalizeWords(row.original.fullName),
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant = status === UserStatus.ACTIVE ? "default" : "destructive";
      return <Badge variant={variant}>{getStatusProfile(status)}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <ActionButton path="agents" params={row.original.id} />
        <DeleteAgentButton agentId={row.original.id} />
      </div>
    ),
  },
];
