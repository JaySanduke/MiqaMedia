import React from 'react';
import { LocalStorage } from 'node-localstorage';

export default async function handler(req, res) {

    global.localStorage = LocalStorage('./authstorage');

    if (req.method === 'POST') {
        try {
            const fileid = await req.query.auth;
            const auth = localStorage.getItem(fileid);
            await res.status(200).json(auth);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

}
