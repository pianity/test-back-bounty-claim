import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { User as PrismaUser } from "@prisma/client";
import { faker } from "@faker-js/faker";

import { User, UserCreateInput } from "@/resolvers/User/User.type";
import { prisma } from "@/prisma";
import { Context } from "@/schema";

@Resolver(() => User)
export class UserResolver {
    @Query(() => User, { nullable: true })
    async user(@Arg("id", () => ID) id: string): Promise<PrismaUser | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    @Query(() => [User])
    async users(): Promise<PrismaUser[]> {
        return prisma.user.findMany();
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { user }: Context) {
        return user ?? null;
    }

    @Mutation(() => User)
    async userCreate(
        @Arg("user", () => UserCreateInput) userInput: UserCreateInput,
    ): Promise<PrismaUser> {
        return prisma.user.create({
            data: {
                ...userInput,
                id: faker.string.uuid(),
                slug: faker.helpers.slugify(userInput.username).toLowerCase(),
            },
        });
    }
}
