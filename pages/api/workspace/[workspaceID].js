import { LocalStorage } from 'node-localstorage';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ 'Data': "get request" });

    } else if (req.method === 'POST') {
        try {
            const wid = await req.query.workspaceID;
            const body = await req.body;
            res.status(200).send(body);
            //create local storage
            // global.localStorage = new LocalStorage('../../Sscratch');
            //set data
            // localStorage.setItem('auth', 'hi');
            res.redirect(307,'/user/tables');

        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

