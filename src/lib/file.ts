// 通过路径获取图片文件
function getImageFileFromUrl(url: string) {
    // 截取图片名称
    let imageName = url.substring(url.lastIndexOf('/') + 1)
    // 截取图片后缀名
    let suffixName = imageName.split('.')[1]
    return new Promise((resolve, reject) => {
        let blob = null
        let xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.setRequestHeader('Accept', 'image/jpeg')
        xhr.responseType = "blob"
        xhr.onload = () => {
            blob = xhr.response
            let imgFile = new File([blob], imageName, { type: `image/${suffixName}` })
            resolve(imgFile)
        }
        xhr.onerror = (e) => {
            reject(e)
        }
        xhr.send()
    })
}

// Promise 研究样例
function testPromise() {
    Promise.resolve().then(() => {
        console.log(0);
        return Promise.resolve(4);
    }).then((res) => {
        console.log(res)
    })

    Promise.resolve().then(() => {
        console.log(1);
    }).then(() => {
        console.log(2);
    }).then(() => {
        console.log(3);
    }).then(() => {
        console.log(5);
    }).then(() => {
        console.log(6);
    })
}

// const fn = (s: any) => (
//     new Promise((resolve: any, reject: any) => {
//         if (typeof s === 'number') {
//             resolve();
//         } else {
//             reject();
//         }
//     })
//         .then(
//             res => console.log('参数是一个number'),
//         )
//         .catch(err => console.log('参数是一个字符串'))
// )
// fn('1');
// fn(1);
// 先输出   参数是一个number
// 后输出   参数是一个字符串
const fn = (s: any) => {
    new Promise((resolve, reject) => {
        if (typeof s === "number") {
            resolve(s);
        } else {
            reject(s);
        }
    })
        .then(
            (res) => console.log("参数是一个number")) // 注意，这里虽然提供了函数，但是没返回，所以理解为  return resolve(undefined)
        // 注意，这里没传递失败函数，只要callback不是一个函数，默认值穿透拿上一步的promise
        .then(
            (succ) => console.log("then2 succ " + succ) // 这里一定输出undefined，毕竟上一步没返回值，默认理解成resolve(undefined)
            // 这里由于继承了 fn("1") 的失败状态导致执行了 catch
            // 而 fn(1) 的状态为成功，所以没有执行 catch
            // 按照我的理解，这里的 undefined 是 fn(1) 第二轮执行的结果
            // ,
            // (err) => console.log("then2 err " + typeof err) // 这里输出"then2 err string"
        )
        .catch((err) => {
            // 由于之前的 .then 都没有一个报错的出口，于是一直在传递失败状态，
            // 直到这个 .catch 里面终于有了报错出口，然后便最后执行了
            console.log("参数是一个字符串");
            console.log("catch " + typeof err); // 这里输出"catch string"，因为上一个then又没失败回调，一直穿透下来
        })
        // .then(res => {
        //     console.log(res)
        // }).catch((err) => {
        //     console.log("catch2 " + err); // 这里无输出，因为上一个then执行了失败回调，值没有穿透下来
        // });
};
fn("1");
fn(1);
// 参数是一个number
// undefined
// 参数是一个字符串
// "1"


// 参数是一个number
// then2 err string
// then2 succ undefined

// 参数是一个number
// then2 succ undefined
// 参数是一个字符串
// catch string


// 完整例子
// const PENDING = "pending";
// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";

// const resolvePromise = (p, result, resolve, reject) => {
//   if (p === result) {
//     reject(new Error("Chaining cycle detected for promise #<Promise>"));
//   }
//   // 判断result是不是promise
//   if (result instanceof MyPromise) {
//     result.then(resolve, reject);
//   } else {
//     resolve(result);
//   }
// };

// class MyPromise {
//   constructor(fn: any) {
//     try {
//       // 这里的fn其实就是new Promise传递的函数
//       fn(this.resolve, this.reject);
//     } catch (e) {
//       this.reject(e);
//     }
//   }

//   // 初始化状态以及成功，失败的值
//   status = PENDING;
//   value = null;
//   // 新增记录成功与失败回调的参数
//   fulfilledCallback = [];
//   rejectedCallback = [];

//   // 静态resolve
//   static resolve(value: any) {
//     if (value instanceof MyPromise) {
//       return value;
//     }
//     return new MyPromise((resolve: any, reject: any) => {
//       resolve(value);
//     });
//   }

//   // 静态reject
//   static reject(value: any) {
//     if (value instanceof MyPromise) {
//       return value;
//     }
//     return new MyPromise((resolve: any, reject: any) => {
//       reject(value);
//     });
//   }

//   resolve = (value: any) => {
//     // 当调用resolve时修改状态成fulfilled，同时记录成功的值
//     if (this.status === PENDING) {
//       this.value = value;
//       this.status = FULFILLED;
//       // 新增成功回调的调用
//       while (this.fulfilledCallback.length) {
//         this.fulfilledCallback.shift()?.(value);
//       }
//     }
//   };

//   reject = (reason: any) => {
//     // 当调用reject时修改状态成rejected，同时记录失败的理由
//     if (this.status === PENDING) {
//       this.value = reason;
//       this.status = REJECTED;
//       // 新增失败回调的调用
//       while (this.rejectedCallback.length) {
//         this.rejectedCallback.shift()?.(reason);
//       }
//     }
//   };

