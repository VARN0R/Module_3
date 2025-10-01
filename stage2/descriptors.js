const person = {
  name: "Alice",
  age: 30,
  job: "Developer",
};

console.log("исходные дескрипторы:");
console.log(Object.getOwnPropertyDescriptors(person));

Object.keys(person).forEach((key) => {
  Object.defineProperty(person, key, {
    writable: false,
    enumerable: false,
    configurable: false,
  });
});

person.name = "Bob";
console.log("после попытки изменить name:");
console.log(person.name); // "Alice"

delete person.age;
console.log("после попытки удалить age:");
console.log(person.age); // 30

console.log("перечисление свойств через Object.keys:");
console.log(Object.keys(person)); // []

console.log("перечисление через for...in:");
for (let key in person) {
  console.log(key);
}

console.log("модифицированные дескрипторы:");
console.log(Object.getOwnPropertyDescriptors(person));
