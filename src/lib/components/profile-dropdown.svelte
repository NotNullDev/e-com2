<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	async function logout() {
		await signOut();
		invalidateAll();
	}

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	const {
		elements: { trigger, menu, item, separator, arrow },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true
	});

	const {
		elements: { subMenu, subTrigger },
		states: { subOpen }
	} = createSubmenu();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked }
	} = createMenuRadioGroup({
		defaultValue: 'Hunter Johnston'
	});

	const {
		elements: { checkboxItem }
	} = createCheckboxItem({
		checked: settingsSync
	});

	const {
		elements: { checkboxItem: checkboxItemA }
	} = createCheckboxItem({
		checked: hideMeltUI
	});

	const user = $page.data.session?.user!;

	onMount(() => {});
</script>

<button type="button" class="trigger" use:melt={$trigger} aria-label="Update dimensions">
	<!-- <AlignJustify class="square-4" /> -->
	<img
		src={user.image}
		alt="your avatar"
		class="h-8 rounded-full brightness-75 focus-within:brightness-110 hover:brightness-110"
	/>
	<span class="sr-only">Open Popover</span>
</button>

{#if $open}
	<div
		class="bg-base-100 py-2 px-4 rounded-md flex flex-col items-center justify-center"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<a href="/profile" class="item" use:melt={$item}>Profile</a>
		<div class="separator" use:melt={$separator} />
		<button on:click={logout} class="item" use:melt={$item}>Logout</button>
		<div use:melt={$arrow} />
	</div>
{/if}

<style lang="postcss">
	.item {
		@apply p-1 px-4 focus-within:bg-base-300 cursor-pointer min-w-[100px] text-center rounded-md;
	}
	.separator {
		@apply bg-base-200/60 h-[1px] w-full rounded-md my-1;
	}
</style>
