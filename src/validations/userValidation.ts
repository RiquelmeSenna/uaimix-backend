import z from 'zod'

export const createUserSchema = z.object({
    name: z.string({ message: "Mande o nome do usuario" }).min(2, { message: 'Nome no minimo com 2 caracteres' }),
    email: z.string({ message: 'Mand eum E-mail' }).email({ message: 'Mande um E-mail válido' }),
    password: z.string().regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$!*&@#])[0-9a-zA-Z$!*&@#]{8,}$/,
        {
            message:
                "A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial",
        }),
    document: z
        .string({ message: "Mande um CPF ou CNPJ" })
        .regex(/^\d+$/, { message: "O documento deve conter apenas números" })
        .refine((doc) => doc.length === 11 || doc.length === 14, {
            message: "Documento inválido. Use CPF (11 dígitos) ou CNPJ (14 dígitos)",
        }),
})

export const loginUserSchema = z.object({
    email: z.string({ message: 'Mande um E-mail' }).email({ message: 'Mande um E-mail válido' }),
    password: z.string({ message: 'Mande a senha' }).min(8, { message: 'No minimo 8 caracteres' }),
})