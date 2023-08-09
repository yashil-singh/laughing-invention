import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if (!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }

    }

    return (
        <div className="workout-card">
            <div className="workout-details">
                <h4>{workout.title}</h4>
                <p><strong>Load (kg): </strong>{workout.load}</p>
                <p><strong>Reps: </strong>{workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            </div>
            <div className="card-buttons">
                <span className="material-icons-round" onClick={handleClick}>delete</span>
            </div>
        </div>
    )
}

export default WorkoutDetails