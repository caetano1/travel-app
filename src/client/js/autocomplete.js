// Autocompletes the country input
// used as reference: https://www.w3schools.com/howto/howto_js_autocomplete.asp

function autocomplete (input, array) {

    let currentFocus;

    // to classify an option as "active"
    const addActive = (options) => {
        if (!options) return false;
        
        // start by removing the "active" class on all items:
        removeActive(options);
        if (currentFocus >= options.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (options.length - 1);
        
        // add class "autocomplete-active":
        options[currentFocus].classList.add("autocomplete-active");
    }

    // to remove the "active" state from an option
    const removeActive = (options) => {
        // a function to remove the "active" class from all autocomplete items:
        for (const option of options) {
          option.classList.remove("autocomplete-active");
        }
    }

    // closes all autocomplete lists in the document
    const closeAllLists = (element) => {
        const items = document.getElementsByClassName("autocomplete-items");
        if (items.length > 0) {
            for (const item of items) {
                if (element != item && element != input) {
                    item.parentNode.removeChild(item);
                }
            }
        }
    }

    // add an event listener when someone writes on the input field
    input.addEventListener('input', (e) => {
        let value = input.value;
        // closes all the others autocompleted values
        closeAllLists();
        if (!value) return false

        currentFocus = -1;

        // create a div that will hold the autocomplete options
        let optionsHolder = document.createElement('DIV');
        optionsHolder.setAttribute('id', input.id + '-autocomplete-list');
        optionsHolder.setAttribute('class', 'autocomplete-items');
        input.parentNode.appendChild(optionsHolder);

        // runs through the array
        for (const [country, alpha]  of array) {
            // checks if the input value matches the initial characters as the elements
            if (country.substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                // creates a div for each option
                let option = document.createElement('DIV');
                // highlights the matching letters
                option.innerHTML =  "<strong>" + country.substring(0, value.length) + "<strong>"
                option.innerHTML += country.substr(value.length);
                // insert an input field that will hold the current array item's value
                option.innerHTML += "<input type='hidden' value='" + country + "'>";

                option.addEventListener('click', (e) => {
                    // switches the input value to the clicked one
                    input.value = country;
                    closeAllLists();
                });
                optionsHolder.appendChild(option);
            }
        }
    });

    // Allows to select the country using keyboard
    input.addEventListener('keydown', (e) => {
        let option = document.getElementById('input-countries-autocomplete-list');
        if (option) option = option.getElementsByTagName('div');

        // select the focused item according to the keypressed
        if (e.key == "ArrowDown") {
            currentFocus++;
            addActive(option);
        } else if (e.key == "ArrowUp") {
            currentFocus--;
            addActive(option);
        } else if (e.key == "Enter") {
            e.preventDefault();
            if (currentFocus > -1) {
                // simulate a click on current focus
                if (option) option[currentFocus].click();
            }
        }
    });

    // closes all lists when a click is performed anywhere in the document
    document.addEventListener("click", (e) => {
        closeAllLists(e.target);
    });
}

export { autocomplete }