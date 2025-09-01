import { Request, Response, NextFunction } from 'express';
import { Location } from './location.model';
import { locationSchema } from './location.validators';
import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACE_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

export async function createLocation(req: Request, res: Response, next: NextFunction) {
  try {
    const { place_id } = locationSchema.parse(req.body);

    if (!req.user) return res.status(401).json({ error: 'User no autenticado' });

    // usar req.user.sub como ObjectId
    const userId = req.user.sub;

    const existing = await Location.findOne({ place_id, user: userId });
    if (existing) return res.status(409).json({ error: 'Location ya existe' });

    const response = await axios.get(GOOGLE_PLACE_URL, {
      params: { place_id, key: GOOGLE_API_KEY, fields: 'geometry,name,formatted_address' }
    });

    const result = response.data.result;
    if (!result) return res.status(404).json({ error: 'Place no encontrado' });

    const location = await Location.create({
      user: userId,
      address: result.formatted_address,
      place_id,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng
    });

    res.status(201).json({ location });
  } catch (err) { next(err); }
}

export async function listLocations(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'User no autenticado' });

  const locations = await Location.find({ user: req.user.sub });
  res.json({ locations });
}

export async function getLocation(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'User no autenticado' });

  const location = await Location.findOne({ _id: req.params.id, user: req.user.sub });
  if (!location) return res.status(404).json({ error: 'Location no encontrada' });
  res.json({ location });
}

export async function updateLocation(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) return res.status(401).json({ error: 'User no autenticado' });

    const data = req.body;
    const location = await Location.findOneAndUpdate(
      { _id: req.params.id, user: req.user.sub },
      data,
      { new: true }
    );
    if (!location) return res.status(404).json({ error: 'Location no encontrada' });
    res.json({ location });
  } catch (err) { next(err); }
}

export async function deleteLocation(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'User no autenticado' });

  const location = await Location.findOneAndDelete({ _id: req.params.id, user: req.user.sub });
  if (!location) return res.status(404).json({ error: 'Location no encontrada' });
  res.status(204).send();
}
