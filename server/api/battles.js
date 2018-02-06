import { authCheck, authScopes, fetchUser } from '../auth';

export default function(app) {
    app.get('/api/battles/public', (req, res) => {
        let publicBattles = [
            // Array of public battles
        ];

        res.json(publicBattles);
    })

    

    app.get('/api/battles/private', authCheck, authScopes(['read:battles']),fetchUser, (req, res) => {
        let privateBattles = [
            // Array of private battles
        ];

        console.log(req.user, res.access_token)

        res.json(privateBattles);
    })
}
