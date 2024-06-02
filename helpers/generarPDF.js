import PDFDocument from 'pdfkit';

export default function generarPDF(cotizacion, stream) {
    const doc = new PDFDocument({ margin: 30 });

    doc.on('data', (chunk) => stream.write(chunk));
    doc.on('end', () => stream.end());

    // Encabezado con logo y detalles de la empresa
    if (cotizacion.logo) {
        doc.image(cotizacion.logo, { width: 200 });
    }

    doc.fontSize(12)
        .text(cotizacion.companyName, { align: 'right' })
        .text('Dirección de la empresa', { align: 'right' })
        .text('Teléfono: (123) 456-7890', { align: 'right' })
        .text('Email: empresa@correo.com', { align: 'right' })
        .moveDown();

    // Detalles del Repuesto
    doc.fontSize(16).text('Detalles del Repuesto', { underline: true })
        .fontSize(12)
        .text(`Marca: ${cotizacion.brand}`)
        .text(`Modelo: ${cotizacion.model}`)
        .text(`Problemas Seleccionados: ${cotizacion.selectedProblems.join(', ')}`)
        .text(`Otro Problema: ${cotizacion.otherProblem}`)
        .text(`Descripción del Problema: ${cotizacion.descriptionProblem}`)
        .moveDown();

    // Datos del Cliente
    doc.fontSize(16).text('Datos del Cliente', { underline: true })
        .fontSize(12)
        .text(`Nombre: ${cotizacion.name}`)
        .text(`Correo Electrónico: ${cotizacion.email}`)
        .text(`Teléfono: ${cotizacion.phone}`)
        .moveDown();

    // Servicios y Precios
    doc.fontSize(16).text('Servicios y Precios', { underline: true })
        .moveDown();

    const tableTop = doc.y;
    const itemDescX = 150;
    const itemQtyX = 300;
    const itemPriceX = 400;

    doc.fontSize(10).text('Descripción', itemDescX, tableTop, { bold: true })
        .text('Cantidad', itemQtyX, tableTop, { bold: true })
        .text('Precio', itemPriceX, tableTop, { bold: true });

    let position = tableTop + 20;
    // if (cotizacion.services && Array.isArray(cotizacion.services)) {
        cotizacion.services.forEach(service => {
            doc.fontSize(10).text(service.description, itemDescX, position)
                .text(service.quantity, itemQtyX, position)
                .text(service.price, itemPriceX, position);
            position += 20;
        });
    // }

    const total = cotizacion.services.reduce((sum, service) => sum + (service.price * service.quantity), 0);
    // const total = Array.isArray(cotizacion.services) ? cotizacion.services.reduce((sum, service) => sum + (service.price * service.quantity), 0) : 0;

    doc.fontSize(12).text(`Total: $${total}`, { align: 'right' })
        .moveDown();

    // Finalizar y cerrar el PDF
    doc.end();
}