import p from './ProdManagement.module.css';
import { apiProd } from '../../api/product';
import { getProd } from '../../redux/productSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProdManagement = () => {
    const dispatch = useDispatch();
    const info = apiProd();

    useEffect(() => {
        dispatch(getProd(info));
    }, [dispatch]);

    const { products } = useSelector(state => state.prod);

    return (
        <div className={p.prodManagement}>
            <h1 className={p.title}>Product Management</h1>
            <div className={p.cardContainer}>
                {products?.map(product => (
                    <div key={product.id} className={p.card}>
                        <img src={product.image} alt={product.name} className={p.cardImage} />
                        <div className={p.cardContent}>
                            <h2 className={p.cardTitle}>{product.name}</h2>
                            <p className={p.cardDescription}>{product.description}</p>
                            <p className={p.cardPrice}>${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProdManagement;
