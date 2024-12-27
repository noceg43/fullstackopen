import { useState } from 'react'
import './App.css'

// always define components outside other components
const History = (props) => {
  //debug using console.log
  console.log('props value is', props)
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }


  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (<>

    <div>
      {left}
      <Button handleClick = {handleLeftClick} text='left'></Button>
      <Button handleClick={handleRightClick} text='right'></Button>
      {right}
      <Button handleClick={() => console.log("print function")} text="print to console"></Button>

      <History allClicks={allClicks} />
    </div>
    <div>
      <Button handleClick={() => setToValue("new value")} text='setValue'></Button>
    </div>
    </>
  )
}

export default App