import { JwtPayload } from "jsonwebtoken";


export interface CustomUserPayload extends JwtPayload{
  id:string
}

declare module "express-serve-static-core" {
  interface Request {
    user?: CustomUserPayload
  }
}
