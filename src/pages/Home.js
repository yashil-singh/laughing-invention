import { useEffect } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from "../hooks/useAuthContext"

//components
import Navbar from "../components/Navbar"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const workoutsJson = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: workoutsJson})
            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <Navbar />
            <div className="home-main-container">
                <h1>My Workouts</h1>
                <div className="workout-container">
                    <div className="workouts">
                        {workouts && workouts.map((workout) => {
                            return(
                                <WorkoutDetails key={workout._id} workout={workout} />
                            )
                        })}
                    </div>
                    <WorkoutForm />
                </div>
            </div>
        </div>
    )
}

export default Home