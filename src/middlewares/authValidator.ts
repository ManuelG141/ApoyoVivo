import { Request, Response } from 'express'

export const validateSchema = (schema: any) => (req: Request<any>, res: Response<any>, next: Function): void => {
  try {
    schema.parse(req.body)
    next()
  } catch (error: any) {
    const errors: Record<string, string> = {}
    for (const issue of error.issues) {
      errors[issue.path] = issue.message
    }
    res.status(400).send(errors)
  }
}
