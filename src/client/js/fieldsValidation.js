// Aggregate the functions that validate the user inputs
import '../messages/messages.json';

const checkEmptyValues = (fields) => {
    let res = false;
    for (const field of fields) {
        if (field.value === "") {
            field.classList.add('error-input-feedback');
            res = true;
        }
    }
    return res;
};

const checkEmptyField = (field) => {
    if (field.validity.valueMissing) {
        field.classList.add('input-error-feedback')
        field.nextElementSibling.innerHTML = "This field cannot be empty."
    }
}

function checkInputFields () {
    const inputFields = document.getElementsByTagName('input');
    console.log("Check empty fields response:", checkEmptyValues(inputFields))
    if (checkEmptyValues(inputFields)) return true
}


export { checkInputFields }
export { checkEmptyField }