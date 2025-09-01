# BeGo Backend Checkpoint

API backend para la gestión de **Usuarios, Trucks, Orders y Locations**, con autenticación JWT, validación de datos y CRUD completo para cada dominio.

---

## Descripción

Esta API permite:

- Registrar y autenticar usuarios con JWT.
- Crear, listar, actualizar y eliminar **Trucks** vinculados a usuarios.
- Crear, listar, actualizar y eliminar **Orders**, incluyendo endpoint específico para cambiar el **status** (`created`, `in transit`, `completed`).
- Crear, listar, actualizar y eliminar **Locations**, obteniendo dirección y coordenadas a partir de `place_id` de Google Maps.

---

## Tecnologías utilizadas

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT para autenticación
- Axios para consumir Google Places API
- Zod para validación de datos
- Postman para pruebas

---

## Cómo abordé el desarrollo

1. **Organización por dominios:** Cada dominio (`users`, `trucks`, `orders`, `locations`) tiene su propia carpeta con modelo, controlador, rutas y validadores.
2. **Ramas Git:** Cada dominio se desarrolló en una rama separada y luego se hizo merge a `main`.
3. **Validación de datos:** Se usa Zod antes de crear o actualizar datos para asegurar integridad.
4. **Autenticación:** Se implementó JWT y todos los endpoints protegidos verifican el token.
5. **Integración externa:** Google Places API para obtener dirección y coordenadas de locations.
6. **Variables de entorno:** JWT_SECRET, MONGO_URI, GOOGLE_API_KEY y otras configuraciones sensibles están en `.env`.

---

## Endpoints y ejemplos

### Users

| EP | Método | Body (ejemplo) |
|----|--------|----------------|
| `/api/auth/register` | POST | `{ "email": "email@gmail.com", "password": "Pass1587!" }` |
| `/api/auth/login` | POST | `{ "email": "email@gmail.com", "password": "Pass1587" }` |
| `/api/users/me` | GET | — |
| `/api/users/:id` | PATCH | `{ "email": "email@gmail.com", "password": "NewPass1587" }` |
| `/api/users/:id` | DELETE | — |

---

### Trucks

| EP | Método | Body (ejemplo) |
|----|--------|----------------|
| `/api/trucks` | POST | `{ "user": "<USER_ID>", "year": "2020", "color": "red", "plates": "ABC123" }` |
| `/api/trucks` | GET | — |
| `/api/trucks/:id` | PATCH | `{ "color": "blue" }` |
| `/api/trucks/:id` | DELETE | — |

---

### Orders

| EP | Método | Body (ejemplo) |
|----|--------|----------------|
| `/api/orders` | POST | `{ "user": "<USER_ID>", "truck": "<TRUCK_ID>", "pickup": "<LOCATION_ID>", "dropoff": "<LOCATION_ID>" }` |
| `/api/orders/:id/status` | PATCH | `{ "status": "in transit" }` |
| `/api/orders` | GET | — |
| `/api/orders/:id` | PATCH | `{ "pickup": "<NEW_LOCATION_ID>", "dropoff": "<NEW_LOCATION_ID>" }` |
| `/api/orders/:id` | DELETE | — |

---

### Locations

| EP | Método | Body (ejemplo) |
|----|--------|----------------|
| `/api/locations` | POST | `{ "place_id": "ChIJiRp93iEC0oURvJVqErpVVHw" }` |
| `/api/locations` | GET | — |
| `/api/locations/:id` | PATCH | `{ "address": "Nueva dirección" }` |
| `/api/locations/:id` | DELETE | — |

> Todos los endpoints protegidos requieren header:  
> `Authorization: Bearer <JWT>`  

---

## Cómo probar la API

1. Instalar dependencias:

```bash
npm install
```

---

2. Configurar archivo `.env` en la raíz del proyecto:

```env
MONGO_URI=<tu_mongodb_atlas_uri>
JWT_SECRET=<tu_jwt_secret>
GOOGLE_API_KEY=<tu_google_places_api_key>
```

---
3. Abrir Postman:

- Primero registrar o loguear un usuario para obtener JWT.
- Guardar JWT en variable de entorno token para usar en todos los endpoints protegidos:
```
Authorization: Bearer {{token}}
```
- Probar creación y gestión de Trucks, Orders y Locations usando los cuerpos de ejemplo.

---
### Notas importantes

No se permite crear Locations duplicadas (place_id) para el mismo usuario.
El endpoint /orders/:id/status permite cambiar únicamente el estado de la orden.
MongoDB Atlas y Google API Key se usan para base de datos en la nube y geolocalización.

