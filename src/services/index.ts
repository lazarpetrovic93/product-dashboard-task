import axios from 'axios';
import { Product } from '../types';

const api = axios.create({
    baseURL: 'https://northwind.vercel.app/api',
});

export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
    return await api.post('/products', product);
};

export const editProduct = async (productId: number, updatedProduct: Product): Promise<Product> => {
    return await api.put(`/products/${productId}`, updatedProduct);
};

export const deleteProduct = (productId: number) => {
    return api.delete(`/products/${productId}`);
};
