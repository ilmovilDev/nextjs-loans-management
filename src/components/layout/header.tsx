import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

export default function Header({ children, title }: HeaderProps) {
  return (
    <header className="flex w-full items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children && children}
    </header>
  );
}
