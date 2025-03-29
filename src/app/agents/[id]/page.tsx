import RedirectButton from "@/components/buttons/redirect-button";
import Layout from "@/components/layout/layout";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAgentProfile } from "@/data/fetch-agents";
import { redirect } from "next/navigation";
import AgentProfileCard from "./_components/agent-profile-card";

interface ProfileProps {
  params: {
    id: string;
  };
}

async function Profile({ params }: ProfileProps) {
  const { id } = await params;
  const whereClause = { id };

  const agent = await getAgentProfile({ whereClause });

  if (!agent) redirect("/agents");

  return (
    <Layout>
      <header className="flex items-center gap-x-2">
        <RedirectButton path="/agents" />
        <CardTitle>Perfil do agente</CardTitle>
      </header>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="profile">profile</TabsTrigger>
          <TabsTrigger value="loans">loans</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <AgentProfileCard agent={agent} />
        </TabsContent>
        <TabsContent value="loans">
          <Card className="p-6 text-center">Nenhum empréstimo registrado.</Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export default Profile;
