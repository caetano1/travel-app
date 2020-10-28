const fetch = require('node-fetch');

const getData = async (url='', use='') => {
    const res = await fetch(url);

    try {
        const resBody = await res.json();
        console.log('Milestone: getData success', use);
        /* console.log(resBody); */ // For debugging reasons
        return resBody;
    } catch (err) {
        console.log('Milestone: getExternalData error', use);
        return {'Error: ': err};
    };

};

module.exports = { getData };