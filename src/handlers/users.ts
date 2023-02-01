import Express, { Request, Response } from 'express';
import { User, Userstore } from '../models/user';

const store = new Userstore();

const index = async (_rew: Request, res: Response): Promise<void> => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(450);
        res.send('Fehler index!');
    }
};

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await store.show(parseInt(req.query.id as string));
        res.json(user);
    } catch (err) {
        res.status(400);
        res.send('Fehler show!');
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: parseInt(req.body.id),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };

    try {
        const createUser = await store.create(user);
        res.json(createUser);
    } catch (err) {
        res.status(400);
        res.send('Fehler create!');
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: parseInt(req.body.id),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    };

    try {
        const updateUser = await store.update(user);
        res.json(updateUser);
    } catch (err) {
        res.status(400);
        res.send('Fehler update!');
    }
};

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteUser = await store.delete(parseInt(req.query.id as string));
        res.json(deleteUser);
    } catch (err) {
        res.status(400);
        res.send('Fehler remove!');
    }
};

const userRoutes = (app: Express.Application): void => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.put('/users/:id', update);
    app.delete('/users/:id', remove);
};

export default userRoutes;
