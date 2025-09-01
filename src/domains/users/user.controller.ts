import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { User } from './user.model';
import { env } from '../../config/env';
import { registerSchema, loginSchema } from './user.validators';

function toPublic(u: any) {
  return { _id: u._id, email: u.email, createdAt: u.createdAt, updatedAt: u.updatedAt };
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(409).json({ error: 'El email ya está registrado' });

    const user = await User.create(data);
    return res.status(201).json({ user: toPublic(user) });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const ok = await user.comparePassword(data.password);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

    // JWT payload
    const payload = { sub: String(user._id), email: user.email };
      
    // Generar token
   const token = jwt.sign(
  payload,
  env.JWT_SECRET as Secret,
  { expiresIn: env.JWT_EXPIRES_IN ?? '1d' } as SignOptions
);

    return res.json({
      token,
      token_type: 'Bearer',
      expires_in: env.JWT_EXPIRES_IN,
      user: toPublic(user),
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req: Request, res: Response) {
  const userId = req.user!.sub;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  return res.json({ user: toPublic(user) });
}

export async function listUsers(_req: Request, res: Response) {
  const users = await User.find().sort({ createdAt: -1 });
  return res.json({ users: users.map(toPublic) });
}

export async function getUserById(req: Request, res: Response) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  return res.json({ user: toPublic(user) });
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = req.body as { password?: string };
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (password) user.password = password; // re-hash por pre('save')
    await user.save();

    return res.json({ user: toPublic(user) });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
