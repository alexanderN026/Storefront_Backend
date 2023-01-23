import dotenv from 'dotenv';
// Dieses Node Package bietet die Möglichkeit an, Nodejs mit PostgreSQL Datenbanken interagieren zu lassen
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV
} = process.env;

// Mit dem Pool Befehl kann man immer eine von mehreren möglichen Verbindungen zur jeweiligen Datenbank nutzen
// Ohne Pool müsste man für jede Query eine neue Verbindung zur Datenbank aufbauen
let client: Pool = new Pool();
console.log(`ENV = ${ENV}`);

if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default client;
