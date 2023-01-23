import client from '../database';

export type Order = {
    id?: number;
    user_id: number;
    status: string;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
        }
    }

    async update(o: Order): Promise<Order> {
        try {
            const sql =
                'UPDATE orders SET user_id=($1), status=($2) WHERE id=($3) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [o.user_id, o.status, o.id]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not update order ${o.id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
