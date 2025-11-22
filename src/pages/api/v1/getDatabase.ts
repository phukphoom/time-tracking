import { openDatabase } from '../utils/openDatabase';
import { authentication } from '../middlewares';

const getDatabaseApi = async (req, res, session) => {
    if (req.method === 'GET') {
        if (session.role == 'admin') {
            try {
                const database = await openDatabase();
                const Accounts = await database.all('select * from Accounts');
                const Clocking = await database.all('select * from Clocking');

                res.status(200).send({
                    Accounts,
                    Clocking,
                });
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        } else {
            res.status(403).send({ message: 'No Permission!' });
        }
    } else {
        res.status(400).end();
    }
};
export default authentication(getDatabaseApi);
