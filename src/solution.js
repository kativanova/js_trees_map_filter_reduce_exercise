import {
  getChildren, isFile,
} from '@hexlet/immutable-fs-trees';

const map = (callback, tree) => {
  const iter = (node) => {
    if (isFile(node)) {
      return callback(node);
    }
    const children = getChildren(node);
    const newChildren = children.map((child) => iter(child));

    return { ...callback(node), children: newChildren };
  };

  return iter(tree);
};

const filter = (predicate, tree) => {
  const iter = (node) => {
    if (isFile(node)) {
      return predicate(node) ? node : null;
    }
    const children = getChildren(node);
    const newChildren = children
      .map((child) => iter(child))
      .filter((child) => child);
    return predicate(node) ? { ...node, children: newChildren } : null;
  };
  return iter(tree);
};

const reduce = (callback, tree, acc) => {
  const iter = (node, a) => {
    if (isFile(node)) {
      return callback(a, node);
    }
    const children = getChildren(node);
    const newAcc = children.reduce((n, child) => iter(child, n), a);
    return callback(newAcc, node);
  };
  return iter(tree, acc);
};

export { filter, map, reduce };
