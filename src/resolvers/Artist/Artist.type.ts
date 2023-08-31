import { Field, ID, ObjectType } from "type-graphql";
import { Artist as PrismaArtist, User as PrismaUser } from "@prisma/client";

import { prisma } from "@/prisma";
import { User } from "@/resolvers/User/User.type";

@ObjectType()
export class Artist implements PrismaArtist {
    @Field(() => ID)
    id: string;

    createdAt: Date;

    updatedAt: Date;

    @Field(() => String)
    slug: string;

    @Field(() => String)
    name: string;

    firstName: string | null;

    lastName: string | null;

    @Field(() => Boolean)
    isVerified: boolean;

    @Field(() => String, { nullable: true })
    avatarUrl: string | null;

    @Field(() => User, { name: "user" })
    async user(): Promise<PrismaUser> {
        return prisma.user.findUniqueOrThrow({
            where: { id: this.fkUserId },
        });
    }

    fkUserId: string;
}
