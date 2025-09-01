import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';


async function bootstrap() {
await connectDB();
app.listen(env.PORT, () => {
console.log(`[Server] Running on http://localhost:${env.PORT}`);
});
}


bootstrap().catch((err) => {
console.error(err);
process.exit(1);
});