import { useState } from 'react';
import x from './LocalSale.module.css';

const LocalSale = () => {
    const [products] = useState([
        { id: '001', name: 'Producto 1', stock: 100, description: 'Descripción del producto 1', image: '', price: 10 },
        { id: '002', name: 'Producto 2', stock: 50, description: 'Descripción del producto 2', image: '', price: 20 },
        { id: '003', name: 'Producto 3', stock: 200, description: 'Descripción del producto 3', image: '', price: 15 },
        { id: '004', name: 'cloro liquido', stock: 200, description: 'Descripción del producto 3', image: '', price: 760 },
        { id: '005', name: 'cloro DL', stock: 200, description: 'Descripción del producto 3', image: '', price: 7500 },
        { id: '006', name: 'cloro DR', stock: 200, description: 'Descripción del producto 3', image: '', price: 7500 },
        { id: '007', name: 'cloro MF', stock: 200, description: 'Descripción del producto 3', image: '', price: 7900 },
    ]);

    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(''); // 'cash' o 'electronic'




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

    // Eliminar un producto del carrito
    const removeFromCart = (id) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    // Manejar cambio en el método de pago
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const data = { 'cart': cart, 'total-w-discount': calculateTotalWithDiscount(), 'PaymentMethod': paymentMethod, 'total': calculateSubTotal(), 'discount': discount, 'user': '', 'date': '' }
    console.log(data);


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
                    <h4>Total Parcial: ${calculateSubTotal().toFixed(2)}</h4>
                    <div className={x.discount}>
                        <label>Descuento (%): </label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <h4>Total con Descuento: ${calculateTotalWithDiscount().toFixed(2)}</h4>
                </div>
            </div>
        </div>
    );
};

export default LocalSale;
