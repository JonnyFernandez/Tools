import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    backup: [],
    currentPage: 1,
    shoppingCart: [],
    details: {},
    categories: [],
    favorites: [], // Agregado al estado inicial
};

const prodSlice = createSlice({
    name: "prod",
    initialState,
    reducers: {
        // Carga los productos y crea un respaldo
        getProd: (state, action) => {
            state.products = action.payload;
            state.backup = action.payload;
        },

        // Configura la página actual
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        // Navega entre páginas reutilizando setCurrentPage
        setPrevPage: (state) => {
            if (state.currentPage > 1) state.currentPage--;
        },
        setNextPage: (state) => {
            state.currentPage++;
        },

        // Filtra productos por nombre
        searchName: (state, action) => {
            const name = action.payload.toLowerCase();
            const filtered = state.backup.filter(product =>
                product.name.toLowerCase().includes(name)
            );
            state.products = filtered.length ? filtered : state.backup;
        },

        // Gestión de favoritos
        addFav: (state, action) => {
            const exists = state.favorites.find(item => item.id === action.payload.id);
            if (!exists) state.favorites.push(action.payload);
        },
        removeFav: (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload);
        },
        setFavItems: (state, action) => {
            state.favorites = action.payload;
        },

        // Gestión del carrito
        addCart: (state, action) => {
            const exists = state.shoppingCart.find(item => item.id === action.payload.id);
            if (!exists) state.shoppingCart.push(action.payload);
        },
        removeCart: (state, action) => {
            state.shoppingCart = state.shoppingCart.filter(item => item.id !== action.payload);
        },
        setCartItems: (state, action) => {
            state.shoppingCart = action.payload;
        },
        cleanCart: (state) => {
            state.shoppingCart = [];
        },

        // Configura los detalles de un producto
        postDetails: (state, action) => {
            state.details = action.payload;
        },

        // Filtra productos por categoría
        filterCategory: (state, action) => {
            const filtered = state.backup.filter(item => item.category === action.payload);
            state.products = filtered.length ? filtered : state.backup;
        },

        // Ordena productos por precio
        filterPrice: (state, action) => {
            const sorted = [...state.backup].sort((a, b) =>
                action.payload === "min" ? a.price - b.price : b.price - a.price
            );
            state.products = sorted;
        },
    },
});

export const {
    getProd,
    setCurrentPage,
    setPrevPage,
    setNextPage,
    searchName,
    addFav,
    removeFav,
    setFavItems,
    addCart,
    removeCart,
    setCartItems,
    cleanCart,
    postDetails,
    filterCategory,
    filterPrice,
} = prodSlice.actions;

export default prodSlice.reducer;
