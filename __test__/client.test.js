import { turnIntoArray } from '../src/client/js/getCountries'

describe ("Test turn into array operation", () => {
    test("Result should be an array of a tupple", () => {
        const data = [
            {
                'name': 'Australia',
                'alpha-2': 'AU'
            }
        ];
        expect(turnIntoArray(data)).toStrictEqual([['Australia', 'AU']])
    })
});