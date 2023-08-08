import { fail, redirect, type Actions } from '@sveltejs/kit';

import { deleteTweet, getTweet } from '$lib/server/models/tweet.server';
import type { PageServerLoad } from './$types';
import { getUserById } from '$lib/server/models/user.server';
import { createFollow, deleteFollow, getFollowers } from '$lib/server/models/follow.server';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const tweet = await getTweet({ id: params.tweetId });

	return { tweet, user_id: session.user.userId };
};

export const actions: Actions = {
	delete: async ({ locals, params }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/login');

		if (!params?.tweetId) {
			return fail(400, {
				tweetErrorMessage: 'Could not delete tweet'
			});
		}

		const tweet = await getTweet({ id: params.tweetId });

		const is_owner = tweet?.user_id === session.user.userId;

		if (!is_owner) {
			if (!params?.tweetId) {
				return fail(400, {
					tweetErrorMessage: 'Could not delete tweet'
				});
			}
		}

		try {
			await deleteTweet({ id: params.tweetId, user_id: session.user.userId });
		} catch (error) {
			return fail(500, {
				tweetErrorMessage: 'Could not delete tweet'
			});
		}

		throw redirect(302, `/profile/${session.user.userId}`);
	},
	follow: async ({ locals, params }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '../?/logout');

		const profile_user = await getUserById(params?.profileId as string);

		const following = await getFollowers({ following_id: params.profileId as string });

		const is_following = following.some((x) => x.follower_id === session.user.userId);

		if (is_following) {
			try {
				await deleteFollow({
					following_id: profile_user?.id as string,
					follower_id: session.user.userId
				});
			} catch (error) {
				return fail(500, {
					message: 'Could not unfollow'
				});
			}
		} else {
			try {
				await createFollow({
					following_id: profile_user?.id as string,
					follower_id: session.user.userId
				});
			} catch (error) {
				return fail(500, {
					message: 'Could not follow'
				});
			}
		}
	}
};
