"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loanSchema, LoanSchema } from "../_schemas/loan-schema";
import { LoansStatus } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface UpsertLoanDialogProps {
  isOpen: boolean;
  defaultValues?: LoanSchema;
  loanId?: string;
  onClose: (isOpen: boolean) => void;
}

function UpsertLoanDialog({
  isOpen,
  defaultValues,
  loanId,
  onClose,
}: UpsertLoanDialogProps) {
  const form = useForm<LoanSchema>({
    resolver: zodResolver(loanSchema),
    defaultValues: defaultValues ?? {
      firstname: "",
      status: LoansStatus.ACTIVE,
    },
  });

  const isUpdate = Boolean(loanId);

  const onSubmit = (data: LoanSchema) => {
    console.log(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onClose(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-bg-muted border-b pb-4 text-3xl">
            {isUpdate
              ? "Editar informações do empréstimo"
              : "Adicionar novo empréstimo"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo com as informações do empréstimo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            action="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      className="border rounded-md p-2 w-full"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    ></select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpsertLoanDialog;
