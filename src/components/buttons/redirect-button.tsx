"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

interface RedirectButtonProps {
  path: string;
}
function RedirectButton({ path }: RedirectButtonProps) {
  return (
    <Button
      onClick={() => redirect(path)}
      className="cursor-pointer"
      variant="ghost"
      size="icon"
    >
      <ArrowLeft />
    </Button>
  );
}

export default RedirectButton;
