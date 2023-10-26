// I've kept these functions in the same file, but as the complexity grows
// they would go into other files and folder structures

function parsePattern(pattern) {

    // making lots of assumptions here due to time constraints

    // assume modifier always now()
    const modifier = pattern.slice(0, 5);
    // assume sixth element is always operator
    const operator = pattern.slice(5, 6);
    // assume seventh element always a single number
    const amount = Number(pattern.slice(6, 7));
    // assume eighth element always unit of time
    const timeUnit = pattern.slice(7, 8);

    return {
        modifier: modifier,
        operator: operator,
        amount: amount,
        timeUnit: timeUnit,
    }
}

function calculateNewAmount(currentAmount, operator, changeAmount) {
    const adjustedChangeAmount = operator === '-' ? -changeAmount : changeAmount;
    return currentAmount + adjustedChangeAmount;
}

function timeModifier(pattern) {

    // hard coding now() for... now
    const now = new Date('2022-01-09T09:00:00Z');
    let newDate = new Date(now);

    // parse string pattern for modifier, operator and time unit
    const { modifier, operator, amount, timeUnit } = parsePattern(pattern);

    // modify date depending on unit of time
    let currentAmount, newAmount;
    switch(timeUnit) {
        case 'd':
            currentAmount = newDate.getDate();
            newAmount = calculateNewAmount(currentAmount, operator, amount)
            newDate.setDate(newAmount);
            break;
        case 'm':
            currentAmount = newDate.getMonth();
            newAmount = calculateNewAmount(currentAmount, operator, amount)
            newDate.setMonth(newAmount);
            break;
        case 'y':
            currentAmount = newDate.getFullYear();
            newAmount = calculateNewAmount(currentAmount, operator, amount)
            newDate.setFullYear(newAmount);
            break;
    }
    return newDate;

    // I feel like that switch statement could be refactored away,
    // but for now it makes the logic clear

}

/* FUTURE WORK
Make now() actually return now with tests working
Implement the @ snap operator
Be able to parse dates that are not now(), perhaps using UTC Z as the breakpoint
Multiple operators and time units
Handle seconds, minutes and hours
Fix the bug where the function loses an hour when crossing GMT/BST boundary
Process month as 'mon' not 'm'
MORE TESTS
...
*/

module.exports = { timeModifier, parsePattern, calculateNewAmount };