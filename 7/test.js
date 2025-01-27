import { typeAssert } from "type-assertions";
import { swap } from './index';
const pair1 = swap(123, 'hello');
typeAssert();
const pair2 = swap(true, false);
typeAssert();
const pair3 = swap(null, undefined);
typeAssert();
