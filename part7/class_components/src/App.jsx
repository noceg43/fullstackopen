import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)

    // define the variables in the state and initial values
    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  // like initState of Flutter
  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(response => {
      this.setState({ anecdotes: response.data })
    })
  }


  handleClick = () => {
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
    )
    // just like setState of Flutter
    this.setState({ current })
  }

  // like the build method of Flutter
  render() {
    if (this.state.anecdotes.length === 0) {
      return <div>no anecdotes...</div>
    }

    return (
      <div>
        <h1>anecdote of the day</h1>

        <div>
          {this.state.anecdotes[this.state.current].content}
        </div>
        <button onClick={this.handleClick}>next</button>
      </div>
    )
  }
}

export default App