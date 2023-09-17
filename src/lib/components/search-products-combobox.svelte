<script lang="ts">
	import { createCombobox, melt } from '@melt-ui/svelte';
	import { Check, ChevronDown, ChevronUp, SearchIcon } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox({
		forceVisible: true
	});

	type Manga = {
		author: string;
		title: string;
		disabled: boolean;
	};

	let mangas: Manga[] = [
		{
			author: 'Kentaro Miura',
			title: 'Berserk',
			disabled: false
		},
		{
			author: 'Hajime Isayama',
			title: 'Attack on Titan',
			disabled: false
		},
		{
			author: 'Junji Ito',
			title: 'Uzumaki',
			disabled: false
		},
		{
			author: 'Yomi Sarachi',
			title: 'Steins Gate',
			disabled: false
		},
		{
			author: 'Tite Kubo',
			title: 'Bleach',
			disabled: false
		},
		{
			author: 'Masashi Kishimoto',
			title: 'Naruto',
			disabled: true
		},
		{
			author: 'Katsura Hoshino',
			title: 'D.Gray Man',
			disabled: false
		},
		{
			author: 'Tsugumi Ohba',
			title: 'Death Note',
			disabled: false
		},
		{
			author: 'ONE',
			title: 'Mob Psycho 100',
			disabled: false
		},
		{
			author: 'Hiromu Arakawa',
			title: 'Fullmetal Alchemist',
			disabled: false
		}
	];

	$: filteredMangas = $touchedInput
		? mangas.filter(({ title, author }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return (
					title.toLowerCase().includes(normalizedInput) ||
					author.toLowerCase().includes(normalizedInput)
				);
		  })
		: mangas;
</script>

<div class="form-control">
  <div class="input-group">
    <input use:melt={$input} class="input input-bordered" placeholder="Find product" />
    <SearchIcon class="btn btn-square btn-ghost" />
  </div>
</div>
{#if $open}
	<ul
		class="z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="flex max-h-full flex-col gap-0 overflow-y-auto px-2 py-2 bg-base-100" tabindex="0">
			{#each filteredMangas as book, index (index)}
				<li
					use:melt={$option({
						value: book,
						label: book.title,
						disabled: book.disabled
					})}
					class="relative cursor-pointer scroll-my-2 rounded-md py-2 px-4
                            data-[highlighted]:bg-base-300
                            data-[disabled]:opacity-50"
				>
					{#if $isSelected(book)}
						<div class="check absolute left-2 top-1/2 z-10 text-magnum-900">
							<Check class="" />
						</div>
					{/if}
					<div class="pl-4">
						<span class="font-medium">{book.title}</span>
						<span class="block text-sm opacity-75">{book.author}</span>
					</div>
				</li>
			{:else}
				<li
					class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
          data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700"
				>
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}

<style lang="postcss">
	/*.check {*/
	/*	@apply absolute left-2 top-1/2 text-slate-200;*/
	/*	translate: 0 calc(-50% + 1px);*/
	/*}*/
</style>
