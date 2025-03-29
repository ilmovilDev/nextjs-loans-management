"use client";

import * as React from "react";
import { InputMask } from "@react-input/mask";

type InputProps = React.ComponentProps<"input"> & {
  isUpdate?: boolean;
};

const CpfInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isUpdate = false, ...props }, ref) => {
    return (
      <InputMask
        {...props}
        ref={ref}
        type="text"
        mask="___.___.___-__"
        replacement={{ _: /\d/ }}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="Digite o CPF"
        aria-label="CPF user"
        disabled={isUpdate}
      />
    );
  }
);

CpfInput.displayName = "CpfInput";

export { CpfInput };
