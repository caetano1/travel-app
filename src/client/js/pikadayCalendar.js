// Builds the calendar date picker
import Pikaday from 'pikaday';

function setCalendarPicker (inputField) {
    return new Pikaday ({
        field: inputField,
        format: 'MM/DD/YYYY',
        toString(date, format) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        },
        parse(dateString, format) {
            // dateString is the result of `toString` method
            const parts = dateString.split('/');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
    });
}

export { setCalendarPicker }