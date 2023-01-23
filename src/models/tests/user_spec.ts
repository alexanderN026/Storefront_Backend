import client from '../../database';
import { Userstore } from '../user';

const store = new Userstore();

describe('User Model', () => {
    beforeAll(async () => {
        const sql =
            'DELETE FROM users;ALTER SEQUENCE users_id_seq RESTART WITH 1';
        const connection = await client.connect();
        await connection.query(sql);
        connection.release();
    });
    describe('Test if User Model methods exist', () => {
        it('should hava an index method', () => {
            expect(store.index).toBeDefined();
        });

        it('should hava a show method', () => {
            expect(store.show).toBeDefined();
        });

        it('should hava a create method', () => {
            expect(store.create).toBeDefined();
        });

        it('should hava an update method', () => {
            expect(store.update).toBeDefined();
        });

        it('should hava a delete method', () => {
            expect(store.delete).toBeDefined();
        });
    });

    describe('Test if user Model methods work', () => {
        it('create method should add the first user', async () => {
            const result = await store.create({
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                password: 'example_1'
            });
            expect(result).toEqual({
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                password: 'example_1'
            });
        });

        it('create method should add the second user', async () => {
            const result = await store.create({
                id: 2,
                first_name: 'Jane',
                last_name: 'Doe',
                password: 'example_2'
            });
            expect(result).toEqual({
                id: 2,
                first_name: 'Jane',
                last_name: 'Doe',
                password: 'example_2'
            });
        });

        it('index method should return a list of users', async () => {
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    password: 'example_1'
                },
                {
                    id: 2,
                    first_name: 'Jane',
                    last_name: 'Doe',
                    password: 'example_2'
                }
            ]);
        });

        it('show method should return the first user', async () => {
            const result = await store.show(1);
            expect(result).toEqual({
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                password: 'example_1'
            });
        });

        it('update method should return the first updated user', async () => {
            const result = await store.update({
                id: 1,
                first_name: 'John',
                last_name: 'Doe',
                password: 'example_1_updated'
            });
            expect(result.password).toEqual('example_1_updated');
        });

        it('delete method should remove the first user', async () => {
            await store.delete(1);
            const result = await store.index();
            expect(result).toEqual([
                {
                    id: 2,
                    first_name: 'Jane',
                    last_name: 'Doe',
                    password: 'example_2'
                }
            ]);
        });
        it('delete method should remove the second user', async () => {
            await store.delete(2);
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });
});
