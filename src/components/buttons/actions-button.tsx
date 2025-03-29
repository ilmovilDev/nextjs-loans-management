"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";

interface ActionButtonProps {
  path: string;
  params: string;
}

export const ActionButton = ({ path, params }: ActionButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      size="icon"
      onClick={() => router.push(`/${path}/${params}`)}
    >
      <EyeIcon />
    </Button>
  );
};
