import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Artist as PrismaArtist, User as PrismaUser } from "@prisma/client";

import { Artist } from "@/resolvers/Artist/Artist.type";
import { prisma } from "@/prisma";

@InputType()
export class UserCreateInput implements Partial<PrismaUser> {
    @Field(() => String)
    username: string;

    @Field(() => String)
    email: string;
}

@ObjectType()
export class User implements PrismaUser {
    @Field(() => ID)
    id: string;

    createdAt: Date;

    updatedAt: Date;

    @Field(() => String)
    slug: string;

    @Field(() => String)
    username: string;

    @Field(() => String, { nullable: true })
    avatarUrl: string | null;

    email: string;

    passwordHash: string | null;

    isAdmin: boolean | null;

    isEmailVerified: boolean;

    @Field(() => Artist, { name: "artist", nullable: true })
    async artist(): Promise<PrismaArtist | null> {
        return prisma.artist.findUnique({
            where: { fkUserId: this.id },
        });
    }
}
