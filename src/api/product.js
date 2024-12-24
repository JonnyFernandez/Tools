import axios from './axios'

const products = [
    { id: '001', name: 'Producto 1', stock: 100, description: 'Descripción del producto 1', image: '', price: 10 },
    { id: '002', name: 'Producto 2', stock: 50, description: 'Descripción del producto 2', image: '', price: 20 },
    { id: '003', name: 'Producto 3', stock: 200, description: 'Descripción del producto 3', image: '', price: 15 },
    { id: '004', name: 'cloro liquido', stock: 200, description: 'Descripción del producto 3', image: '', price: 760 },
    { id: '005', name: 'cloro DL', stock: 200, description: 'Descripción del producto 3', image: '', price: 7500 },
    { id: '006', name: 'cloro DR', stock: 200, description: 'Descripción del producto 3', image: '', price: 7500 },
    { id: '007', name: 'cloro MF', stock: 200, description: 'Descripción del producto 3', image: '', price: 7900 },
];

// -------------------------Fake end point---------------------------------------------------
export const apiProd = () => products;

export const apiGetProdByName = async () => products;
export const api_Like = async () => products;
export const api_DisLike = async () => products;
export const api_prod_details = async () => products;
export const api_post_review = async () => products;
export const api_post_cart = async () => products;

// ------------------Real endpoint----------------------------------------------------------
// export const apiGetProd = async () => await axios(`/prod`);
// export const apiGetProdByName = async (name) => await axios(`/prod?name=${name}`);
// export const api_Like = async (data) => await axios.post(`/like`, data);
// export const api_DisLike = async (id) => await axios.delete(`/like/${id}`);
// export const api_prod_details = async (id) => await axios(`/prod/${id}`);
// export const api_post_review = async (data) => await axios.post(`/review/`, data);
// export const api_post_cart = async (data) => await axios.post(`/cart/`, data); 


