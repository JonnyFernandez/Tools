import axios from './axios'

const products = [
    { id: '001', code: '', name: 'Producto 1', stock: 20, minStock: 20, description: 'Descripción del producto 1', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 10, distribuitor: ['quillay', 'tecnoclor'], category: ['quimica', 'bazar',], active: true, 'tax': 21 },
    { id: '002', code: '', name: 'Producto 2', stock: 0, minStock: 20, description: 'Descripción del producto 2', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_878129-MLA53164699794_012023-F.webp', price: 20, distribuitor: ['quillay', 'tecnoclor'], category: ['pileta', 'jugueteria'], active: true, 'tax': 21 },
    { id: '003', code: '', name: 'Producto 3', stock: 200, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_781792-MLA47133276673_082021-O.webp', price: 15, distribuitor: ['quillay', 'tecnoclor'], category: ['pileta', 'jugueteria'], active: true, 'tax': 21 },
    { id: '004', code: '', name: 'cloro liquido', stock: 200, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 760, distribuitor: ['quillay', 'tecnoclor'], category: ['pileta', 'jugueteria'], active: true, 'tax': 21 },
    { id: '005', code: '', name: 'cloro DL', stock: 0, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 7500, distribuitor: ['quillay', 'tecnoclor'], category: ['pileta', 'jugueteria'], active: true, 'tax': 21 },
    { id: '006', code: '', name: 'cloro DR', stock: 200, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 7500, distribuitor: ['quillay', 'tecnoclor'], category: ['pileta', 'jugueteria'], active: true, 'tax': 21 },
    { id: '007', code: '', name: 'cloro MF', stock: 200, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 7900, distribuitor: ['tecnoclor'], category: ['pileta', 'jugueteria'], active: true, 'tax': 21 },
    { id: '008', code: '', name: 'cloro MF', stock: 10, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 7900, distribuitor: ['quillay'], category: ['pileta', 'bazar', 'jugueteria'], active: true, 'tax': 21 },
    { id: '009', code: '', name: 'cloro MF', stock: 10, minStock: 20, description: 'Descripción del producto 3', image: 'https://http2.mlstatic.com/D_NQ_NP_2X_895197-MLA81353946081_122024-F.webp', price: 7900, distribuitor: ['ana'], category: ['pileta', 'bazar', 'jugueteria'], active: true, 'tax': 21 },
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



