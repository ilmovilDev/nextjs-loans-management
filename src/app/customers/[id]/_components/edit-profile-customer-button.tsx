"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Customer } from "@prisma/client";
import UpsertCustomerDialog from "../../_components/upsert-customer-dialog";

interface EditProfileCustomerButtonProps {
  customer: Customer;
}

function EditProfileCustomerButton({
  customer,
}: EditProfileCustomerButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
        Editar informações
      </Button>
      <UpsertCustomerDialog
        isOpen={dialogIsOpen}
        onClose={setDialogIsOpen}
        defaultValues={customer}
        customerId={customer.id}
      />
    </>
  );
}

export default EditProfileCustomerButton;
