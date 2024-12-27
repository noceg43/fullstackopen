const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }



// single paramater we can exclude the ()
const square = p => {
    console.log(p)
    return p * p
  }
  
// short form
const squareShort = p => p * p


const result = sum(1, 5)
console.log(result)


// other way to define functions (old)
function product(a, b) {
    return a * b
  }
  
const resultProduct = product(2, 6)
// result is now 12