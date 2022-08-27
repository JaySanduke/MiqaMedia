import Cookie from 'js-cookie';

const getCookie = (Cookiename) => {
  return Cookie.get(Cookiename);
}

export default getCookie;
