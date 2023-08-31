import { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { User } from "@prisma/client";
import { json } from "body-parser";
import http from "http";

import resolvers from "@/resolvers";
import { prisma } from "@/prisma";

export type Context = {
    user?: User;
};

export async function createSchema() {
    return buildSchema({ resolvers });
}

export async function serveSchema(
    app: Express,
    httpServer: http.Server,
    { path }: { path: string },
): Promise<void> {
    const server = new ApolloServer({
        schema: await createSchema(),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    app.use(
        path,
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const userId = req?.headers["pty-user-id"] as string | undefined;
                const context: Context = {};
                if (userId) {
                    const user = await prisma.user.findUnique({ where: { id: userId } });
                    if (user) context.user = user;
                }

                return context;
            },
        }),
    );
}
