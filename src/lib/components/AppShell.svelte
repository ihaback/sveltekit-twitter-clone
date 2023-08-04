<script lang="ts">
	import Sidebar from './Sidebar.svelte';

	export let user_id: string | undefined;
</script>

<div class="mx-auto w-full grow lg:flex min-h-full">
	<div class="flex-1 xl:flex">
		<div
			class="border-b border-gray-200 pt-0 xl:w-80 xl:shrink-0 xl:border-b-0 xl:border-r xl:pt-6"
		>
			<Sidebar {user_id} />
		</div>

		<div class="py-6 xl:flex-1"><slot name="main" /></div>
	</div>

	<div
		class="relative shrink-0 border-t border-gray-200 px-4 py-2 sm:px-6 lg:w-4/12 lg:border-l lg:border-t-0 lg:pr-8 xl:py-6 xl:pr-6"
	>
		<div class="sticky top-3"><slot name="outlet" /></div>
	</div>
</div>
