import Express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(450);
        res.send('Fehler index!');
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await store.show(parseInt(req.query.id as string));
        res.json(order);
    } catch (err) {
        res.status(400);
        res.send('Fehler show!');
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    const order: Order = {
        id: parseInt(req.body.id),
        user_id: req.body.user_id,
        status: req.body.status
    };

    try {
        const createOrder = await store.create(order);
        res.json(createOrder);
    } catch (err) {
        res.status(400);
        res.send('Fehler create!');
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    const order: Order = {
        id: parseInt(req.body.id),
        user_id: req.body.user_id,
        status: req.body.status
    };

    try {
        const updateOrder = await store.update(order);
        res.json(updateOrder);
    } catch (err) {
        res.status(400);
        res.send('Fehler update!');
    }
};

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteOrder = await store.delete(parseInt(req.body.id as string));
        res.json(deleteOrder);
    } catch (err) {
        res.status(400);
        res.send('Fehler delete!');
    }
};

const orderRoutes = (app: Express.Application): void => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.put('/orders/:id', update);
    app.delete('/orders/:id', remove);
};

export default orderRoutes;
