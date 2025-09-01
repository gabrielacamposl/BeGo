import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';


export interface AuthPayload { sub: string; email: string }


declare global {
// Extiende el tipo Request para incluir user
namespace Express {
interface Request { user?: AuthPayload }
}
}


export function auth(req: Request, res: Response, next: NextFunction) {
const header = req.headers.authorization;
if (!header || !header.startsWith('Bearer ')) {
return res.status(401).json({ error: 'Token no provisto' });
}
const token = header.split(' ')[1];
try {
const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload & { iat: number; exp: number };
req.user = { sub: payload.sub, email: payload.email };
next();
} catch {
return res.status(401).json({ error: 'Token inválido o expirado' });
}
}