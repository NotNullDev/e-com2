<script lang="ts">
    import {page} from '$app/stores';
    import type {NewProduct} from '$lib/schema';
    import {appStore} from '$lib/store';
    import {api} from '$lib/trpc';
    import {TRPCClientError} from '@trpc/client';
    import {Button, Input, InputNumber, TextArea} from "stwui";

    const user = $page.data.session?.user!;

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
            seller: user.email
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

<div class="container mx-auto w-full">
    <form
            class="p-24 flex items-center gap-4 flex-col"
            on:submit|preventDefault={() => {
			createProduct();
		}}
    >
        <h2 class="w-full text-4xl">List product</h2>

        <Input name="input" bind:value={newProduct.title} class="w-full" placeholder="Product title">
            <Input.Label slot="label">Title</Input.Label>
        </Input>


        <TextArea name="description" placeholder="Description" class="w-full" bind:value={newProduct.description}>
	        <TextArea.Label slot="label">Description</TextArea.Label>
        </TextArea>

        <InputNumber class="w-full" name="price"bind:value={newProduct.price} >
            <InputNumber.Label slot="label">Price</InputNumber.Label>
        </InputNumber>

        <InputNumber class="w-full" name="stock"bind:value={newProduct.stock} >
            <InputNumber.Label slot="label">Stock</InputNumber.Label>
        </InputNumber>

        <Button type="primary" class="self-end">Create</Button>
    </form>
</div>
