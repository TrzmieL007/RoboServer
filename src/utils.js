const getKeys = obj => {
    return  Object.keys(obj || {});
};
const getParamsFromUrl = (url) => {
    const paramsString = url.replace(/\/[^?]+\?(.*)/, "$1");
    const paramsArray = paramsString.split('&');
    return paramsArray.reduce((params, curr) => {
        const [key, ...values] = curr.split('=');
        const value = decodeURIComponent(values.join('='));
        if(params.hasOwnProperty(key)){
            if(Array.isArray(params[key])) params[key].push(value);
            else params[key] = [params[key], value];
        }else{
            params[key] = value;
        }
        return params;
    }, {});
}

const getContentType = ext => {
    switch(ext.substring(1)){
        case 'txt':
            return 'text/plain';
        case 'json':
            return 'application/json';
        case 'html':
        case 'htm':
        default:
            return 'text/html';
    }
}

module.exports = {
    getKeys,
    getParamsFromUrl,
    getContentType,
}