import axios from 'axios';

const api = axios.create({
    baseURL: 'https://northwind.vercel.app/api',
});

export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};
