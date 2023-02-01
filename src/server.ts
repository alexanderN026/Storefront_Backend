import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/order';

// Node.js kriegt hier Zugriff auf die .env Datei
dotenv.config();
// Das globale Javascript Objekt process hat Informationen über die aktuellen Prozesse und die Umgebung, inder die
// Prozesse ablaufen
const { ENV } = process.env;

const app: express.Application = express();
const port: number = 3000;
// Wenn ein Request verschickt werden soll, dann kann diese mit req.body.
app.use(express.json());
// express.urlencoded ermöglicht den Body als Request mitzuschicken an den Server
// extend: false bedeutet dass hier in der URL nur ein gewöhnlicher String, also keine Arrays oder Objekte
// mitgeschickt werden, dies ist also in dem Fall ein Querystring
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!');
    // res.json({
    //  name: 'John',
    // age: 35
    // });
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

if (ENV === 'test') {
    app.listen(port, (): void => {
        console.log(`server started at http://localhost:${port}`);
    });
}
