const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    // "this" object
    greet: function() {
      console.log('hello, my name is ' + this.name)
    },
  
    doAddition: function(a, b) {
      console.log(a + b)
    },
  }


// methods references
arto.doAddition(1, 4)        // 5 is printed
  
const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed


arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"

// how to pass the reference of the "this" object

// done by js if we use setTimeout
setTimeout(arto.greet, 1000)

// or use .bind 
setTimeout(arto.greet.bind(arto), 1000)
