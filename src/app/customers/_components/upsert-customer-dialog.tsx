"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { customerSchema, CustomerSchema } from "../_schemas/customer-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CpfInput } from "@/components/inputs/cpf-input";
import { PhoneInput } from "@/components/inputs/phone-input";
import { upsertCustomer } from "../_actions/customer-actions";
import { toast } from "sonner";
import { UserStatus } from "@prisma/client";
import { getStatusLabel } from "@/constants";

interface UpsertCustomerDialogProps {
  isOpen: boolean;
  defaultValues?: CustomerSchema;
  customerId?: string;
  onClose: (isOpen: boolean) => void;
}

function UpsertCustomerDialog({
  isOpen,
  defaultValues,
  customerId,
  onClose,
}: UpsertCustomerDialogProps) {
  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaultValues ?? {
      firstname: "",
      lastname: "",
      email: "",
      cpf: "",
      phone: "",
      address: "",
      status: UserStatus.ACTIVE,
    },
  });

  const onSubmit = async (data: CustomerSchema) => {
    const action = isUpdate ? "atualizado" : "salvo";

    const result = await upsertCustomer({ ...data, id: customerId });

    if (result.success) {
      toast.success(`Cliente ${action} com sucesso`);
      form.reset();
    } else {
      toast.error(result.message);
    }

    onClose(false);
    form.reset();
  };

  const isUpdate = Boolean(customerId);
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
              ? "Editar informações do cliente"
              : "Adicionar novo cliente"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo com as informações do cliente.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            action="POST"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Nome */}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o primeiro nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sobrenome */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* E-mail */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplo@dominio.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CPF */}
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <CpfInput {...field} isUpdate={isUpdate} ref={field.ref} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} ref={field.ref} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Endereço */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o endereço completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isUpdate && (
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
                      >
                        {Object.values(UserStatus).map((status) => (
                          <option key={status} value={status}>
                            {getStatusLabel(status)}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="outline"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="cursor-pointer" type="submit">
                {isUpdate ? "Salvar alterações" : "Cadastrar cliente"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpsertCustomerDialog;
