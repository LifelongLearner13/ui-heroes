/**
 * Comparator function to sort a 2D array by the first element in the sub array.
 * @param {array} a - Sub array
 * @param {array} b - Sub array
 */
function comparator(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}

/**
 * Compare contents of two objects. Function is indended to be used for simple objects
 * and is not optimized for performance.
 * @param {object} obj1 - Object to compare
 * @param {object} obj2 - Object to compare
 */
export default function (obj1, obj2) {
  /* Convert objects to arrays of tuples and sort by key */
  const sortedObj1 = Object.entries(obj1).sort(comparator);
  const sortedObj2 = Object.entries(obj2).sort(comparator);
  /* Convert to strings to compare, since objects are sorted above order doesn't matter */
  return JSON.stringify(sortedObj1) === JSON.stringify(sortedObj2);
}
