import React from "react";
import RedirectButton from "@/components/buttons/redirect-button";
import Layout from "@/components/layout/layout";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCustomerProfile } from "@/data/fetch-customer";
import { redirect } from "next/navigation";
import CustomerProfileCard from "./_components/customer-profile-card";

interface ProfileProps {
  params: {
    id: string;
  };
}

async function Profile({ params }: ProfileProps) {
  const { id } = await params;
  const whereClause = { id };
  const customer = await getCustomerProfile({ whereClause });

  if (!customer) redirect("/customers");

  return (
    <Layout>
      <header className="flex items-center gap-x-2">
        <RedirectButton path="/customers" />
        <CardTitle>Perfil do cliente</CardTitle>
      </header>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="profile">profile</TabsTrigger>
          <TabsTrigger value="loans">loans</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <CustomerProfileCard customer={customer} />
        </TabsContent>
        <TabsContent value="loans">
          <Card className="p-6 text-center">Nenhum empréstimo registrado.</Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default Profile;
