// Builds the calendar date picker
import Pikaday from 'pikaday';

function setCalendarPicker (inputField) {
    return new Pikaday({
        field: inputField,
    });
}

export { setCalendarPicker }