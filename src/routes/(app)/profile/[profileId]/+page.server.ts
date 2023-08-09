import { follow, logout } from '$lib/actions';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	follow,
	logout
};
