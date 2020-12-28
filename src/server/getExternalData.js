const fetch = require('node-fetch');

async function getData (url='', use='') {
    const res = await fetch(url);

    try {
        const resBody = await res.json();
        console.log('Milestone: getData success', use);
        return resBody;
    } catch (err) {
        console.log('Milestone: getExternalData error', use);
        return { 'Error': err , 'Context': use };
    };

};

module.exports = { getData };