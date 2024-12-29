import { useState } from 'react';
import x from './LocalSale.module.css';
import { apiProd } from '../../api/product';
import { getProd } from '../../redux/productSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

    // Calcular el precio final de un ítem
    const calculateItemTotal = (price, quantity, tax) => {
        const subtotal = price * quantity;
        return subtotal + (subtotal * tax) / 100;
    };
    function generateCode() {
        const letter = "X";
        const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        return letter + numbers;
    }
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Información de la empresa
        const companyName = "Distribuidora Marelys";
        const cuit = "CUIT: 20-94101864-6";
        const businessName = "Razón Social: Distribuidora Marelys";
        const address = "Dirección: Calle 44 5215, Buenos Aires, Argentina";
        const phone = "Teléfono: 221 504-7727";

        // Obtener fecha y hora actuales
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString(); // Fecha en formato local
        const formattedTime = currentDate.toLocaleTimeString(); // Hora en formato local

        // Encabezado
        doc.setFontSize(18);
        doc.text(companyName, 14, 15); // Nombre de la empresa a la izquierda
        doc.setFontSize(12);
        doc.text(cuit, 14, 25);
        doc.text(businessName, 14, 30);
        doc.text(address, 14, 35);
        doc.text(phone, 14, 40);

        // Fecha y hora alineadas a la derecha
        doc.setFontSize(10);
        const pageWidth = doc.internal.pageSize.width; // Ancho de la página
        doc.text(`Fecha: ${formattedDate}`, pageWidth - 50, 15, { align: "right" });
        // doc.text(`Hora: ${formattedTime}`, pageWidth - 50, 20, { align: "right" });

        // Título del presupuesto
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Volver al color negro
        doc.text('Presupuesto', 14, 75);

        // Tabla de productos
        doc.autoTable({
            startY: 80, // Posición de inicio de la tabla
            head: [['Producto', 'Cantidad', 'Precio Unitario', 'IVA (%)', 'Total']],
            body: cart.map((item) => [
                item.name,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                `${item.tax}%`,
                `$${calculateItemTotal(item.price, item.quantity, item.tax).toFixed(2)}`,
            ]),
        });

        // Calcular suma del IVA
        const totalIVA = cart.reduce((acc, item) => {
            const subtotal = item.price * item.quantity;
            return acc + (subtotal * item.tax) / 100;
        }, 0);

        // Total general
        const formattedTotal = calculateTotalWithDiscount()
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formato con separadores de miles
        const formattedIVA = totalIVA
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formato con separadores de miles

        // Posición del pie
        const pageHeight = doc.internal.pageSize.height; // Altura de la página
        doc.setFontSize(14);
        doc.text(`IVA Total: $${formattedIVA}`, pageWidth - 14, pageHeight - 30, { align: "right" });
        doc.text(`Monto Total: $${formattedTotal}`, pageWidth - 14, pageHeight - 20, { align: "right" });

        // Pie de página
        doc.setFontSize(10);
        doc.setTextColor(100); // Gris para el texto adicional
        doc.text('Esta nota de entrega no reemplaza una factura oficial. NOTA DE ENTREGA - SIN VALIDEZ FISCAL.', 105, pageHeight - 10, { align: "center" });

        // Guardar el PDF
        doc.save(`Presupuesto-${generateCode()}`);
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

                <button className={x.completeButton} onClick={() => exportToPDF()}>Done</button>



            </div>
        </div>
    );
};

export default LocalSale;
