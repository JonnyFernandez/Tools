import p from './ProdManagement.module.css';
import { apiProd } from '../../api/product';
import { getProd, filterCategory, filterPrice, filterLowStock, filterDistribuitor } from '../../redux/productSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ProdForm } from '../../components'

const ProdManagement = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProd(apiProd()));
    }, [dispatch]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    const { products } = useSelector(state => state.prod);

    // Filtrar productos por nombre o código
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStockClass = (stock, minStock) => {
        if (stock === 0) return p.notStock;
        if (stock <= minStock) return p.lowStock;
        return p.cardStock;
    };

    const handleCategory = (e) => dispatch(filterCategory(e.target.value))

    const handleStock = (e) => dispatch(filterLowStock(e.target.value))
    const handlePrice = (e) => dispatch(filterPrice(e.target.value))
    const handleDistribuitor = (e) => dispatch(filterDistribuitor(e.target.value))

    const toggleOpen = () => setIsOpen(prev => !prev)

    return (
        <div className={p.prodManagement}>
            <h1 className={p.title}>Product Management</h1>
            <div className={p.filterContainer}>

                <select className={p.filterSelect} onChange={handleCategory}>
                    <option value="">Category</option>
                    <option value="pileta">Pileta</option>
                    <option value="bazar">Bazar</option>
                    <option value="jugueteria">Jugueteria</option>
                    <option value="quimica">Quimica</option>
                </select>

                <select className={p.filterSelect} onChange={handlePrice}>
                    <option value="">Price</option>
                    <option value="mas">Mayor</option>
                    <option value="min">Menor</option>
                </select>
                <select className={p.filterSelect} onChange={handleDistribuitor}>
                    <option value="">Suplidor</option>
                    <option value="quillay">Quillay</option>
                    <option value="tecnoclor">Tecnoclor</option>
                    <option value="ana">Ana</option>
                </select>
                <select className={p.filterSelect} onChange={handleStock}>
                    <option value="all">Stock</option>
                    <option value="min">Minimo</option>
                    <option value="cero">Sin Stock</option>
                </select>

                <select className={p.filterSelect}>
                    <option value="">Price Management</option>
                    <option value="">Categoría</option>
                    <option value="">Distribuidor</option>
                    <option value="">Globales </option>
                    <option value="">Promociones  </option>
                </select>
                <button className={p.filterSelect} onClick={() => setIsOpen(prev => !prev)}>Agregar Producto</button>
                <div >
                    <input
                        type="text"
                        placeholder="Buscar por nombre o código"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={p.filterSelect}
                    />

                </div>
            </div>

            {isOpen && <Modal isOpen={isOpen} toggleOpen={toggleOpen} children={<ProdForm />} />}

            <div className={p.cardContainer}>
                {filteredProducts?.map(({ id, image, name, description, stock, minStock, price }) => (
                    <div key={id} className={p.card}>
                        <img src={image} alt={name} className={p.cardImage} />
                        <div className={p.cardContent}>
                            <h2 className={p.cardTitle}>{name}</h2>
                            <span>Cod:{id}</span>
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
