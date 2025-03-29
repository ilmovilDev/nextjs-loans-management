"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@prisma/client";
import { useCallback, useMemo } from "react";

interface FilterStatusSelectProps {
  path: string;
}

const FilterStatusSelect = ({ path }: FilterStatusSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Genera un objeto de parámetros de búsqueda sin mutaciones directas
  const currentParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const handleChange = useCallback(
    (value: string) => {
      if (value === "all") {
        currentParams.delete("status");
      } else {
        currentParams.set("status", value);
      }

      currentParams.delete("page");

      // Genera la nueva URL evitando "?" vacíos
      const newQueryString = currentParams.toString();
      router.push(`/${path}${newQueryString ? `?${newQueryString}` : ""}`);
    },
    [router, currentParams, path]
  );

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={searchParams.get("status") || "all"}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filtrar por status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos os status</SelectItem>
        <SelectItem value={UserStatus.ACTIVE}>Ativos</SelectItem>
        <SelectItem value={UserStatus.INACTIVE}>Desativados</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterStatusSelect;
