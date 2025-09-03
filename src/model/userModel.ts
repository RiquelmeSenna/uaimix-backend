import { email } from 'zod'
import { prisma } from '../database/prisma'
import * as userTypes from '../types/userType'


export const createUser = async (data: userTypes.UserCreate) => {
    const { document, ...userData } = data;

    const newUser = await prisma.user.create({
        data: userData
    })

    return newUser
}

export const findUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    return user
}

export const signIn = async (email: string, password: string) => {
    const user = await prisma.user.findFirst({ where: { email, password } })
    return user
}