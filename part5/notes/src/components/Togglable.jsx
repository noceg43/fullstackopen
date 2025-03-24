import { useState, forwardRef, useImperativeHandle } from 'react'

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
            <div style={showWhenVisible}>
                {// props.children is the content between the opening and closing tags of the component
                    props.children
                }
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )

})

export default Togglable