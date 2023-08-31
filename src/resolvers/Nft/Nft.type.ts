import { Field, ID, Int, ObjectType } from "type-graphql";
import { Nft as PrismaNft, Track as PrismaTrack, User as PrismaUser } from "@prisma/client";

import { User } from "@/resolvers/User/User.type";
import { prisma } from "@/prisma";

@ObjectType()
export class Nft implements PrismaNft {
    @Field(() => ID)
    id: string;

    createdAt: Date;

    updatedAt: Date;

    @Field(() => Int)
    number: number;

    @Field(() => User, { name: "owner", nullable: true })
    async owner(): Promise<PrismaUser | null> {
        if (!this.fkOwnerId) {
            return null;
        }
        return prisma.user.findUnique({
            where: { id: this.fkOwnerId },
        });
    }

    fkOwnerId: string | null;

    @Field(() => String, { name: "track" })
    async track(): Promise<PrismaTrack> {
        return prisma.track.findUniqueOrThrow({
            where: { id: this.fkTrackId },
        });
    }

    fkTrackId: string;
}
