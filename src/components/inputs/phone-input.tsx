"use client";

import * as React from "react";
import { InputMask } from "@react-input/mask";

type InputProps = React.ComponentProps<"input">;

const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <InputMask
        {...props}
        ref={ref}
        type="text"
        mask="(__)_____-____"
        replacement={{ _: /\d/ }}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="Digite o telefone"
        aria-label="Phone user"
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
