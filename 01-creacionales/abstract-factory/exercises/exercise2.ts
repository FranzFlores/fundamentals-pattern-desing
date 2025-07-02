/**
 *  Ejercicio 2: Reportes en PDF y Excel
    Enunciado:
    Crea una fábrica abstracta para generar reportes de dos tipos: Ventas y Inventario,
    en dos formatos: PDF y Excel.
    Define dos productos abstractos: SalesReport y InventoryReport, con un método generate(): void.
    Crea fábricas concretas para PDF y Excel.
    El cliente debe poder generar ambos tipos de reporte en el formato elegido.

    Extra: Usa colores o emojis en la consola para diferenciar el formato generado (📄 para PDF, 📊 para Excel).
 */

// Productos Abstractos
interface SalesReport {
    generate(): void;
}

interface InventoryReport {
    generate(): void;
}

// Productos Concretos
class SalesReportPDF implements SalesReport {
    generate(): void {
        console.log('Generando reporte de ventas en formato PDF');
    }
}

class SalesReportExcel implements SalesReport {
    generate(): void {
        console.log('Generando reporte de ventas en formato Excel');
    }
}

class InventoryReportPDF implements InventoryReport {
    generate(): void {
        console.log('Generando reporte de inventario en formato PDF');
    }
}

class InventoryReportExcel implements InventoryReport {
    generate(): void {
        console.log('Generando reporte de inventario en formato Excel');
    }
}

//  Fábricas abstractas
interface SalesReportAbstactFactory {
    createReportPDF(): SalesReport;
    createReportExcel(): SalesReport;
}

interface InventoryReportAbstractFactory {
    createReportPDF(): InventoryReport;
    createReportExcel(): InventoryReport;
}

// Fábricas concretas
class SalesReportFactory implements SalesReportAbstactFactory {
    createReportPDF(): SalesReport {
        return new SalesReportPDF();
    }

    createReportExcel(): SalesReport {
        return new SalesReportExcel();
    }
}

class InventoryReportFactory implements InventoryReportAbstractFactory {
    createReportPDF(): SalesReport {
        return new InventoryReportPDF();
    }

    createReportExcel(): SalesReport {
        return new InventoryReportExcel();
    }
}

// Cliente
type ReportType = 'sales' | 'inventory';
type FormatType = 'pdf' | 'excel';
type ReportTypeFactory = SalesReportFactory | InventoryReportFactory;

const main = (type: ReportType, format: FormatType, factory: ReportTypeFactory) => {
    if (type == 'sales') {
        const salesFactory = (factory as SalesReportFactory);
        if (format == 'pdf') {
            const salesReportPDF = salesFactory.createReportPDF();
            salesReportPDF.generate();
            return;
        }

        if (format == 'excel') {
            const salesReportExcel = salesFactory.createReportExcel();
            salesReportExcel.generate();
            return
        }
    }

    if (type == 'inventory') {
        const inventoryFactory = (factory as InventoryReportFactory);
        if (format == 'pdf') {
            const inventoryReportPDF = inventoryFactory.createReportPDF();
            inventoryReportPDF.generate();
            return;
        }

        if (format == 'excel') {
            const inventoryReportExcel = inventoryFactory.createReportExcel();
            inventoryReportExcel.generate();
            return
        }
    }
}

// Uso
main('sales', 'pdf', new SalesReportFactory());
main('sales', 'excel', new SalesReportFactory());

main('inventory', 'pdf', new InventoryReportFactory());
main('inventory', 'excel', new InventoryReportFactory());
