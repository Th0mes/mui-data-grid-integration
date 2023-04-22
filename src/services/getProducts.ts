import { api } from '../utils/api';

export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

interface ProductsResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export async function getProducts(skip?: number): Promise<ProductsResponse> {
	const products = await api<ProductsResponse>('/products', {
		params: {
			limit: 10,
			skip: skip,
			select: 'id,title,description,price,discountPercentage,rating,stock',
		},
	});

	return products.data;
}
