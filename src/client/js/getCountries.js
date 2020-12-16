// Fetches the json containing the list of countries
async function getCountries (url='') {
    const req = await fetch(url);

    try {
        const countries = await req.json();
        return countries;
    } catch (e) {
        console.log(e)
    }
}

// Turns the countries json into an array
function turnIntoArray (obj) {
    let array = [];
    for (const element of obj) {
        let a = [element.name, element["alpha-2"]]
        array.push(a);
    }
    return array;
};

export { getCountries, turnIntoArray }