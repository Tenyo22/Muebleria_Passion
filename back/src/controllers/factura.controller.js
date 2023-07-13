import { pool } from "../database/db.js";
import XlsxPopulate from 'xlsx-populate';

export const getProductosCliente = async (req, res) => {
    try {
        const [[result]] = await pool.query(`CALL generarFactura('${req.params.folioVenta}')`);
        // res.json(result);

        // Obtén los datos necesarios para la factura desde 'result'
        const datosFactura = result.map(item => ({
            Producto: item.Producto,
            Cantidad: item.Cantidad,
            Precio: item.Precio,
            Importe: item.Importe,
        }));

        // Carga la plantilla de Excel
        const workbook = await XlsxPopulate.fromFileAsync('C:\\Users\\emate\\OneDrive\\Documentos\\Plantilla.xlsx');

        // Obtén la hoja de cálculo
        const worksheet = workbook.sheet('Hoja1');

        const tableStyle = {
            fill: {
                type: 'pattern',
                patternType: 'solid',
                fgColor: 'FFFFCC',
            },
            border: {
                left: { style: 'thin', color: '000000' },
                right: { style: 'thin', color: '000000' },
                top: { style: 'thin', color: '000000' },
                bottom: { style: 'thin', color: '000000' },
            },
            // alignment: {
            //     horizontal: 'center',
            // },
        };

        // Coloca los datos en las celdas correspondientes de la plantilla
        datosFactura.forEach((dato, index) => {
            const rowIndex = 15 + index; // La fila inicial es la 15 y aumenta según el índice
            const cantidadCell = worksheet.cell(`A${rowIndex}`);
            const productoCell = worksheet.cell(`B${rowIndex}`);
            const precioCell = worksheet.cell(`D${rowIndex}`);
            const importeCell = worksheet.cell(`E${rowIndex}`);

            cantidadCell.value(dato.Cantidad);
            productoCell.value(dato.Producto);
            precioCell.value(dato.Precio);
            importeCell.value(dato.Importe);

            // Establecer alineación a la derecha para la celda de cantidad
            cantidadCell.style('horizontalAlignment', 'center');

            // Combinar las celdas B y C
            worksheet.range(`B${rowIndex}:C${rowIndex}`).merged(true);
        });

        // Aplicar estilos de tabla a las celdas
        const tableRange = worksheet.range(`A15:E${15 + datosFactura.length - 1}`);
        tableRange.style(tableStyle);

        // Calcular el total de los importes
        const totalImporte = datosFactura.reduce((total, dato) => total + dato.Importe, 0);

        // Colocar el total en una celda específica
        const totalCell = worksheet.cell(`D${15 + datosFactura.length + 2}`);
        totalCell.value('Total:');
        totalCell.style({ horizontalAlignment: 'right', bold: true });
        const totalImporteCell = worksheet.cell(`E${15 + datosFactura.length + 2}`);
        totalImporteCell.value(totalImporte);

        // Agregar "Gracias por su preferencia"
        const graciasCell = worksheet.cell(`B${15 + datosFactura.length + 4}`);
        graciasCell.value('Gracias por su preferencia');
        const mergedRange = worksheet.range(`B${15 + datosFactura.length + 4}:D${15 + datosFactura.length + 4}`);
        mergedRange.merged(true);

        // Aplicar formato al texto "Gracias por su preferencia"
        graciasCell.style({
            horizontalAlignment: 'center',
            verticalAlignment: 'center',
            bold: false,
            fontSize: 14,  // Tamaño de la fuente en puntos
            fontFamily: 'Algerian'  // Nombre de la fuente
        });

        // Guarda el archivo de Excel modificado
        await workbook.toFileAsync(`C:\\Users\\emate\\OneDrive\\Documentos\\Facturas\\${req.params.folioVenta}.xlsx`);

        res.json({ message: 'Factura generada exitosamente' });
    } catch (error) {
        // console.error(error);
        console.error('Error al generar la factura:', error);
        res.status(500).json({ message: 'Error al generar la factura' });
    }
};

export const getDatosCliente = async (req, res) => {
    try {
        const [[result]] = await pool.query(`CALL facturaCliente('${req.params.folioVenta}')`);

        // Carga la plantilla de Excel
        const workbook = await XlsxPopulate.fromFileAsync(`C:\\Users\\emate\\OneDrive\\Documentos\\Facturas\\${req.params.folioVenta}.xlsx`);

        // Obtén la hoja de cálculo
        const worksheet = workbook.sheet('Hoja1');

        // Coloca los datos del cliente en las celdas correspondientes
        const pedidoCell = worksheet.cell('B4');
        const fechaCell = worksheet.cell('B5');
        const clienteCell = worksheet.cell('C9');
        const localidadCell = worksheet.cell('C10');
        const domicilioCell = worksheet.cell('C11');

        clienteCell.value(result[0].Cliente);
        pedidoCell.value(result[0].NumeroPedido);
        fechaCell.value(new Date(result[0].Fecha).toLocaleDateString());
        localidadCell.value(result[0].Localidad);
        domicilioCell.value(result[0].Domicilio);

        // Guarda el archivo de Excel modificado
        await workbook.toFileAsync(`C:\\Users\\emate\\OneDrive\\Documentos\\Facturas\\${req.params.folioVenta}.xlsx`);

        res.json({ message: 'Factura generada exitosamente' });
    } catch (error) {
        console.error('Error al generar la factura:', error);
        res.status(500).json({ message: 'Error al generar la factura' });
    }

};