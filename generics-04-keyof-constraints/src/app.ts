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

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

/*
在TypeScript中，keyof是一種索引類型查詢操作符，它可以用於獲取某個類型的所有公開屬性名稱的聯合類型。

在這個例子中，PersonKeys的類型是"name" | "age"，這是一個聯合類型，表示值可以是"name"或"age"。
這在許多情況下都非常有用，例如，你可以使用keyof來創建一個函數，這個函數接受一個對象和一個屬性名，並返回該屬性的值：
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let person: Person = {name: 'John', age: 30};
let personName = getProperty(person, 'name'); // "John"
let personAge = getProperty(person, 'age'); // 30
*/
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}
/*
在這個例子中，keyof用於獲取T（一個對象類型）的所有屬性名稱的聯合類型。在extractAndConvert函數的參數列表中，U extends keyof T表示U必須是T的一個屬性名稱。

當你調用extractAndConvert({ name: 'Max' }, 'name')時，T的實際類型是{ name: string }，所以keyof T的結果是"name"。這意味著U的類型必須是"name"。

因此，keyof在這裡確保了你只能傳入一個存在於給定對象中的屬性名稱。如果你嘗試傳入一個不存在的屬性名稱，TypeScript將會在編譯時期給出一個錯誤。例如，extractAndConvert({ name: 'Max' }, 'age')將會產生一個錯誤，因為"age"不是{ name: string }的一個屬性。
*/
extractAndConvert({ name: "Max" }, "name");
