import Display from './components/Display'
import Button from './components/Button'

const App = () => {
  // useReducer, similar to useState, but for more complex state management
  // similar to Redux, but for local state and less boilerplate
  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App