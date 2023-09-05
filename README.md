# Pianity Back End Dev Technical Interview

## Context

For the sake of this test, most of these concepts have been highly simplified.

As you hopefully know, Pianity is a marketplace for music NFTs. Artists can upload their songs and sell them as NFTs to users.
There is a special kind of NFT which is free to claim. We refer to these NFTs as "Bounty" NFTs.

A Bounty is associated to a song and includes all NFTs of this song.
A Bounty can be claimed for free by a user and they'll receive an NFT (usually random) associated to this Bounty that isn't already owned by a user.

### Authentication

Authentication has not been implemented in this app. You simply need to pass the user ID in the correct header field.

## Goals

For this exercise, you have two tasks. They don't need to be done in order.

You are allowed to changed everything in the code, including the database schema, as long as you stay reasonable and can properly justify your decisions.

### Task 1

Your first task is to implement the GraphQL Mutation to claim a Bounty. This mutation is marked with a `TODO` comment.

You must respect the claiming rules mentioned here and in the method's comments.

#### Rules

-   A Bounty cannot be claimed if it is not active.
-   A Bounty can only be claimed with its corresponding claim code.
-   A Bounty cannot be claimed by the same user more than once.
-   A Bounty can have a maximum number of claims.
-   Only NFTs without an owner may be received when claiming a Bounty.
-   If the Bounty is `random`, then the NFT received is choosen randomly. Otherwise they are claimed starting from `number` 1.

### Task 2

Your second task is to implement a mutation that allows a user to send one of his NFTs to another user. This will also have implications on the bountyClaim mutation.

#### Rules

-   A user can only send an NFT they own.
-   A user cannot claim a Bounty more than once (even if they sent their claimed NFT to another user)
-   A user who received a claimed NFT from someone else is still allowed to claim their own.

###

We highly suggest you make use of the [prettier](https://prettier.io/docs/en/editors) and [eslint](https://eslint.org/docs/latest/use/integrations) rules.

## Setup

Start by forking this project and cloning your fork to your machine.

A docker file is provided to quickly setup a postgresql database for you. You can download docker [here](https://www.docker.com/products/docker-desktop/).
Once you have docker installed, simply run `docker compose up -d` from the project's root.

You can install the project's dependencies using `yarn`.

You'll also need to create the `.env` file at the project's root. This file will only need to contain a single variable.

```toml
DATABASE_URL="postgresql://pianity:password@localhost:5432/pianity"
```

Then all that is left is creating the database and seeding it. Simply run the following commands

```shell
# Generate the types (also links the .env file)
yarn prisma:generate

# Create the tables
yarn prisma:deploy

# Seed the database
yarn prisma:seed
```

You can now run the application with `yarn dev`.

## Tips

-   You have access to your schema and a graph explorer when navigating to `http://localhost:4000/graphql`
-   You can spin up a local app to inspect your database by running `yarn prisma:studio`

## Bonus

Feel free to improve the system how you see fit. There are not limitations for this bonus, as long as you are able to justify every decision.

### Ideas

-   Preventing users using multiple accounts to claim the same Bounty more than once.
-   Preventing users to claim more than 1 Bounty per day.
