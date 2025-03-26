import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Login() {
  const { userId } = await auth();
  if (userId) redirect("/");
  return (
    <main className="flex justify-center items-center h-screen">
      <section className="max-w-xs text-center">
        <SignInButton>
          <Button
            className="w-full cursor-pointer"
            aria-label="Log in or create an account"
          >
            <LogInIcon className="mr-1 font-bold" aria-hidden="true" />
            Conecte-se
          </Button>
        </SignInButton>
      </section>
    </main>
  );
}
