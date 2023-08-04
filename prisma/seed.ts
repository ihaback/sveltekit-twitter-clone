import { PrismaClient } from '@prisma/client';
import { lucia } from 'lucia';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const auth = await lucia({
	adapter: prismaAdapter(prisma, {
		user: 'user', // model User {}
		key: 'key', // model Key {}
		session: 'session' // model Session {}
	}),
	env: 'PROD'
});

async function seed() {
	const username = 'testuser';
	const password = 'password';
	const image_url = await faker.image.avatar();
	const admin_user = await auth.createUser({
		key: {
			providerId: 'username', // auth method
			providerUserId: username.toLowerCase(), // unique id when using "username" auth method
			password // hashed by Lucia
		},
		attributes: {
			username,
			image_url
		}
	});

	Array.from({ length: 10 }).map(async (_, i) => {
		const username = await faker.internet.userName();
		const password = 'password';
		const image_url = await faker.image.avatar();
		const user = await auth.createUser({
			key: {
				providerId: 'username', // auth method
				providerUserId: username.toLowerCase(), // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username,
				image_url
			}
		});

		await prisma.tweet.create({
			data: {
				body: await faker.commerce.productDescription(),
				user_id: user.userId
			}
		});

		await prisma.tweet.create({
			data: {
				body: await faker.commerce.productDescription(),
				user_id: user.userId
			}
		});

		await prisma.follows.create({
			data: {
				following_id: user.userId,
				follower_id: admin_user.userId
			}
		});
	});

	console.log(`Database has been seeded. 🌱`);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
