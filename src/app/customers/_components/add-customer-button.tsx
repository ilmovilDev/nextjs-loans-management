"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertCustomerDialog from "./upsert-customer-dialog";

function AddCustomerButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)}>
        <PlusIcon />
        Adicionar cliente
      </Button>
      <UpsertCustomerDialog isOpen={dialogIsOpen} onClose={setDialogIsOpen} />
    </>
  );
}

export default AddCustomerButton;
