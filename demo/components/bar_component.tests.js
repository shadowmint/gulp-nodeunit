import {Bar} from './bar_component';

export function test_bar(test) {
  test.ok(new Bar());
  test.done();
}
