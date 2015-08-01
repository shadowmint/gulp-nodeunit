import {Foo} from './foo_component';

export function test_bar(test) {
  test.ok(new Foo());
  test.done();
}