//   then = (fulfilledFn: any, rejectedFn: any) => {
//     // 新增回调判断，如果没传递，那我们就定义一个单纯起value接力作用的函数
//     fulfilledFn =
//       typeof fulfilledFn === "function" ? fulfilledFn : (value: any) => value;
//     rejectedFn =
//       typeof rejectedFn === "function"
//         ? rejectedFn
//         : (value: any) => {
//             throw value;
//           };
//     // 我们得在每次调用then时返回一个Promise
//     const p = new MyPromise((resolve, reject) => {
//       // 封装成功的微任务
//       const fulfilledMicrotask = () => {
//         // 创建一个微任务等待 promise2 完成初始化
//         queueMicrotask(() => {
//           try {
//             // 获取成功回调函数的执行结果
//             const x = fulfilledFn(this.value);
//             // 传入 resolvePromise 集中处理
//             resolvePromise(p, x, resolve, reject);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       };
//       // 封装失败的微任务
//       const rejectedMicrotask = () => {
//         // 创建一个微任务等待 promise2 完成初始化
//         queueMicrotask(() => {
//           try {
//             // 调用失败回调，并且把原因返回
//             const x = rejectedFn(this.value);
//             // 传入 resolvePromise 集中处理
//             resolvePromise(p, x, resolve, reject);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       };
//       const callbackMap = {
//         [FULFILLED]: fulfilledMicrotask,
//         [REJECTED]: rejectedMicrotask,
//         // 针对异步问题，新增pending状态时记录并保存回调的操作
//         [PENDING]: () => {
//           this.fulfilledCallback.push(fulfilledMicrotask);
//           this.rejectedCallback.push(rejectedMicrotask);
//         },
//       };
//       callbackMap[this.status]();
//     });
//     return p;
//   };
// }


const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const resolvePromise = (p: any, result: any, resolve: any, reject: any) => {
    // 判断是不是自己，如果是调用reject
    if (p === result) {
        reject(new Error("Chaining cycle detected for promise #<Promise>"));
    }
    // 判断result是不是promise
    if (result instanceof MyPromise) {
        result.then(resolve, reject);
    } else {
        resolve(result);
    }
};
class MyPromise {

    constructor(fn: any) {
        try {
            // 这里的fn其实就是new Promise传递的函数
            fn(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    // 初始化状态以及value
    status = PENDING;
    value = null;
    // 新增记录成功与失败回调的参数
    fulfilledCallback = [];
    rejectedCallback = [];

    // 静态resolve
    static resolve(value?: any) {
        // 加入参数是一个promise，原封不动的返回
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve: any, reject: any) => {
            resolve(value);
        });
    }

    // 静态reject
    static reject(value?: any) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve: any, reject: any) => {
            reject(value);
        });
    }

    resolve = (value: any) => {
        // 当调用resolve时修改状态成fulfilled，同时记录成功的值
        if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
            // 新增成功回调的调用
            while (this.fulfilledCallback.length) {
                this.fulfilledCallback.shift()?.(value);
            }
        }
    }

    reject = (reason: any) => {
        // 当调用reject时修改状态成rejected，同时记录失败的理由
        if (this.status === PENDING) {
            this.value = reason;
            this.status = REJECTED;
            // 新增失败回调的调用
            while (this.rejectedCallback.length) {
                this.rejectedCallback.shift()?.(reason);
            }
        }
    }

    then = (fulfilledFn?: any, rejectedFn?: any) => {
        // 新增回调判断，如果没传递，那我们就定义一个单纯起value接力作用的函数
        fulfilledFn =
            typeof fulfilledFn === "function" ? fulfilledFn : (value: any) => value;
        rejectedFn =
            typeof rejectedFn === "function"
                ? rejectedFn
                : (value: any) => {
                    throw value;
                };
        // 我们得在每次调用then时返回一个Promise
        const p = new MyPromise((resolve: any, reject: any) => {
            // 封装成功的微任务
            const fulfilledMicrotask = () => {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    // 添加错误捕获
                    try {
                        // 获取成功回调函数的执行结果
                        const result = fulfilledFn(this.value);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(p, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            };
            // 封装失败的微任务
            const rejectedMicrotask = () => {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    // 添加错误捕获
                    try {
                        // 调用失败回调，并且把原因返回
                        const result = rejectedFn(this.value);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(p, result, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            };
            const callbackMap = {
                [FULFILLED]: fulfilledMicrotask,
                [REJECTED]: rejectedMicrotask,
                // 针对异步问题，新增pending状态时记录并保存回调的操作
                [PENDING]: () => {
                    this.fulfilledCallback.push(fulfilledMicrotask);
                    this.rejectedCallback.push(rejectedMicrotask);
                },
            };

            callbackMap[this.status]();
        });
        return p;
    }
}
// console.log("---------------------")
// function testPromise() {
// MyPromise.resolve()
//   .then(() => {
//     console.log(0);
//     return MyPromise.resolve(4);
//   })
//   .then((res) => {
//     console.log(res);
//   });

// MyPromise.resolve()
//   .then(() => {
//     console.log(1);
//   })
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   })
//   .then(() => {
//     console.log(5);
//   })
//   .then(() => {
//     console.log(6);
//   });
// }

export { getImageFileFromUrl, testPromise }