"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertAgentsDialog from "./upsert-agent-dialog";

function AddAgentButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)}>
        <PlusIcon />
        Adicionar agente
      </Button>
      <UpsertAgentsDialog isOpen={dialogIsOpen} onClose={setDialogIsOpen} />
    </>
  );
}

export default AddAgentButton;
