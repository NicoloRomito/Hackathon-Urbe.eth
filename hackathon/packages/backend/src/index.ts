
import dotenv from "dotenv";
import app from "./api/router/router";
import {PrismaClient} from '@prisma/client';
import eventsRouter from "./api/router/events/eventsRouter";
const prisma = new PrismaClient();

dotenv.config();

async function main(): Promise<void> {

    const port = process.env.PORT;
    
    eventsRouter();

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}



main();



