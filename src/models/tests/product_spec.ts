import client from '../../database';
import { ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
    beforeAll(async () => {
        const sql =
            'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
        const connection = await client.connect();
        await connection.query(sql);
        connection.release();
    });
    describe('Test if Product Model methods exist', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });

        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });

        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });

        it('should have an update method', () => {
            expect(store.update).toBeDefined();
        });

        it('should have a delete method', () => {
            expect(store.delete).toBeDefined();
        });
    });

    describe('Test if Product Model methods work', () => {
        it('create method should add the first product', async () => {
            const result = await store.create({
                id: 1,
                name: 'Smartphone',
                price: 400
            });
            expect(result).toEqual({
                id: 1,
                name: 'Smartphone',
                price: 400
            });
        });

        it('create method should add the second product', async () => {
            const result = await store.create({
                id: 2,
                name: 'Smartwatch',
                price: 300
            });
            expect(result).toEqual({
                id: 2,
                name: 'Smartwatch',
                price: 300
            });
        });

        it('index method should return a list of products', async () => {
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    name: 'Smartphone',
                    price: 400
                },
                {
                    id: 2,
                    name: 'Smartwatch',
                    price: 300
                }
            ]);
        });

        it('show method should return the first product', async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                name: 'Smartphone',
                price: 400
            });
        });

        it('update method should return the first updated product', async () => {
            const result = await store.update({
                id: 1,
                name: 'Smartphone',
                price: 500
            });
            expect(result.price).toEqual(500);
        });

        it('delete method should remove the first product', async () => {
            await store.delete(1);
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 2,
                    name: 'Smartwatch',
                    price: 300
                }
            ]);
        });

        it('delete method should remove the second product', async () => {
            await store.delete(2);
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });
});
