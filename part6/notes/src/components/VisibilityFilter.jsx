import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            all
            {
                // since the name of the radio input is the same, only one can be selected at a time
            }
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('ALL'))}
            />
            important
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('IMPORTANT'))}
            />
            nonimportant
            <input
                type="radio"
                name="filter"
                onChange={() => dispatch(filterChange('NONIMPORTANT'))}
            />
        </div>
    )
}


export default VisibilityFilter