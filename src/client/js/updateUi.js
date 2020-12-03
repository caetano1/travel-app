// Updates the UI

async function updateUI (data = {}) {
    const req = await fetch('/data');

    try{
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.feelings}`;
    } catch(err) {
        console.log('error', err);
    }
}

export { updateUI }