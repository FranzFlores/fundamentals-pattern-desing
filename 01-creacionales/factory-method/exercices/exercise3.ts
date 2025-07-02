/**
 * Ejercicio 3: Filtro dinámico de entidades
    Objetivo: Crear un sistema que filtre datos de diferentes entidades (User, Product, Order) con filtros comunes (is_active, limit) y específicos.

    Requisitos:
    Una interfaz FilterBuilder<T> con un método buildFilters(params: Record<string, any>): Partial<T>.
    Tres builders concretos: UserFilterBuilder, ProductFilterBuilder, OrderFilterBuilder.
    Un FilterBuilderFactory que devuelva el builder correspondiente según la entidad.
    Simula llamadas con diferentes parámetros y entidades.
 * 
 */

interface FilterBuilder<T> {
    buildFilters(params: Record<string, any>): Partial<T>;
}



class UserFilterBuilder implements FilterBuilder<any> {
    buildFilters(params: Record<string, any>) {
        const filters: any = {
            is_active: params.is_active ?? true,
            searcher: params.searcher || '',
            limit: params.limit ?? 10
        };

        console.log('Filtros de Usuario', filters);
        return filters;
    }
}

class ProductFilterBuilder implements FilterBuilder<any> {
    buildFilters(params: Record<string, any>) {
        const filters: any = {
            is_active: params.is_active ?? true,
            searcher: params.searcher || '',
        };

        if (params.userId) {
            filters.userId = params.userId;
        }

        console.log('Filtros de Producto', filters);
        return filters;
    }
}

class OrderFilterBuilder implements FilterBuilder<any> {
    buildFilters(params: Record<string, any>) {
        const filters: any = {
            is_active: params.is_active ?? true,
            searcher: params.searcher || '',
        };

        console.log('Filtros de Orden', filters);
        return filters;
    }
}

type EntityType = 'user' | 'product' | 'order';
class FilterBuilderFactory {
    private filterEntityMap = {
        user: () => new UserFilterBuilder(),
        product: () => new ProductFilterBuilder(),
        order: () => new OrderFilterBuilder(),
    };

    getBuilder(entity: EntityType): FilterBuilder<any> {
        const creator = this.filterEntityMap[entity];
        if (!creator) throw new Error('No existen filtros para la entidad especificada');
        return creator();
    }
}

const main = () => {
    const factory = new FilterBuilderFactory();

    const userFilters = factory.getBuilder('user');
    userFilters.buildFilters({ limit: 10, is_active: false, searcher: 'Ella' });

    const productFilters = factory.getBuilder('product');
    productFilters.buildFilters({ is_active: false, searcher: 'Ella', userId: 10 });

    const orderFilters = factory.getBuilder('order');
    orderFilters.buildFilters({ is_active: false, searcher: 'Ella' });
}

main();