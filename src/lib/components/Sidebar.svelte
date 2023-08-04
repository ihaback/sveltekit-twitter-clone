<script lang="ts">
	import { classNames } from '$lib/utils';
	import { Home, FaceSmile, Users, Icon } from 'svelte-hero-icons';
	import { page } from '$app/stores';

	export let user_id: string | undefined;

	export const navigation = [
		{ to: '/tweets', text: 'Tweets', icon: Home },
		{ to: `/profile/${user_id}`, text: 'Profile', icon: FaceSmile },
		{ to: `/users`, text: 'Users', icon: Users }
	];

	export const currentPath = $page.url.pathname;

	export const isActive = true;
</script>

<nav class="flex flex-1 flex-col" aria-label="Sidebar">
	<ul class="list-none">
		{#each navigation as item}
			<li>
				<a
					href={item.to}
					class={classNames(
						item.to === currentPath
							? 'bg-gray-50 text-blue-500'
							: 'text-gray-700 hover:bg-gray-50 hover:text-blue-500',
						'pointer group flex items-center gap-x-3  rounded-md px-4 py-6 align-middle text-sm font-semibold leading-6 lg:px-8  xl:px-4 xl:py-4'
					)}
				>
					<Icon
						class={classNames(
							currentPath.includes(item.to)
								? 'text-blue-500'
								: 'text-gray-400 group-hover:text-blue-500',
							'h-7 w-8 shrink-0'
						)}
						aria-hidden="true"
						src={item.icon}
					/>
					{item.text}</a
				>
			</li>
		{/each}
	</ul>
</nav>
