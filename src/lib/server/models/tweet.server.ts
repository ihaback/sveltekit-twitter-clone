import type { User, Tweet } from '@prisma/client';
import { prisma } from '../prisma';

export function getTweet({ id }: Pick<Tweet, 'id'>) {
	return prisma.tweet.findFirst({
		select: {
			id: true,
			body: true,
			user_id: true,
			user: { select: { username: true } }
		},
		where: { id }
	});
}

export function getTweetListItems({ user_ids }: { user_ids: User['id'][] }) {
	return prisma.tweet.findMany({
		where: { user_id: { in: user_ids } },
		select: {
			id: true,
			body: true,
			user_id: true,
			user: {
				select: {
					username: true,
					image_url: true
				}
			}
		},
		orderBy: { updated_at: 'desc' }
	});
}

export function getAllTweetListItems() {
	return prisma.tweet.findMany({
		select: {
			id: true,
			body: true,
			user_id: true,
			user: {
				select: {
					username: true,
					image_url: true
				}
			}
		},
		orderBy: { updated_at: 'desc' }
	});
}

export function createTweet({
	body,
	user_id
}: Pick<Tweet, 'body'> & {
	user_id: User['id'];
}) {
	return prisma.tweet.create({
		data: {
			body,
			user: {
				connect: {
					id: user_id
				}
			}
		}
	});
}

export function deleteTweet({ id, user_id }: Pick<Tweet, 'id'> & { user_id: User['id'] }) {
	return prisma.tweet.deleteMany({
		where: { id, user_id }
	});
}
