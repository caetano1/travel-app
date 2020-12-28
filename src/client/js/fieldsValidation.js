// Aggregate the functions that validate the user inputs
import '../messages/messages.json';

const checkEmptyField = (field) => {
    if (field.nextElementSibling) {
        field.nextElementSibling.innerHTML = "";
        field.classList.remove('input-error-feedback');
        if (field.validity.valueMissing) {
            field.classList.add('input-error-feedback')
            field.nextElementSibling.innerHTML = "This field cannot be empty."
        }
    };
}

function checkInputFields () {
    const inputFields = document.getElementsByTagName('input');
    for (const input of inputFields) {
        checkEmptyField(input);
    }
    
    if (document.getElementsByClassName('input-error-feedback').length != 0) return true
}


export { checkInputFields, checkEmptyField }