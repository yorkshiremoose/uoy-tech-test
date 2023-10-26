const { timeModifier, parsePattern } = require('./timeModifier');

// unit test
describe('parsePattern', () => {
    it('successfully returns now() modifier', () => {
        const pattern = 'now()-1d';
        const result = parsePattern(pattern);
        expect(result.modifier).toBe('now()');
    });
    it('successfully returns + operator', () => {
        const pattern = 'now()+1d';
        const result = parsePattern(pattern);
        expect(result.operator).toBe('+');
    });
    it('returns correct amount', () => {
        const pattern = 'now()+7d';
        const result = parsePattern(pattern);
        expect(result.amount).toBe(7);
    });
    it('returns correct timeUnit', () => {
        const pattern = 'now()+7y';
        const result = parsePattern(pattern);
        expect(result.timeUnit).toBe('y');
    });

    // add tests for errors, things that shouldn't work, etc
})

// add unit test for calculateNewAmount function

// basic integration test for whole thing
describe('timeModifier', () => {
    it('returns type Date', () => {
        // Arrange
        const pattern = 'now()'
        // Act
        const result = timeModifier(pattern);
        // Assert
        expect(result).toBeInstanceOf(Date);
    });

    it('returns now', () => {
        const pattern = 'now()'
        const result = timeModifier(pattern);
        const expectedDate = new Date('2022-01-09T09:00:00Z');
        expect(result).toEqual(expectedDate);
    });

    it('adds one day to the date', () => {
        const newTime = new Date('2022-01-10T09:00:00.000Z');
        expect(timeModifier('now()+1d')).toEqual(newTime);
    })

    it('minuses one day from the date', () => {
        const newTime = new Date('2022-01-08T09:00:00.000Z');
        expect(timeModifier('now()-1d')).toEqual(newTime);
    })

    it('adds one month to the date', () => {
        const newTime = new Date('2022-02-09T09:00:00.000Z');
        expect(timeModifier('now()+1mon')).toEqual(newTime);
    })

    // FAILING TEST - losing an hour, BST to GMT - not using UTC?
    it('minuses six months from the date', () => {
        const newTime = new Date('2021-07-09T09:00:00.000Z');
        expect(timeModifier('now()-6mon')).toEqual(newTime);
    })

    it('adds one year to the date', () => {
        const newTime = new Date('2023-01-09T09:00:00.000Z');
        expect(timeModifier('now()+1y')).toEqual(newTime);
    })

    it('minuses one year from the date', () => {
        const newTime = new Date('2021-01-09T09:00:00.000Z');
        expect(timeModifier('now()-1y')).toStrictEqual(newTime);
    })

})
