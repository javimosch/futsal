import console from '../../utils/tracer';
import { db } from '../../mongoose';
import { asyncHandler } from '../../utils/ExpressRoute';
export default function(app) {

    app.get('/api/users', asyncHandler(async (req, res) => {
        res.json(await db.app.users.find().exec());
    }));

    app.get('/api/users/:id', asyncHandler(async function getUser(req, res){
        res.json(await db.app.users.get(req.params.id));
    }));

}
