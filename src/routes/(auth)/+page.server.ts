import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { logout } from '$lib/server/actions';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');
	if (session) throw redirect(302, '/tweets');
};

export const actions: Actions = {
	logout
};
