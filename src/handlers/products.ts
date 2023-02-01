import Express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index();
        // res.send('Hallo index!');
        res.json(products);
    } catch (err) {
        res.status(450);
        res.send('Fehler index!');
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    // res.send('Hello Planet 2!');
    try {
        const product = await store.show(parseInt(req.query.id as string));
        res.json(product);
    } catch (err) {
        res.status(400);
        res.send('Fehler show!');
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    // res.send('Hello Planet 3!');
    const product: Product = {
        id: parseInt(req.body.id),
        name: req.body.name,
        price: parseInt(req.body.price)
    };

    try {
        const createProduct = await store.create(product);
        res.json(createProduct);
    } catch (err) {
        res.status(400);
        res.send('Fehler create!');
    }
};

const update = async(req: Request, res: Response): Promise<void> => {
    // res.send('Hello Planet 4!');
    const product: Product = {
        id: parseInt(req.body.id),
        name: req.body.name,
        price: parseInt(req.body.price)
    };
    try {
        const updateProduct = await store.update(product);
        res.json(updateProduct);
    } catch (err) {
        res.status(400);
        res.send('Fehler update!');
    }
};

const remove = async(req: Request, res: Response): Promise<void> => {
    // res.send('Hello Planet 5!');
    try {
        const deleteProduct = await store.delete(parseInt(req.query.id as string));
        res.json(deleteProduct);
    } catch (err) {
        res.status(400);
        res.send('Fehler delete!');
    }
};

const productRoutes = (app: Express.Application): void => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.put('/products/:id', update);
    app.delete('/products/:id', remove);
};

export default productRoutes;
