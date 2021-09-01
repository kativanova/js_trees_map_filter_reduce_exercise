import {
  mkdir, mkfile,
} from '@hexlet/immutable-fs-trees';
import { reduce } from './solution.js';

const tree = mkdir('/', [
  mkdir('eTc', [
    mkfile('config.json'),
  ]),
]);

console.log(reduce((acc, n) => acc + 1, tree, 0));
// 3
