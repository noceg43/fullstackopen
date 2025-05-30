import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// use forwardRef to pass the ref to the component
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }


    // useImperativeHandle is an hook that exposes the toggleVisibility function to the parent component
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className='togglableContent'>
                {// props.children is the content between the opening and closing tags of the component
                    props.children
                }
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )

})
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node
}
Togglable.displayName = 'Togglable'

export default Togglable