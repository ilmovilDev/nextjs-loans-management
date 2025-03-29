"use client";

import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
}) => {
  const handleClick = () => {
    // Eliminar caracteres no numéricos
    const cleanedNumber = phoneNumber.replace(/\D/g, "");

    // Asegurar que el número tiene el código de país (Brasil usa +55)
    const fullNumber = cleanedNumber.startsWith("55")
      ? cleanedNumber
      : `55${cleanedNumber}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${fullNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      <MessageCircle />
      Escreva para o cliente
    </Button>
  );
};

export default WhatsAppButton;
