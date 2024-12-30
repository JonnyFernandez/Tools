import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportCartToPDF = (cart) => {
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

    // Encabezado
    doc.setFontSize(18);
    doc.text(companyName, 14, 15); // Nombre de la empresa a la izquierda
    doc.setFontSize(12);
    doc.text(cuit, 14, 25);
    doc.text(businessName, 14, 30);
    doc.text(address, 14, 35);
    doc.text(phone, 14, 40);

    // Fecha alineada a la derecha
    const pageWidth = doc.internal.pageSize.width; // Ancho de la página
    doc.setFontSize(10);
    doc.text(`Fecha: ${formattedDate}`, pageWidth - 50, 15, { align: "right" });

    // Título
    doc.setFontSize(16);
    doc.text('Presupuesto', 14, 55);

    // Tabla de productos
    doc.autoTable({
        startY: 65,
        head: [['Producto', 'Cantidad', 'Precio Unitario', 'Precio Parcial']],
        body: cart.map((item) => [
            item.name,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.price * item.quantity).toFixed(2)}`,
        ]),
    });

    // Calcular total
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Total
    const formattedTotalPrice = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(14);
    doc.text(`Monto Total: $${formattedTotalPrice}`, pageWidth - 14, pageHeight - 20, { align: "right" });

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
        'Esta nota de entrega no reemplaza una factura oficial. NOTA DE ENTREGA - SIN VALIDEZ FISCAL.',
        105,
        pageHeight - 10,
        { align: "center" }
    );

    // Guardar el PDF
    doc.save(`Presupuesto-${Date.now()}.pdf`);
};

export default exportCartToPDF;
