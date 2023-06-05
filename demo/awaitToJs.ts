/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function awaitToJs<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => {
      // Promise 成功时
      // 返回[null, data]
      return [null, data];
    })
    .catch<[U, undefined]>((err: U) => {
      console.log('awaitToJs err:', err);
      console.log('awaitToJs errorExt:', errorExt);
      // Promise异常时
      // 判断是否带有errorExt参数
      if (errorExt) {
        // 如果有时会与 catch 捕获的 err 合并返回
        const parsedError = Object.assign({}, err, errorExt);
        console.log('awaitToJs parsedError:', parsedError);
        return [parsedError, undefined];
      }
      // 如果没有时返回[err, undefined]
      return [err, undefined];
    });
}

const promiseFn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve([200, '请求成功']);
      // return reject({ result: '失败' });
    }, 3000);
  });
};

const fetchFn = (params: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(params);
    }, 3000);
  });
};

/*
let aaa = '111';
(async () => {
  aaa = '222';
  let res = await promiseFn()
    .catch(err => {
      console.log('err:', err);
    })
    .finally(() => {
      aaa = '111';
    });
  console.log('aaa 2:', aaa);
  console.log('res 1:', res);
  if (!res) return;
  // 请求成功后正常操作
  console.log('res 2:', res);
})();
*/

(async () => {
  // 获取数据data
  const [err, data]: [any, any | any[]] = await awaitToJs(promiseFn(), { errorExt: '我是错误信息' });
  console.log('err 0:', err);
  console.log('data 0:', data);
  if (err) return;
  // 获取单个详情
  console.log('data 1:', data);
  const res = await awaitToJs(fetchFn(data[data.length - 1]));
  console.log('res 1:', res);
})();

// 本文通过研究 async/await 的异常捕获，发现了两种常见的异步请求异常捕获，并提出了两种简单的解决方法。通过这两种方法，就可以丢掉冗余的 try-catch，然后你就会发现没了 try-catch 的代码看起来都是顺眼的。
