import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WhatsAppButton from "@/components/buttons/whatsapp-button";
import { Agent, UserStatus } from "@prisma/client";
import { capitalizeWords } from "@/utils/capitalize-word";
import { Calendar, Mail, Phone, User, UserCheck, UserX } from "lucide-react";
import { getStatusProfile } from "@/constants";
import { AgentProfileCardItems } from "./agent-profile-card-iutems";
import EditProfileAgentButton from "./edit-agent-profile-button";

interface AgentCardProps {
  agent: Agent;
}

function AgentProfileCard({ agent }: AgentCardProps) {
  const fullname = capitalizeWords(`${agent.firstname} ${agent.lastname}`);

  const profileData = [
    { icon: <User size={18} />, title: "Nome completo", value: fullname },
    { icon: <Mail size={18} />, title: "E-mail", value: agent.email },
    { icon: <Phone size={18} />, title: "Telefone", value: agent.phone },
    {
      icon: <Calendar size={18} />,
      title: "Data de Cadastro",
      value: new Date(agent.createdAt).toLocaleDateString(),
    },
    {
      icon:
        agent.status === "ACTIVE" ? (
          <UserCheck size={18} />
        ) : (
          <UserX size={18} />
        ), // Íconos con colores
      title: "Status",
      value: (
        <p
          className={`${
            agent.status === UserStatus.ACTIVE
              ? "text-primary font-semibold"
              : "text-destructive font-semibold"
          }`}
        >
          {getStatusProfile(agent.status)}
        </p>
      ),
    },
  ];

  // TDOO:
  // Estructurar un mensaje mucho mas personalizado con datos de algun prestamo
  const whatsappMessage = `Olá ${profileData[0].value}...`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-xl">Informações do Agente</CardTitle>
        <CardDescription>Detalhes pessoais</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profileData.map((item, index) => (
          <AgentProfileCardItems
            key={index}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </CardContent>

      <CardFooter className="space-x-2">
        <EditProfileAgentButton agent={agent} />
        <WhatsAppButton phoneNumber={agent.phone} message={whatsappMessage} />
      </CardFooter>
    </Card>
  );
}

export default AgentProfileCard;
