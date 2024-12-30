import x from './Butget.module.css';
import { useState } from 'react';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import exportCartToPDF from '../../utils/makePdf';

const Butget = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '', tax: '' });

    // Agregar un nuevo ítem al presupuesto
    const addItem = () => {
        setItems([...items, { ...newItem, id: Date.now() }]);
        setNewItem({ name: '', price: 0, quantity: 1, tax: 0 });
    };

    // Eliminar un ítem del presupuesto
    const removeItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    // Calcular el precio final de un ítem
    const calculateItemTotal = (price, quantity, tax) => {
        const subtotal = price * quantity;
        return subtotal + (subtotal * tax) / 100;
    };

    // Calcular el precio total del presupuesto
    const calculateTotal = () => {
        return items.reduce(
            (acc, item) => acc + calculateItemTotal(item.price, item.quantity, item.tax),
            0
        );
    };



    const handleExportPDF = () => {
        exportCartToPDF(items);
    };

    return (
        <div className={x.home}>

            <div className={x.card}>
                <h2 className={x.title}>Presupuesto</h2>

                <div className={x.form}>
                    {['name', 'quantity', 'price'].map((field, index) => (
                        <div key={index} className={x.inputGroup}>
                            <input
                                type={field === 'name' ? 'text' : 'number'}
                                placeholder=" "
                                value={newItem[field]}
                                onChange={(e) => setNewItem({ ...newItem, [field]: field === 'name' ? e.target.value : parseFloat(e.target.value) })}
                            />
                            <label>{field === 'name' ? 'Producto' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        </div>
                    ))}

                    {newItem.name ? (<button className={x.addButton} onClick={addItem}>
                        Agregar Producto
                        {items.length > 0 ? `: ${items.length}` : ''}
                    </button>) : ''}
                </div>

                <hr />
                <h3>Productos</h3>
                <div className={x.tableContainer}>
                    <table className={x.table}>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>IVA</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td data-label="Producto">{item.name}</td>
                                    <td data-label="Cantidad">{item.quantity}</td>
                                    <td data-label="Precio">${item.price.toFixed(2)}</td>
                                    <td data-label="IVA">{item.tax}%</td>
                                    <td data-label="Total">${calculateItemTotal(item.price, item.quantity, item.tax).toFixed(2)}</td>
                                    <td data-label="Acciones">
                                        <button className={x.deleteButton} onClick={() => removeItem(item.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className={x.total}>
                    <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                    <button className={x.exportButton} onClick={handleExportPDF}>Exportar a PDF</button>
                </div>
            </div>
        </div>
    );
};

export default Butget;
