import React, { useState, useEffect } from 'react'
import { taskApi } from '../services/api'

const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await taskApi.getTasksByProject(projectId)
                setTasks(response.data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchTasks()
    }, [projectId])

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await taskApi.updateTaskStatus(taskId, newStatus)
            const updatedTasks = tasks.map(task => 
                task.id === taskId ? { ...task, status: newStatus } : task
            )
            setTasks(updatedTasks)
        } catch (err) {
            setError(err.message)
        }
    }

    if (loading) return <div>Loading tasks...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-item">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <select 
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            ))}
        </div>
    )
}

export default TaskList 