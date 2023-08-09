import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import { getTweetListItems } from '$lib/server/models/tweet.server';
import { getFollows } from '$lib/server/models/follow.server';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const follows = await getFollows({ follower_id: session.user.userId });

	const follows_ids = [session.user.userId, ...follows.map((x) => x.following_id)];

	const tweets = await getTweetListItems({ user_ids: follows_ids });

	return {
		tweets
	};
};
