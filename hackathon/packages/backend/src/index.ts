
import dotenv from "dotenv";
import app from "./api/router/router";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

async function main(): Promise<void> {

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });    
}



main();



