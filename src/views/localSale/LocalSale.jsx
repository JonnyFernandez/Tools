import { useState } from 'react';
import x from './LocalSale.module.css';
import { apiProd } from '../../api/product';
import { getProd } from '../../redux/productSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import exportCartToPDF from '../../utils/makePdf';






const LocalSale = () => {
    const currentDate = new Date();

    const dispatch = useDispatch()
    const info = apiProd()
    useEffect(() => {
        dispatch(getProd(info))
    }, [])
    const { products } = useSelector(state => state.prod)

    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [discount, setDiscount] = useState('');

    const [paymentMethod, setPaymentMethod] = useState('');
    const [pay, setPay] = useState('');
    const [showInputs, setShowInputs] = useState(false);


    // Estado del formulario de producto
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        tax: "",
    });

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Agregar el producto al carrito
    const handleAddToCart = (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Crear un producto con datos válidos
        const productToAdd = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            quantity: parseInt(newProduct.quantity, 10),
            tax: parseFloat(newProduct.tax),
        };

        setCart((prevCart) => [...prevCart, productToAdd]); // Añadir al carrito
        setNewProduct({ name: "", price: "", quantity: "", tax: "" }); // Limpiar el formulario
    };

    // Filtrar productos por nombre o código
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Agregar un producto al carrito
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Calcular el subtotal del carrito
    const calculateSubTotal = () => {
        return cart.reduce((total, product) => total + product.quantity * product.price, 0);
    };

    // Calcular el total con descuento
    const calculateTotalWithDiscount = () => {
        const subtotal = calculateSubTotal();
        return subtotal - (subtotal * discount) / 100;
    };
    // Calcular el total con descuento
    const calculateTurned = () => {
        const totalWithDiscount = calculateTotalWithDiscount();
        let aux = pay ? pay - totalWithDiscount : 0
        return aux;
    };

    // Eliminar un producto del carrito
    const removeFromCart = (id) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    // Manejar cambio en el método de pago
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        if (method === 'cash') {
            setShowInputs(true)
        } else {
            setShowInputs(false)
        }

    };

    const data = { 'cart': cart, 'total-w-discount': calculateTotalWithDiscount(), 'PaymentMethod': paymentMethod, 'total': calculateSubTotal(), 'discount': discount, 'user': '', 'date': currentDate.toLocaleDateString(), 'paymentWith': pay, 'resPayment': calculateTurned() }
    console.log(data);

    const handleExportPDF = () => {
        exportCartToPDF(cart);
    };


    return (
        <div className={x.home}>
            <div className={x.card}>
                <h2 className={x.title}>Ventas Locales</h2>

                {/* Buscador */}
                <div className={x.form}>
                    <div className={x.inputGroup}>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* <label>Buscar Producto</label> */}
                    </div>
                </div>

                <div >
                    <form onSubmit={handleAddToCart} className={x.headerInputs}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre del Producto"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Precio"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Cantidad"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="tax"
                            placeholder="Impuesto (%)"
                            value={newProduct.tax}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Añadir al Carrito</button>
                    </form>
                </div>


                {/* Lista de productos filtrados */}
                {searchQuery && (
                    <div className={x.tableContainer}>
                        <table className={x.table}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>
                                            <button
                                                className={x.addButton}
                                                onClick={() => addToCart(product)}
                                            >
                                                Agregar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Carrito */}
                <h3>Carrito</h3>
                <div className={x.tableContainer}>
                    <table className={x.table}>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>${(product.quantity * product.price).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className={x.deleteButton}
                                            onClick={() => removeFromCart(product.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Métodos de Pago */}
                <div className={x.paymentMethods}>
                    <h4>Método de Pago:</h4>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => handlePaymentMethodChange('cash')}
                            />
                            Efectivo
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="electronic"
                                checked={paymentMethod === 'electronic'}
                                onChange={() => handlePaymentMethodChange('electronic')}
                            />
                            Pago Electrónico
                        </label>
                    </div>
                </div>

                {/* Totales */}
                <div className={x.total}>
                    {
                        showInputs && (
                            <div className={x.discount}>

                                <label>Descuento (%): </label>
                                <input
                                    type="number"
                                    value={discount}
                                    placeholder='Descuento (%)'
                                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                />
                                <label>Pago con ($): </label>
                                <input
                                    type="number"
                                    value={pay}
                                    onChange={(e) => setPay(parseFloat(e.target.value))}
                                    placeholder='¿Con cuanto paga?'
                                />
                                <span>Vuelto: ${calculateTurned().toFixed(2)}</span>

                            </div>
                        )
                    }


                    <div className={x.pep}>
                        <h4>MontoTotal: ${calculateSubTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                        {showInputs && <span>Monto Off: ${calculateTotalWithDiscount().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>}
                    </div>
                </div>

                <button className={x.completeButton} onClick={handleExportPDF}>Done</button>



            </div>
        </div>
    );
};

export default LocalSale;
