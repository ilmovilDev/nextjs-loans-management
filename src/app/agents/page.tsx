import Header from "@/components/layout/header";
import AddAgentButton from "./_components/add-agent-button";
import Layout from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/data-table";
import PaginationControls from "@/components/paginations/paginations-control";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchAgents } from "@/data/fetch-agents";
import { agentColumns } from "./_columns/agent-columns";

interface AgentsProps {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function Agents({ searchParams }: AgentsProps) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const { page = 1, pageSize = 10 } = await searchParams;

  const { agents, totalPages } = await fetchAgents({
    whereClause: { userId },
    page: Number(page),
    pageSize: Number(pageSize),
  });

  const agentsWithFullname = agents.map((agent) => ({
    ...agent,
    fullName: `${agent.firstname} ${agent.lastname}`, // Combinar firstname y lastname
  }));

  return (
    <Layout>
      <Header title="Agentes">
        <AddAgentButton />
      </Header>

      <section className="flex flex-grow flex-col overflow-hidden">
        <ScrollArea>
          <DataTable
            columns={agentColumns}
            data={agentsWithFullname}
            title="Nenhum agente encontrado."
          />
        </ScrollArea>
      </section>

      <footer>
        <PaginationControls totalPages={totalPages} />
      </footer>
    </Layout>
  );
}
