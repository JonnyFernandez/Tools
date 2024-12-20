import x from './Butget.module.css';
import { useState } from 'react';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

    function generateCode() {
        const letter = "R";
        const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        return letter + numbers;
    }

    // Exportar el presupuesto a PDF
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
            body: items.map((item) => [
                item.name,
                item.quantity,
                `$${item.price.toFixed(2)}`,
                `${item.tax}%`,
                `$${calculateItemTotal(item.price, item.quantity, item.tax).toFixed(2)}`,
            ]),
        });

        // Calcular suma del IVA
        const totalIVA = items.reduce((acc, item) => {
            const subtotal = item.price * item.quantity;
            return acc + (subtotal * item.tax) / 100;
        }, 0);

        // Total general
        const formattedTotal = calculateTotal()
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
                <h2 className={x.title}>Presupuesto</h2>

                <div className={x.form}>
                    {['name', 'quantity', 'price', 'tax'].map((field, index) => (
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
                    <button className={x.exportButton} onClick={exportToPDF}>Exportar a PDF</button>
                </div>
            </div>
        </div>
    );
};

export default Butget;
