import { da } from "zod/v4/locales/index.cjs";
import * as userModel from "../model/userModel";
import { UserCreate } from "../types/userType";
import bcrypt from 'bcrypt'

export const createUserService = async (data: UserCreate) => {
    const hasUser = await userModel.findUserByEmail(data.email);

    if (hasUser) {

        throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    if (data.document) {
        const doc = data.document.replace(/\D/g, ""); // remove caracteres não numéricos

        if (doc.length === 11) {
            data.CPF = doc;
        } else if (doc.length === 14) {
            data.CNPJ = doc;
        } else {

            throw new Error("Invalid document length. Must be CPF (11) or CNPJ (14)");
        }
    } else {

        throw new Error("Document (CPF/CNPJ) is required");
    }

    const newUser = await userModel.createUser({
        ...data,
        password: passwordHash
    })

    if (!newUser) {

        throw new Error("Failed to create user");
    }

    return newUser;

}

export const loginuser = async (email: string, password: string) => {
    const user = await userModel.findUserByEmail(email);

    if (!user) {

        throw new Error("Invalid email");
    }

    const userLogged = await userModel.signIn(user.email, user.password)

    const passwordHash = await bcrypt.compare(password, user.password)

    if (!passwordHash) {

        throw new Error('Wrong password')
    }

    return userLogged
}