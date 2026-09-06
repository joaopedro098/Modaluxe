import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; 

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    // Adicione esta opção para habilitar e-mail e senha:
    emailAndPassword: {
        enabled: true,
        },
})