"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import UpsertLoanDialog from "./uprsert-loan-dialog";

function AddLoanButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)}>
        <PlusIcon />
        Adicionar empréstimo
      </Button>
      <UpsertLoanDialog isOpen={dialogIsOpen} onClose={setDialogIsOpen} />
    </>
  );
}

export default AddLoanButton;
