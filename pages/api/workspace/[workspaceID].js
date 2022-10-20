import { LocalStorage } from "node-localstorage";

export default async function handler(req, res) {

    global.localStorage = new LocalStorage('./authstorage');

    if (req.method === 'GET') {
        // const auth = localStorage.getItem('naegschebkzubrgvipeTRJ2Pe5pNGdG5F57iZkxp0okIVC3');
        // res.status(200).json(auth);
    } else if (req.method === 'POST') {
        try {
            const wid = await req.query.workspaceID;
            const body = await req.body;
            const uid = await JSON.parse(body.auth).currentUser.uid;
            const host = await req.headers.host;
            const wsubdomain = await host.split('.')[0];
            // res.status(200).send(body);
            // res.sendFile('components/auth/auth.html', {auth: body});
            //create local storage
            //set data
            localStorage.setItem(wsubdomain + uid, JSON.stringify(body.auth));
            res.redirect(307, '/user/config/' + uid);
            // res.redirect(307, '/user/tables?wid=' + wid);
            // res.status(200).json(wsubdomain);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}

