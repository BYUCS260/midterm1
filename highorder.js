let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let b = a.filter(number => {
  return (number % 2 === 0)
});
console.log(b);
let c = a.reduce((total, number) => {
  return (total + number)
}, 10);
console.log(c);
let e = a.map(number => {
  return (number - 1)
});
console.log(e);
