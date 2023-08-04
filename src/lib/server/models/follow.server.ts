import type { User } from '@prisma/client';
import { prisma } from '../prisma';

export function createFollow({
	following_id,
	follower_id
}: {
	following_id: User['id'];
	follower_id: User['id'];
}) {
	return prisma.follows.create({
		data: {
			following_id,
			follower_id
		}
	});
}

export function deleteFollow({
	following_id,
	follower_id
}: {
	following_id: User['id'];
	follower_id: User['id'];
}) {
	return prisma.follows.delete({
		where: {
			follower_id_following_id: {
				follower_id,
				following_id
			}
		}
	});
}

export function getFollowers({ following_id }: { following_id: User['id'] }) {
	return prisma.follows.findMany({
		where: { following_id },
		select: {
			follower_id: true
		}
	});
}

export function getFollows({ follower_id }: { follower_id: User['id'] }) {
	return prisma.follows.findMany({
		where: { follower_id },
		select: {
			following_id: true
		}
	});
}
