"use client";

import { ActionButton } from "@/components/buttons/actions-button";
import { Customer, UserStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DeleteCustomerButton from "../_components/delete-customer-button";
import { capitalizeWords } from "@/utils/capitalize-word";
import { Badge } from "@/components/ui/badge";
import { getStatusProfile } from "@/constants";

interface CustomerWithFullname extends Customer {
  fullName: string; // Agregamos el campo fullName
}

export const customerColumns: ColumnDef<CustomerWithFullname>[] = [
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
        <ActionButton path="customers" params={row.original.id} />
        <DeleteCustomerButton customerId={row.original.id} />
      </div>
    ),
  },
];
