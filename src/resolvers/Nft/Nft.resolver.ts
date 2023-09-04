import { Arg, Ctx, Mutation, Resolver } from "type-graphql"

import { Context } from "@/schema";

import { Nft } from "@/resolvers/Nft/Nft.type";
import { prisma } from "@/prisma";

@Resolver (() => Nft)
export class NftResolver {

   @Mutation(() => Nft)
   async sendNft(
            @Ctx() { user }: Context,
            @Arg("nftId") nftId: string,
            @Arg("newOwnerId") newOwnerId: string
        ) {

            //check user id
            if (!user?.id) {
                throw new Error("user not found");
            }
    
            // check nft id & ownership
            const nft = await prisma.nft.findUnique({
                where: {id:nftId, fkOwnerId: user.id}                    
                });
    
            if (!nft) {
                throw new Error("nft not found");
            }
            
            // check new Owner
            const nextOwner = await prisma.user.findUnique({
                where: { id: newOwnerId },
            });
    
            if (!nextOwner) {
                throw new Error("new owner not found");
            }
    
            // update nft's owner 
            const updatedNft = await prisma.nft.update({
                where: { id: nft.id },
                data: { fkOwnerId: newOwnerId },
            });
    
            return updatedNft;
        }
    }