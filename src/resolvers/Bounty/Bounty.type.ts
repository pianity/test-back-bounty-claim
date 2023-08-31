import { Bounty as PrismaBounty } from "@prisma/client";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Bounty implements PrismaBounty {
    @Field(() => ID)
    id: string;

    createdAt: Date;

    updatedAt: Date;

    @Field(() => Boolean, { name: "public" })
    isPublic: boolean;

    @Field(() => String, { name: "publicCode", nullable: true })
    publicCode(): string | null {
        if (this.isPublic) {
            return this.claimCode;
        }
        return null;
    }

    claimCode: string;

    @Field(() => String, { nullable: true })
    maxClaim: number | null;

    isActive: boolean;

    isRandom: boolean;

    fkTrackId: string;
}
