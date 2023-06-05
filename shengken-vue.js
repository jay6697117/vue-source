// function toNumber(val) {
//   console.log('isNaN(n)', isNaN(n))
//   var n = parseFloat(val);
//   return isNaN(n) ? val : n;
// }
// console.log(toNumber(1.1));

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
// makeMap 方法将字符串切割，放到map中，用于校验其中的某个字符串是否存在（区分大小写）于map中
// function makeMap(str, expectsLowerCase) {
//   var map = Object.create(null);
//   var list = str.split(',');

//   for (var i = 0; i < list.length; i++) {
//     map[list[i]] = true;
//   }
//   // console.log('list:', list);
//   // console.log('map:', map)
//   return expectsLowerCase
//     ? function (val) {
//         console.log('val 1:', val);
//         return map[val.toLowerCase()] ? true : false;
//       }
//     : function (val) {
//         console.log('val 2:', val);
//         return map[val] ? true : false;
//       };
// }

// const closureFn = makeMap('slot,component', true);
// console.log('closureFn:', closureFn('SLOT'));
// console.log('closureFn:', closureFn('COMPONENT'));

// const closureFn1 = makeMap('key,ref,slot,slot-scope,is');
// console.log('closureFn1', closureFn1('slot-scope'));
// console.log('closureFn1', closureFn1('SLOT-SCOPE'));

// function remove(arr, item) {
//   if (arr && Array.isArray(arr)) {
//     var index = arr.indexOf(item);
//     if (index > -1) {
//       return arr.splice(index, 1);
//     }
//   } else {
//     console.log('arr不是数组');
//   }
// }

// const arr = [1, 2, 3];
// // const arr = null;
// remove(arr, 3);
// console.log('arr', arr);
/*
function cached(fn) {
  var cache = Object.create(null); // 创建一个空对象
  // 具名函数cachedFn
  return function cachedFn(str) {
    // 获取缓存对象str属性的值，如果该值存在，直接返回，不存在调用一次fn，然后将结果存放到缓存对象中
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const fn = cached(function (str) {
  console.log('str:', str)
  return str +' - '+str;
});
console.log('fn:', fn);
console.log(fn(333));
 */

/* function cached(fn) {
  var cache = Object.create(null); // 创建一个空对象
  // 具名函数cachedFn
  return function cachedFn(str) {
    // 获取缓存对象str属性的值，如果该值存在，直接返回，不存在调用一次fn，然后将结果存放到缓存对象中
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});

console.log(camelize('aaa-bbb')); */

/* function cached(fn) {
  var cache = Object.create(null); // 创建一个空对象
  // 具名函数cachedFn
  return function cachedFn(str) {
    // 获取缓存对象str属性的值，如果该值存在，直接返回，不存在调用一次fn，然后将结果存放到缓存对象中
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

console.log(capitalize('abc')); */

function cached(fn) {
  var cache = Object.create(null); // 创建一个空对象
  // 具名函数cachedFn
  return function cachedFn(str) {
    // 获取缓存对象str属性的值，如果该值存在，直接返回，不存在调用一次fn，然后将结果存放到缓存对象中
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/* var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

console.log(hyphenate('helloWorld'));
 */

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
/* function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

// 这段代码定义了一个名为 "polyfillBind" 的函数，该函数返回一个已绑定上下文的新函数。它接受两个参数：fn（要被绑定的函数），ctx（要被绑定的上下文）。
//  "boundFn" 函数接收一个参数，根据函数参数的数量使用原始函数的 "call" 或 "apply" 方法来绑定上下文，然后返回函数的执行结果。
//  最后，该函数返回一个 "boundFn" 函数并设置 "_length" 属性为原始函数的长度。 */
/*
function toArray(list, start) {
  console.log('list:', list); //其实就是arguments
  start = start || 0;
  var i = list.length - start; //arguments.length
  console.log('i:', i);
  var ret = new Array(i);
  console.log('ret 1:', ret); //[ <3 empty items> ]
  while (i--) {
    ret[i] = list[i + start];
  }
  console.log('ret 2:', ret)
  return ret;
}

function fn() {
  console.log('arguments', arguments);
  return toArray(arguments, 0);
}

console.log(fn(1, 2, 3));
 */

/* // 该函数将两个对象 'to' 和 '_from' 作为参数传入，并将'_from'中的属性添加到'to'中
function extend(to, _from) {
  // 遍历 '_from' 对象的所有键
  for (var key in _from) {
    // 将' _from '对象中的键值对添加到 'to' 对象中
    to[key] = _from[key];
  }
  // 返回更新后的 'to' 对象
  return to;
}


function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

console.log(toObject(["bilibli"]));
// {
//   '0': 'b',
//   '1': 'i',
//   '2': 'l',
//   '3': 'i',
//   '4': 'b',
//   '5': 'l',
//   '6': 'i'
// } */

/* function genStaticKeys(modules, staticKeys) {
  console.log('modules', modules);
  return modules
    .reduce(function (keys, m) {
      return keys.concat(m[staticKeys] || []);
    }, [])
    .join(',');
}

console.log(genStaticKeys([{ a: 1 }, { a: 2 }, { a: 3 }], 'a'));
 */
/*
function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every(function (key) {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
 */
