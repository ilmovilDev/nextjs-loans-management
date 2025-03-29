import { CardDescription } from "@/components/ui/card";

export const CustomerProfileCardItems: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode | string;
}> = ({ icon, title, value }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium">{title}</span>
    </div>
    <CardDescription className="mt-1">{value}</CardDescription>
  </div>
);
