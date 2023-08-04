import { redirect, type Actions, fail } from '@sveltejs/kit';

import { createTweet, deleteTweet, getTweet } from '$lib/server/models/tweet.server';
import type { PageServerLoad } from './$types';

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
				message: 'Could not delete tweet'
			});
		}

		const tweet = await getTweet({ id: params.tweetId });

		const is_owner = tweet?.user_id === session.user.userId;

		if (!is_owner) {
			if (!params?.tweetId) {
				return fail(400, {
					message: 'Could not delete tweet'
				});
			}
		}

		await deleteTweet({ id: params.tweetId, user_id: session.user.userId });

		throw redirect(302, '/tweets');
	},
	create: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '../?/logout');

		const form_data = await request.formData();
		const body = form_data.get('body');

		if (typeof body !== 'string') {
			return fail(400, {
				message: 'Invalid tweet'
			});
		}

		try {
			await createTweet({ body, user_id: session.user.userId });
		} catch (error) {
			return fail(400, {
				message: 'Could not create tweet'
			});
		}
		throw redirect(302, '/tweets');
	}
};
