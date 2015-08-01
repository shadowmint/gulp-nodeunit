import {Bar} from './bar';

export function test_bar(test) {
  test.ok(new Bar());
  test.done();
}
