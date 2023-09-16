<script lang="ts">
	import type { NewProduct } from '$lib/schema';
	import { appStore } from '$lib/store';
	import { api } from '$lib/trpc';
	import { TRPCClientError } from '@trpc/client';

	let newProduct: NewProduct = getEmptyProduct();

	let errors = {
		createdProductError: ''
	};

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

	async function createProduct() {
		try {
			const createdProduct = await api.createProduct.mutate(newProduct);
			$appStore.products.push(createdProduct);
			$appStore.products = $appStore.products;
			console.log(createdProduct);
			newProduct = getEmptyProduct();
		} catch (e) {
			if (e instanceof TRPCClientError) {
				console.log(e.message);
				errors.createdProductError = `Ups! Something went wrong! Error: [${e.message}]`;
			}
		}
	}
</script>

<div>
	<h2>New product</h2>
	<form
		class="p-24 flex items-center gap-4 app-card flex-col w-min mx-auto mt-20"
		on:submit|preventDefault={() => {
			createProduct();
		}}
	>
		<h2 class="w-full text-2xl">New product</h2>
		<input
			class="input input-bordered"
			type="text"
			placeholder="Title"
			bind:value={newProduct.title}
		/>
		<input
			class="input input-bordered"
			type="text"
			placeholder="Description"
			bind:value={newProduct.description}
		/>
		<input
			class="input input-bordered"
			type="number"
			min="0"
			placeholder="Price"
			bind:value={newProduct.price}
		/>
		<button class="btn btn-primary btn-sm" type="submit">Create</button>
	</form>
</div>
