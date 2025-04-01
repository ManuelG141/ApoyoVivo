import jwt, { Secret } from 'jsonwebtoken'

export const createAccessToken = (payload: string): string => {
  const token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET as Secret,
    // eslint-disable-next-line @typescript-eslint/quotes
    { expiresIn: "1h" } // 1 hour expiration
  )
  return token
}

// TERMINAR VALIDACIÓN DE TOKEN
export const verifyToken = async (token: string): Promise<any> => {
  if (token === undefined) throw new Error('Token not provided')
  const user = jwt.verify(
    token,
    process.env.TOKEN_SECRET as Secret,
    (err, decoded) => {
      if (err === null) {
        return decoded
      }
      throw new Error('Token not valid')
    }
  )
  return user
}
