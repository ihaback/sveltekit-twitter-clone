import { auth } from '$lib/server/lucia';
import { createTweet, deleteTweet, getTweet } from '$lib/server/models/tweet.server';
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

	throw redirect(302, '/tweets');
}

export async function logout({ locals }: { locals: App.Locals }) {
	const session = await locals.auth.validate();
	if (!session) return fail(401);
	await auth.invalidateSession(session.sessionId); // invalidate session
	locals.auth.setSession(null); // remove cookie
	throw redirect(302, '/login'); // redirect to login page
}
