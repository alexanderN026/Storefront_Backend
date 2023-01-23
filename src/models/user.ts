import client from '../database';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
};

export class Userstore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await client.connect();
            const result = await conn.query(sql);
            const user = result.rows;
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.password
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.first_name}. Error: ${err}`
            );
        }
    }

    async update(u: User): Promise<User> {
        try {
            const sql =
                'UPDATE users SET first_name=($1), last_name=($2), password=($3) WHERE id=($4) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                u.password,
                u.id
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(
                `Could not update user ${u.first_name}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
