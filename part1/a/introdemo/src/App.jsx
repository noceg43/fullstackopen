const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

// This will create a footer element (HTML tag), not your custom Footer component.
const footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

// But this will create the custom Footer component if it's defined properly:
const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}


const App = () => {
  const name = 'Peter'
  const age = 10

  // When it's necessary to return multiple components,
  // do not insert in the root component any html component like <div> or <p>
  // instead use the react fragment <></>
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

export default App
