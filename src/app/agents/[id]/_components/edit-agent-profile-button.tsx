"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agent } from "@prisma/client";
import UpsertAgentsDialog from "../../_components/upsert-agent-dialog";

interface EditProfileButtonProps {
  agent: Agent;
}

function EditProfileAgentButton({ agent }: EditProfileButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
        Editar informações
      </Button>
      <UpsertAgentsDialog
        isOpen={dialogIsOpen}
        onClose={setDialogIsOpen}
        defaultValues={agent}
        agentId={agent.id}
      />
    </>
  );
}

export default EditProfileAgentButton;
