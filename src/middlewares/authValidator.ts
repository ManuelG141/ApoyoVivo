import { Request, Response } from 'express'

export const validateSchema = (schema: any) => (req: Request<any>, res: Response<any>, next: Function): void => {
  try {
    schema.parse(req.body)
    next()
  } catch (error: any) {
    res.status(400).send(error.issues)
  }
}
