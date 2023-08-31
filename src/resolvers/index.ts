import { ClassType, NonEmptyArray } from "type-graphql";

import { BountyResolver } from "@/resolvers/Bounty/Bounty.resolver";
import { TrackResolver } from "@/resolvers/Track/Track.resolver";
import { UserResolver } from "@/resolvers/User/User.resolver";

export default [BountyResolver, TrackResolver, UserResolver] as NonEmptyArray<ClassType>;
