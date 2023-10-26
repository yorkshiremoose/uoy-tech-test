const { timeModifier } = require('./timeModifier');

const addOneDay = 'now()+1d';
const modifiedDate = timeModifier(addOneDay);

console.log('Now() fixed as 2022-01-09T09:00:00Z');
console.log(modifiedDate);