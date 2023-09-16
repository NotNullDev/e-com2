import { writable } from 'svelte/store';
import type { Product } from './schema';

export type AppStoreType = {
	products: Product[];
};

export const appStore = writable<AppStoreType>({
	products: []
});
