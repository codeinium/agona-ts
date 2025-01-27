import { typeAssert } from 'type-assertions';
import { ObjectManipulator } from './index';
const test1 = new ObjectManipulator({})
    .set('x', 123)
    .set('y', 'hello')
    .getObject();
typeAssert();
const test2 = new ObjectManipulator({})
    .set('x', 123)
    .set('y', 'hello')
    .set('z', true)
    .delete('z')
    .delete('y')
    .getObject();
typeAssert();
const test3 = new ObjectManipulator({})
    .set('x', 123)
    .set('y', 'hello')
    .delete('y')
    .get('x');
typeAssert();
const test4 = new ObjectManipulator({ x: true, y: 'hello' })
    .delete('y')
    .get('x');
typeAssert();
