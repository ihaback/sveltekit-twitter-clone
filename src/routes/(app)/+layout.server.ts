import { redirect } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import { getUsers } from '$lib/server/models/user.server';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const users = await getUsers();

	return {
		user_id: session.user.userId,
		username: session.user.username,
		users
	};
};
