import { auth } from '$lib/server/lucia';
import { createFollow, deleteFollow, getFollowers } from '$lib/server/models/follow.server';
import { createTweet, deleteTweet, getTweet } from '$lib/server/models/tweet.server';
import { getUserById } from '$lib/server/models/user.server';
import { fail, redirect } from '@sveltejs/kit';

export async function create({ request, locals }: { request: Request; locals: App.Locals }) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	const form_data = await request.formData();
	const body = form_data.get('body');

	if (typeof body !== 'string') {
		return fail(400, {
			message: 'Invalid tweet'
		});
	}

	if (body.length < 10) {
		return fail(400, {
			message: 'To short tweet'
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

export async function remove({
	locals,
	params
}: {
	request: Request;
	locals: App.Locals;
	params: Partial<Record<string, string>>;
}) {
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
		return fail(400, {
			tweetErrorMessage: 'Could not delete tweet'
		});
	}

	if (params?.profileId && params.tweetId) {
		throw redirect(302, `/profile/${params.profileId}`);
	}

	throw redirect(302, '/tweets');
}

export async function logout({ locals }: { locals: App.Locals }) {
	const session = await locals.auth.validate();
	if (!session) return fail(401);
	await auth.invalidateSession(session.sessionId); // invalidate session
	locals.auth.setSession(null); // remove cookie
	throw redirect(302, '/login'); // redirect to login page
}

export async function follow({
	locals,
	params
}: {
	locals: App.Locals;
	params: Partial<Record<string, string>>;
}) {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/login');

	if (session.user.userId === params?.profileId) {
		return fail(400, {
			message: 'Not allowed to follow yourself'
		});
	}

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
