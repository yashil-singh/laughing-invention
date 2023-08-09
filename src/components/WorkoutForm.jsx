import { useState } from "react"
import { TextInput, inputStyle } from './Inputs'
import { Button } from './Buttons'
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in.')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setError(null)
            setEmptyFields([])
            console.log('New workout added.', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create-container" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <TextInput 
                type='text'
                onTextChange={(e) => setTitle(e.target.value)}
                styles={emptyFields?.includes('title') ? inputStyle.errorTextFieldStyle : inputStyle.textFieldStyle}
            />
            <label>Load (in kg):</label>
            <TextInput 
                type='number'
                onTextChange={(e) => setLoad(e.target.value)}
                styles={emptyFields?.includes('load') ? inputStyle.errorTextFieldStyle : inputStyle.textFieldStyle}
            />
            <label>Reps:</label>
            <TextInput 
                type='number'
                onTextChange={(e) => setReps(e.target.value)}
                styles={emptyFields?.includes('reps') ? inputStyle.errorTextFieldStyle : inputStyle.textFieldStyle}
            />
            <Button 
                text='Add Workout'
            />
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm