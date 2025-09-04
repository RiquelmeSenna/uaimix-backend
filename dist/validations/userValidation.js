"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    name: zod_1.default.string({ message: "Mande o nome do usuario" }).min(2, { message: 'Nome no minimo com 2 caracteres' }),
    email: zod_1.default.string({ message: 'Mand eum E-mail' }).email({ message: 'Mande um E-mail válido' }),
    password: zod_1.default.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$!*&@#])[0-9a-zA-Z$!*&@#]{8,}$/, {
        message: "A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial",
    }),
    document: zod_1.default
        .string({ message: "Mande um CPF ou CNPJ" })
        .regex(/^\d+$/, { message: "O documento deve conter apenas números" })
        .refine((doc) => doc.length === 11 || doc.length === 14, {
        message: "Documento inválido. Use CPF (11 dígitos) ou CNPJ (14 dígitos)",
    }),
});
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default.string({ message: 'Mande um E-mail' }).email({ message: 'Mande um E-mail válido' }),
    password: zod_1.default.string({ message: 'Mande a senha' }).min(8, { message: 'No minimo 8 caracteres' }),
});
