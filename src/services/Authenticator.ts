import * as jwt from 'jsonwebtoken';

interface AuthenticationData {
  id: string
}

export  class Authenticator {

  private static getExpiresIn(): string {
    return process.env.ACCESS_TOKEN_EXPIRES_IN!;
  }
  public generateToken(data: AuthenticationData): string {
    return jwt.sign(
      data,
      process.env.JWT_KEY as string,
      {expiresIn: Authenticator.getExpiresIn()}
    )
  }
  public getData(token: string): AuthenticationData {
    const data = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any;
    return {
      id: data.id
    }
  }
}