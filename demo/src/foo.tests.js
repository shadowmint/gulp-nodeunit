import {Foo} from './foo';

export function test_bar(test) {
  test.ok(new Foo());
  test.done();
}
