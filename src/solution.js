import {
  getChildren, getMeta, getName, isFile, mkdir,
} from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

const map = (callback, node) => {
  const copyOfNode = _.cloneDeep(node);
  const modifiedNode = callback(copyOfNode);

  if (isFile(node)) {
    return modifiedNode;
  }
  const name = getName(modifiedNode);
  const meta = getMeta(modifiedNode);
  const children = getChildren(modifiedNode);

  const newChildren = children.map((child) => map(callback, child));

  return mkdir(name, newChildren, meta);
};

const filter = (predicate, node) => {
  const cloneOfNode = _.cloneDeep(node);

  if (!predicate(node)) {
    return null;
  }

  if (isFile(node)) {
    return cloneOfNode;
  }

  const name = getName(cloneOfNode);
  const meta = getMeta(cloneOfNode);
  const children = getChildren(cloneOfNode);

  const newChildren = children
    .map((child) => filter(predicate, child))
    .filter((child) => child);

  return mkdir(name, newChildren, meta);
};

const reduce = (callback, node, acc) => {
  const cloneOfNode = _.cloneDeep(node);
  const newAcc = callback(acc, cloneOfNode);

  if (isFile(node)) {
    return newAcc;
  }
  const children = getChildren(cloneOfNode);

  return children.reduce((n, child) => reduce(callback, child, n), newAcc);
};

export { filter, map, reduce };
