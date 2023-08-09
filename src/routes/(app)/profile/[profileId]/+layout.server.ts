import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import { getTweetListItems } from '$lib/server/models/tweet.server';
import { getUserById } from '$lib/server/models/user.server';
import { getFollowers } from '$lib/server/models/follow.server';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const tweets = await getTweetListItems({ user_ids: [params.profileId] });

	const profile_user = await getUserById(params?.profileId);

	const following = await getFollowers({ following_id: params.profileId });

	const is_following = following?.some((x) => x.follower_id === session.user.userId);

	return {
		tweets,
		profile_user,
		is_following
	};
};
