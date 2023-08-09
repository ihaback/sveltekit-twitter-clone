import { logout } from '$lib/actions';
import { createFollow, deleteFollow, getFollowers } from '$lib/server/models/follow.server';
import { getUserById } from '$lib/server/models/user.server';
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const actions: Actions = {
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
	},
	logout
};
