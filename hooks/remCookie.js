import Cookie from 'js-cookie';

const remCookie = (Cookiename) => {
    Cookie.remove(Cookiename);
}

export default remCookie;
