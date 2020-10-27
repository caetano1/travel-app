const fetch = require('node-fetch');

const getExternalData = async (url='', use='') => {
    const res = await fetch(url);

    try {
        console.log('Milestone: getExternalData success', use);
        const resBody = await res.json();
        /* console.log(resBody); */ // For debugging reasons
        return resBody;
    } catch (e) {
        console.log('Milestone: getExternalData error', use);
        return {'Error': e};
    };

};

module.exports = { getExternalData };