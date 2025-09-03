import { Request, RequestHandler, Response } from 'express'
import * as userService from '../services/userService'
import * as userValidation from '../validations/userValidation'
import { sign } from '../middlewares/authMiddleware'

export const createUser = async (req: Request, res: Response) => {
    const safeData = userValidation.createUserSchema.safeParse(req.body)

    if (!safeData.success) {
        res.status(422).json({ error: safeData.error.issues.map(issue => issue.message) })
        return
    }

    try {
        const newuser = await userService.createUserService({
            email: safeData.data.email,
            password: safeData.data.password,
            name: safeData.data.name,
            document: safeData.data.document
        })

        res.status(201).json(newuser)
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const safeData = userValidation.loginUserSchema.safeParse(req.body)

    if (!safeData.success) {
        res.status(401).json({ error: safeData.error.issues.map(issue => issue.message) })
        return
    }

    try {
        const user = await userService.loginuser(safeData.data.email, safeData.data.password)

        const token = await sign(user?.email as string)

        res.json({ token: token })
    } catch (error) {
        res.status(401).json({ error: error instanceof Error ? error.message : 'Email ou senha incorreto!' })
    }
}