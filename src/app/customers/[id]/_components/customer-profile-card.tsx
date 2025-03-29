import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WhatsAppButton from "@/components/buttons/whatsapp-button";
import { Customer, UserStatus } from "@prisma/client";
import { capitalizeWords } from "@/utils/capitalize-word";
import { Calendar, Mail, Phone, User, UserCheck, UserX } from "lucide-react";
import { getStatusProfile } from "@/constants";
import { CustomerProfileCardItems } from "./customer-profile-card-items";
import EditProfileCustomerButton from "./edit-profile-customer-button";
import AddLoanButton from "@/app/loans/_components/add-loan-button";

interface ProfileCardProps {
  customer: Customer;
}

function CustomerProfileCard({ customer }: ProfileCardProps) {
  const fullname = capitalizeWords(
    `${customer.firstname} ${customer.lastname}`
  );

  const profileData = [
    { icon: <User size={18} />, title: "Nome completo", value: fullname },
    { icon: <Mail size={18} />, title: "E-mail", value: customer.email },
    { icon: <Phone size={18} />, title: "Telefone", value: customer.phone },
    {
      icon: <Calendar size={18} />,
      title: "Data de Cadastro",
      value: new Date(customer.createdAt).toLocaleDateString(),
    },
    {
      icon:
        customer.status === "ACTIVE" ? (
          <UserCheck size={18} />
        ) : (
          <UserX size={18} />
        ), // Íconos con colores
      title: "Status",
      value: (
        <p
          className={`${
            customer.status === UserStatus.ACTIVE
              ? "text-primary font-semibold"
              : "text-destructive font-semibold"
          }`}
        >
          {getStatusProfile(customer.status)}
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
        <CardTitle className="md:text-xl">Informações do Cliente</CardTitle>
        <CardDescription>Detalhes pessoais</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profileData.map((item, index) => (
          <CustomerProfileCardItems
            key={index}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </CardContent>

      <CardFooter className="space-x-2">
        <EditProfileCustomerButton customer={customer} />
        <WhatsAppButton
          phoneNumber={customer.phone}
          message={whatsappMessage}
        />
        <AddLoanButton />
      </CardFooter>
    </Card>
  );
}

export default CustomerProfileCard;
