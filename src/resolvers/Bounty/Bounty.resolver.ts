import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "@/schema";
import { Bounty } from "@/resolvers/Bounty/Bounty.type";
import { Nft } from "@/resolvers/Nft/Nft.type";

@Resolver(() => Bounty)
export class BountyResolver {
    /**
     * Attempt to claim a bounty with a claim code.
     * There are multiple restrictions on claiming a bounty:
     * - The bounty must be active
     * - The bounty must not have been claimed by this user
     * - The claim code must be the correct claim code for the bounty
     * - The NFT claimed cannot be owned by a user
     * An error will be thrown if any of these restrictions are not met.
     *
     * If the bounty is successfully claimed, the user will become owner of an NFT.
     * If the bounty's random property is true, the NFT will be random from the bounty's NFTs.
     *
     * @param context - The context of the request
     * @param claimCode - The claim code used to claim the bounty
     *
     * @returns The NFT claimed
     */
    @Mutation(() => Nft)
    async bountyClaim(@Ctx() { user }: Context, @Arg("claimCode", () => String) claimCode: string) {
        // TODO: Implement Bounty Claim
    }
}
