import { Suspense } from "react";
import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import AddCustomerButton from "./_components/add-customer-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchCustomer } from "@/data/fetch-customer";
import { customerColumns } from "./_columns/customer-columns";
import PaginationControls from "@/components/paginations/paginations-control";

interface CustomersProps {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function Customers({ searchParams }: CustomersProps) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const { page = 1, pageSize = 10 } = await searchParams;

  const { customers, totalPages } = await fetchCustomer({
    whereClause: { userId },
    page: Number(page),
    pageSize: Number(pageSize),
  });

  const customersWithFullname = customers.map((customer) => ({
    ...customer,
    fullName: `${customer.firstname} ${customer.lastname}`, // Combinar firstname y lastname
  }));

  return (
    <Layout>
      <Header title="Clientes">
        <AddCustomerButton />
      </Header>

      <Suspense fallback={<p>Carregando...</p>}>
        <section className="flex flex-grow flex-col overflow-hidden">
          <ScrollArea>
            <DataTable
              columns={customerColumns}
              data={customersWithFullname}
              title="Nenhum cliente encontrado."
            />
          </ScrollArea>
        </section>

        <footer>
          <PaginationControls totalPages={totalPages} />
        </footer>
      </Suspense>
    </Layout>
  );
}
