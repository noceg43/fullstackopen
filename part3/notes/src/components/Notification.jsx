const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
        // className use the notification theme from css
      <div className='notificaton'>
        {message}
      </div>
    )
  }

export default Notification