import "module-alias/register";
import "reflect-metadata";

import http from "http";
import express from "express";

import { serveSchema } from "@/schema";

async function main(port: number): Promise<string> {
    const app = express();

    const httpServer = http.createServer(app);
    serveSchema(app, httpServer, { path: "/graphql" });

    return new Promise((resolve) => {
        httpServer.listen(port, () => {
            resolve("http://localhost:4000");
        });
    });
}

const startGQLServer = (port = 4000): Promise<string> => main(port);

if (require.main === module) {
    startGQLServer()
        .then((url) => {
            console.log(`🚀 Server is up and running on ${url}/graphql`);
        })
        .catch((e) => console.error(e));
}

export default startGQLServer;
