import p from './ProdManagement.module.css';
import { apiProd } from '../../api/product';
import { getProd } from '../../redux/productSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProdManagement = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProd(apiProd()));
    }, [dispatch]);

    const { products } = useSelector(state => state.prod);

    const getStockClass = (stock, minStock) => {
        if (stock === 0) return p.notStock;
        if (stock <= minStock) return p.lowStock;
        return p.cardStock;
    };

    return (
        <div className={p.prodManagement}>
            <h1 className={p.title}>Product Management</h1>
            <div className={p.filterContainer}>
                <h5 className={p.filterTitle}>Filter by:</h5>
                <select className={p.filterSelect}>
                    <option value="">Category</option>
                </select>
                <select className={p.filterSelect}>
                    <option value="">Price</option>
                </select>
                <select className={p.filterSelect}>
                    <option value="">Supplier</option>
                </select>
                <select className={p.filterSelect}>
                    <option value="">Stock</option>
                </select>
                <select className={p.filterSelect}>
                    <option value="">Price Management</option>
                    <option value="">Categoría</option>
                    <option value="">Distribuidor</option>
                    <option value="">Globales </option>
                    <option value="">Promociones  </option>
                </select>
                <button className={p.addProd}>Agregar Producto</button>
            </div>
            <div className={p.cardContainer}>
                {products?.map(({ id, image, name, description, stock, minStock, price }) => (
                    <div key={id} className={p.card}>
                        <img src={image} alt={name} className={p.cardImage} />
                        <div className={p.cardContent}>
                            <h2 className={p.cardTitle}>{name}</h2>
                            <p className={p.cardDescription}>{description}</p>
                            <p className={getStockClass(stock, minStock)}>stock: {stock}</p>
                            <p className={p.cardPrice}>${price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProdManagement;
