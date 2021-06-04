import { validate } from '../utils';
import { t1, t2 } from '../utils/chunk';
let commonTest = require('./common-test');

console.log(commonTest);

validate();
t1();
t2();

import('voyage/buttons').then((buttons) => {
    console.log(buttons);
});
