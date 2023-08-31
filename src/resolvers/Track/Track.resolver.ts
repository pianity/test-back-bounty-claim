import { Arg, ID, Query, Resolver } from "type-graphql";
import { Track as PrismaTrack } from "@prisma/client";

import { Track } from "@/resolvers/Track/Track.type";
import { prisma } from "@/prisma";

@Resolver(() => Track)
export class TrackResolver {
    @Query(() => Track, { nullable: true })
    async track(@Arg("id", () => ID) id: string): Promise<PrismaTrack | null> {
        return prisma.track.findUnique({ where: { id } });
    }

    @Query(() => [Track])
    async tracks(): Promise<PrismaTrack[]> {
        return prisma.track.findMany();
    }
}
