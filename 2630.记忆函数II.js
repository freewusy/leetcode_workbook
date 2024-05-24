/**
 * 题目
  现给定一个函数 fn ，返回该函数的一个 记忆化 版本。
  一个 记忆化 的函数是一个函数，它不会被相同的输入调用两次。而是会返回一个缓存的值。
  函数 fn 可以是任何函数，对它所接受的值类型没有任何限制。如果两个输入值在 JavaScript 中使用 === 运算符比较时相等，则它们被视为相同。
  示例 1：
    输入： 
    getInputs = () => [[2,2],[2,2],[1,2]]
    fn = function (a, b) { return a + b; }
    输出：[{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
    解释：
    const inputs = getInputs();
    const memoized = memoize(fn);
    for (const arr of inputs) {
      memoized(...arr);
    }

    对于参数为 (2, 2) 的输入: 2 + 2 = 4，需要调用 fn() 。
    对于参数为 (2, 2) 的输入: 2 + 2 = 4，这些输入之前已经出现过，因此不需要再次调用 fn()。
    对于参数为 (1, 2) 的输入: 1 + 2 = 3，需要再次调用 fn()，总共调用了 2 次。


  示例 2：
    输入：
    getInputs = () => [[{},{}],[{},{}],[{},{}]] 
    fn = function (a, b) { return a + b; }
    输出：[{"val":{},"calls":1},{"val":{},"calls":2},{"val":{},"calls":3}]
    解释：
    将两个空对象合并总是会得到一个空对象。尽管看起来应该缓存命中并只调用一次 fn()，但是这些空对象彼此之间都不是 === 相等的。


  示例 3：
    输入： 
    getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
    fn = function (a, b) { return ({...a, ...b}); }
    输出：[{"val":{},"calls":1},{"val":{},"calls":1},{"val":{},"calls":1}]
    解释：
    将两个空对象合并总是会得到一个空对象。因为传入的每个对象都是相同的，所以第二个和第三个函数调用都会命中缓存。
  

  提示：

  1 <= inputs.length <= 105
  0 <= inputs.flat().length <= 105
  inputs[i][j] != NaN
 */

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});
memoizedFn(2, 3); // 5
memoizedFn(2, 3); // 5
memoizedFn(3, 2); // 5
console.log(callCount); // 1

/**
 * @param {Function} fn
 * @return {Function}
 * 解题思路
 * 1.传递的参数map形式保存，一个参数对应一个id
 * 2.所有参数对应id转String合并，得到一个key
 * 3.执行回调函数，返回的值与参数得到key，存储map
 */
function memoize(fn) {
  let mapValue = new Map(), // 记录fn执行的值
    mapId = new Map(); // 记录传递的参数
  let uid = 0;
  return function (...args) {
    const key = args
      .map((value) => {
        if (!mapId.has(value)) mapId.set(value, ++uid);
        return mapId.get(value);
      })
      .join("_");
    if (!mapValue.has(key)) mapValue.set(key, fn.apply(null, args));
    return mapValue.get(key);
  };
}
