"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  totalPages: number;
}

export default function PaginationControls({
  totalPages,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Obtener página actual asegurando que sea un número válido
  const currentPage = useMemo(() => {
    const page = Number(searchParams.get("page"));
    return isNaN(page) || page < 1 ? 1 : Math.min(page, totalPages);
  }, [searchParams, totalPages]);

  // Función optimizada para cambiar de página
  const changePage = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages || newPage === currentPage)
        return;

      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    },
    [searchParams, router, totalPages, currentPage]
  );

  // Generar números de página con `useMemo`
  const totalPagesArray = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        {/* Botón Anterior */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => currentPage > 1 && changePage(currentPage - 1)}
          />
        </PaginationItem>

        {/* Números de Página */}
        {totalPagesArray.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => changePage(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Botón Siguiente */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              currentPage < totalPages && changePage(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
