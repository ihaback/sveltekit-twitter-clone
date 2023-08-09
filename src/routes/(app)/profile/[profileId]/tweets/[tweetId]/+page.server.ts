import { redirect, type Actions } from '@sveltejs/kit';

import { getTweet } from '$lib/server/models/tweet.server';
import type { PageServerLoad } from './$types';
import { logout, remove, follow } from '$lib/server/actions';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const tweet = await getTweet({ id: params.tweetId });

	return { tweet, user_id: session.user.userId };
};

export const actions: Actions = {
	follow,
	remove,
	logout
};
