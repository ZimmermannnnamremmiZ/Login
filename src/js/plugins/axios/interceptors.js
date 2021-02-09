const lsTokenKey = 'my_app_token';

function setToken(req) {
    console.log(req);

    return req;
}

function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes('login');

    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }
    return res;
}

function getClearResponse(res) {
    return res.data;
}

export default function (axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse);
}