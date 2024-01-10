// const names: Array<string> = []; // string[]
// // names[0].split(' ');

// const promise: Promise<number> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 2000);
// });

// promise.then(data => {
//   // data.split(' ');
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

/*
在這個函數聲明中，[T, string]表示該函數的返回值是一個元組（Tuple）。
元組是一種特殊的陣列，其中的元素類型和順序都是固定的。

在這個例子中，元組的第一個元素的類型是T，第二個元素的類型是string。
這意味著這個函數將返回一個包含兩個元素的陣列，第一個元素的類型與輸入參數element的類型相同，第二個元素的類型是string。

例如，如果你調用countAndDescribe並傳入一個string，那麼該函數將返回一個元組，其中第一個元素是一個string，第二個元素也是一個string。
如果你傳入一個具有length屬性的對象，那麼該函數將返回一個元組，其中第一個元素是該對象，第二個元素是一個string。
*/ 
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText]; 
}

console.log(countAndDescribe(['Sports', 'Cooking']));