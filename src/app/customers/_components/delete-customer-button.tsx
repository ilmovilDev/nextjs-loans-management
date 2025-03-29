"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteCustomer } from "../_actions/customer-actions";

interface DeleteCustomerButtonProps {
  customerId: string;
}

export default function DeleteCustomerButton({
  customerId,
}: DeleteCustomerButtonProps) {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteCustomer({ customerId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você Deseja realmente deletar esse cliente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
