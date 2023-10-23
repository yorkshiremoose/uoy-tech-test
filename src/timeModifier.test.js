const timeModifier = require('./timeModifier');

test('return result is of type Date', () => {
    expect(timeModifier('a string')).toBeInstanceOf(Date);
});
