import Cookie from 'js-cookie';

const setCookie = (Cookiename, value) => {
  Cookie.set(Cookiename, value);
}

export default setCookie;
