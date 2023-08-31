import { Artist, PrismaClient, Track, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function capitalize(name: string) {
    return name
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function generateArtistName() {
    const rand = Math.random();
    let name = faker.word.noun();

    if (rand < 0.5) {
        name = `${faker.word.adjective()} ${name}`;
    } else if (rand < 0.75) {
        name = `${faker.word.adverb()} ${faker.word.adjective()} ${name}`;
    }

    return capitalize(name);
}

async function createUser(): Promise<User> {
    const username = faker.internet.userName();

    const user = await prisma.user.create({
        data: {
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            isEmailVerified: faker.datatype.boolean(),
            isAdmin: faker.datatype.boolean(),
            slug: faker.helpers.slugify(username).toLowerCase(),
            username,
        },
    });
    await prisma.ipAddress.create({
        data: {
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            address: faker.internet.ip(),
            isBanned: false,
            fkUserId: user.id,
        },
    });

    return user;
}

async function createArtist(userId?: string): Promise<Artist> {
    const name = generateArtistName();

    userId = userId || (await createUser()).id;

    const artist = await prisma.artist.create({
        data: {
            name,
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            isVerified: faker.datatype.boolean(),
            slug: faker.helpers.slugify(name).toLowerCase(),
            avatarUrl: faker.image.avatar(),
            fkUserId: userId,
        },
    });

    return artist;
}

async function createTrack(artistId?: string): Promise<Track> {
    const title = faker.music.songName();

    artistId = artistId || (await createArtist()).id;

    const track = await prisma.track.create({
        data: {
            title,
            id: faker.string.uuid(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            slug: faker.helpers.slugify(title).toLowerCase(),
            thumbnailUrl: faker.image.avatar(),
            fkArtistId: artistId,
        },
    });

    for (let i = 1; i <= 50; i++) {
        await prisma.nft.create({
            data: {
                id: faker.string.uuid(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
                number: i,
                fkTrackId: track.id,
            },
        });
    }

    if (Math.random() > 0.6) {
        await prisma.bounty.create({
            data: {
                id: faker.string.uuid(),
                claimCode: faker.string.hexadecimal({ length: 16 }),
                isPublic: faker.datatype.boolean(),
                isActive: faker.datatype.boolean(),
                isRandom: faker.datatype.boolean(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
                fkTrackId: track.id,
            },
        });
    }

    return track;
}

async function main() {
    for (let i = 0; i < 25; i++) {
        await createTrack();
    }
    for (let i = 0; i < 10; i++) {
        await createUser();
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
