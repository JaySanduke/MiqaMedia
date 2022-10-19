import axios from 'axios';
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react';

function uid() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const { uid } = router.query;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const host = window.location.hostname;
        const wid = host.split('.')[0];
        axios.post('/api/getauth/' + wid + uid).then((res) => {
            console.log(res);
            localStorage.setItem('auth', res.data);
        })
            .then(() => {
                console.log('done');
                router.replace('/user/tables/');
            })
            .catch((err) => { console.log(err) });
    }, [uid]);

    return (
        <div>{uid}</div>
    )
}

export default uid;