// Sets the function to fetch the information from the middleware
async function fetchData (url='', data={}) {
    const res = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const dataRetrieved = await res.json();
        return dataRetrieved;
    } catch(err) {
        console.log(err);
        window.alert(`An error has occured.`);
    }
};

export { fetchData }