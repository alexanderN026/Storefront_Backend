// -Der Client wird genutzt damit Einträge in der Datenbank ausgelesen, erzeugt und manipuliert werden können
import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    // -Das Keyword function wird seit ES6 nicht mehr gebraucht, um eine Funktion zu deklarieren
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await client.connect();
            const result = await conn.query(sql);
            const product = result.rows;
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(
                `Could not add new product ${p.name}. Error: ${err}`
            );
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            const sql =
                'UPDATE products SET name=($1), price=($2) WHERE id=($3) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [p.name, p.price, p.id]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(
                `Could not update product ${p.name}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
