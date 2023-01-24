import dotenv from 'dotenv';
// Dieses Node Package bietet die Möglichkeit an, Nodejs mit PostgreSQL Datenbanken interagieren zu lassen
import { Pool } from 'pg';

dotenv.config();

const {
    HOSTNAME,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    ENV
} = process.env;

// Mit dem Pool Befehl kann man immer eine von mehreren möglichen Verbindungen zur jeweiligen Datenbank nutzen
// Ohne Pool müsste man für jede Query eine neue Verbindung zur Datenbank aufbauen
let client: Pool = new Pool();
console.log(`ENV = ${ENV}`);

if (ENV === 'test') {
    client = new Pool({
        host: HOSTNAME,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    });
}
/*
if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
*/
export default client;
