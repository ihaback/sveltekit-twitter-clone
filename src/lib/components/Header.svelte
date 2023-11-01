<script lang="ts">
	import { enhance } from '$app/forms';

	export let username: string;
	export let loading = false;
</script>

<header class="flex items-center justify-between bg-slate-800 p-4 text-white">
	<h1 class="text-3xl font-bold">Tweets</h1>
	<p>{username}</p>
	<form
		action="?/logout"
		method="post"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<button
			type="submit"
			class="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-slate-700 disabled:bg-slate-700"
			value="Sign out"
			disabled={loading}
		>
			Logout
		</button>
	</form>
</header>
