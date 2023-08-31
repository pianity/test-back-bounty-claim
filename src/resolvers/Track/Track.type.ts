import { Field, ID, ObjectType } from "type-graphql";
import {
    Artist as PrismaArtist,
    Bounty as PrismaBounty,
    Nft as PrismaNft,
    Track as PrismaTrack,
    User as PrismaUser,
} from "@prisma/client";

import { prisma } from "@/prisma";
import { Nft } from "@/resolvers/Nft/Nft.type";
import { Artist } from "@/resolvers/Artist/Artist.type";
import { Bounty } from "@/resolvers/Bounty/Bounty.type";
import { User } from "@/resolvers/User/User.type";

@ObjectType()
export class Track implements PrismaTrack {
    @Field(() => ID)
    id: string;

    createdAt: Date;

    updatedAt: Date;

    @Field(() => String)
    title: string;

    @Field(() => String)
    slug: string;

    @Field(() => String, { nullable: true })
    thumbnailUrl: string | null;

    @Field(() => Artist, { name: "artist" })
    async artist(): Promise<PrismaArtist> {
        return prisma.artist.findUniqueOrThrow({
            where: { id: this.fkArtistId },
        });
    }

    fkArtistId: string;

    @Field(() => Bounty, { name: "bounty", nullable: true })
    async bounty(): Promise<PrismaBounty | null> {
        return prisma.bounty.findUnique({
            where: { fkTrackId: this.id },
        });
    }

    fkBountyId: string | null;

    @Field(() => [Nft], { name: "nfts" })
    async nfts(): Promise<PrismaNft[]> {
        return prisma.nft.findMany({
            where: { fkTrackId: this.id },
        });
    }

    @Field(() => [User], { name: "owners" })
    async owners(): Promise<PrismaUser[]> {
        return prisma.user.findMany({
            where: { nfts: { some: { fkTrackId: this.id } } },
        });
    }
}
