<script lang="ts">
	import { page } from '$app/stores';
	import type { NewProduct } from '$lib/schema';
	import { appStore } from '$lib/store';
	import { api } from '$lib/trpc';
	import { onMount } from 'svelte';

	const user = $page.data.session?.user;

	let newProduct = getEmptyProduct();

	function getEmptyProduct(): NewProduct {
		return {
			title: '',
			description: '',
			price: 0,
			stock: 0,
			categories: [],
			discountPercent: 0,
			images: [],
			previewImage: '',
			location: '',
			seller: null
		};
	}

	async function fetchAllProducts() {
		$appStore.products = await api.getAllProducts.query();
	}

	onMount(fetchAllProducts);
</script>

<div class="my-10 mx-auto w-[50vw] app-card">
	<h2 class="text-3xl mb-4">All products</h2>
	{#each $appStore.products as product}
		<div class="bg-base-200/40 p-4 rounded-md flex flex-col my-2">
			<div class="text-3xl">{product.title}</div>
			<div>{product.price} EUR</div>
			<div class="font-light my-3">{product.description}</div>
			<button class="btn btn-primary self-end w-min whitespace-nowrap">Dummy button</button>
		</div>
	{/each}
</div>
