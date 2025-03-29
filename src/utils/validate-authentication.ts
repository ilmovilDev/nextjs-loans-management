import { auth } from "@clerk/nextjs/server";

export const validateAuthentication = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Não autorizado.");
  }
  return userId;
};
