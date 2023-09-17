import {products} from '$lib/schema';
import {type inferAsyncReturnType, initTRPC, TRPCError} from '@trpc/server';
import type {FetchCreateContextFnOptions} from '@trpc/server/adapters/fetch';
import superjson from 'superjson';
import {z} from 'zod';
import {db} from './db';

export type User = {
    id: string;
    name: string;
    bio?: string;
};

export const t = initTRPC.context<Context>().create({
    transformer: superjson
});

// public procedure
const pt = t.procedure;

export const appRouter = t.router({
    getAllProducts: pt.query(async () => {
        return await db.query.products.findMany();
    }),
    createProduct: pt
        .input(
            z.object({
                title: z.string().min(1),
                description: z.string().min(1),
                price: z.number().positive(),
                stock: z.number().positive(),
                categories: (z.string().array()).optional(),
                discountPercent: z.number().nonnegative().optional().default(0),
                images: (z.string().array()).optional(),
                previewImage: z.string().optional(),
                location: z.string().optional()
            })
        )
        .mutation(async ({input: {title, description, price, images, discountPercent, previewImage, location, categories, stock}}) => {
            const createdProducts = await db
                .insert(products)
                .values({
                    title,
                    description,
                    price,
                    stock,
                    categories,
                    images,
                    previewImage,
                    location,
                    discountPercent,
                    seller: null
                })
                .returning();

            const createdProduct = createdProducts.at(0);
            if (!createdProduct) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to create product.'
                });
            }

            return createdProduct;
        })
});

export function createContext({req, resHeaders}: FetchCreateContextFnOptions) {
    const user = {name: req.headers.get('username') ?? 'anonymous'};
    return {req, resHeaders, user};
}

export type Context = inferAsyncReturnType<typeof createContext>;
export type AppRouter = typeof appRouter;
