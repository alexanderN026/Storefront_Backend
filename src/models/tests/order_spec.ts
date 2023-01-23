import client from '../../database';
import { ProductStore } from '../product';
import { Userstore } from '../user';
import { OrderStore } from '../order';

const productStore = new ProductStore();
const userStore = new Userstore();
const store = new OrderStore();

// !product_id & user_id müssen mindestens einen Eintrag besitzen, damit das order Model einen Eintrag erzeugen
// !kann, da diese beiden ein Foreign Key sind
describe('Order Model', () => {
    beforeAll(async () => {
        const sqlProducts =
            'DELETE FROM products;ALTER SEQUENCE products_id_seq RESTART WITH 1';
        const connProducts = await client.connect();
        await connProducts.query(sqlProducts);
        connProducts.release();

        const sqlUsers =
            'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
        const connUsers = await client.connect();
        await connUsers.query(sqlUsers);
        connUsers.release();

        const sql =
            'DELETE FROM orders;ALTER SEQUENCE orders_id_seq RESTART WITH 1';
        const connection = await client.connect();
        await connection.query(sql);
        connection.release();

        await productStore.create({
            id: 1,
            name: 'Smartphone',
            price: 400
        });

        await productStore.create({
            id: 2,
            name: 'Smartwatch',
            price: 300
        });

        await userStore.create({
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            password: 'example_1'
        });

        await userStore.create({
            id: 2,
            first_name: 'Jane',
            last_name: 'Doe',
            password: 'example_2'
        });
    });
    describe('Test if Order Model methods exist', () => {
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

    describe('Test if Order Model methods work', () => {
        it('create method should add the first order', async () => {
            const result = await store.create({
                id: 1,
                user_id: 1,
                status: 'active'
            });
            expect(result).toEqual({
                id: 1,
                user_id: 1,
                status: 'active'
            });
        });

        it('create method should add the second order', async () => {
            const result = await store.create({
                id: 2,
                user_id: 2,
                status: 'active'
            });
            expect(result).toEqual({
                id: 2,
                user_id: 2,
                status: 'active'
            });
        });

        it('index method should return a list of orders', async () => {
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    user_id: 1,
                    status: 'active'
                },
                {
                    id: 2,
                    user_id: 2,
                    status: 'active'
                }
            ]);
        });

        it('show method should return the first order', async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                user_id: 1,
                status: 'active'
            });
        });

        it('update method should return the first updated order', async () => {
            const result = await store.update({
                id: 1,
                user_id: 1,
                status: 'a'
            });
            expect(result.status).toEqual('a');
        });

        it('delete method should remove first order', async () => {
            await store.delete(1);
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 2,
                    user_id: 2,
                    status: 'active'
                }
            ]);
        });

        it('delete method should remove second order', async () => {
            await store.delete(2);
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });
});
