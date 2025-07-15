import {Clock} from "./domain/clock"

const clock1 = new Clock({ hour: 12, minute: 45, second: 0 });
const clock2 = new Clock({ hour: 15, minute: 25, second: 0 });
const clock3 = new Clock({ hour: 9, minute: 1, second: 55 });

console.log(clock1.compare(clock2));

clock1.on('tick', console.log);
clock2.on('tick', console.log);
clock2.update({hour:2,minute:20, second:51})
clock3.on('tick', console.log);


console.log(clock2.compare(clock3));