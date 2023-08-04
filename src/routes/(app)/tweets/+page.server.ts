import { redirect, type Actions, fail } from '@sveltejs/kit';

import { createTweet } from '$lib/server/models/tweet.server';

export const actions: Actions = {
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
	}
};
