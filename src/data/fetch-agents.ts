import { db } from "@/lib/prisma";

interface FetchAgentsPros {
  whereClause: { userId: string };
  page: number;
  pageSize: number;
}

interface GetAgentProfileProps {
  whereClause: { id: string };
}

export async function fetchAgents({
  whereClause,
  page,
  pageSize,
}: FetchAgentsPros) {
  const [agents, totalAgents] = await Promise.all([
    db.agent.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.agent.count({ where: whereClause }),
  ]);

  const totalPages = Math.max(Math.ceil(totalAgents / pageSize), 1);

  return {
    agents,
    totalAgents,
    totalPages,
  };
}

export async function getAgentProfile({ whereClause }: GetAgentProfileProps) {
  return db.agent.findUnique({
    where: whereClause,
    // include: {
    // Aquí puedes agregar futuras relaciones, por ejemplo:
    // orders: true, // Relación con pedidos
    // address: true, // Relación con direcciones
    // },
  });
}
