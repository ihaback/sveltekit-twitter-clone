<script lang="ts">
	import { enhance } from '$app/forms';
	export let type: 'login' | 'signup';
	export let form: { message: string } | null;
	export let loading = false;
</script>

<div class="flex min-h-full flex-col justify-center">
	<div class="mx-auto w-full max-w-md px-8">
		<form
			method="post"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			class="space-y-6"
		>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Username</label>
				<div class="mt-1">
					<input
						id="email"
						required
						name="username"
						type="text"
						autocomplete="username"
						aria-describedby="email-error"
						class="w-full rounded border border-gray-500 px-2 py-1 text-lg"
					/>
					{#if form?.message}
						<div class="pt-1 text-red-700" id="email-error">
							{form.message}
						</div>
					{/if}
				</div>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<div class="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						aria-describedby="password-error"
						class="w-full rounded border border-gray-500 px-2 py-1 text-lg"
					/>
				</div>
			</div>
			<button
				type="submit"
				class="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-200"
				disabled={loading}
				>Log in
			</button>
			{#if type === 'login'}
				<div class="flex items-center justify-end">
					<div class="text-center text-sm text-gray-500">
						Don't have an account? <a class="text-blue-500 underline" href="/signup">Sign up</a>
					</div>
				</div>
			{/if}
			{#if type === 'signup'}
				<div class="flex items-center justify-end">
					<div class="text-center text-sm text-gray-500">
						Already have an account? <a class="text-blue-500 underline" href="/login">Login</a>
					</div>
				</div>
			{/if}
		</form>
	</div>
</div>
