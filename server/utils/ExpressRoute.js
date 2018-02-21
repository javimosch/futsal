import console from '../utils/tracer';
export function asyncHandler(handler) {
    return function(req, res) {
        handler.apply(handler, [req, res]).catch(err => {
            console.error(err.stack);
            let status = 500;
            try {
                let json = JSON.parse(err.message);
                if (['500', '404', '403'].includes(json.status.toString())) {
                    status = json.status;
                }
            }
            catch (err) {}
            res.status(status).send(err.message);
        });
    };
}
