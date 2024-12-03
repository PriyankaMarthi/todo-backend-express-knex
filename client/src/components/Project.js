import React, { useState, useEffect } from 'react'
import { projectApi } from '../services/api'
import TaskList from './TaskList'

const Project = ({ projectId }) => {
    const [project, setProject] = useState(null)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const [projectResponse, statsResponse] = await Promise.all([
                    projectApi.getProjectDetails(projectId),
                    projectApi.getProjectStats(projectId)
                ])
                
                setProject(projectResponse.data)
                setStats(statsResponse.data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchProjectData()
    }, [projectId])

    if (loading) return <div>Loading project...</div>
    if (error) return <div>Error: {error}</div>
    if (!project) return <div>Project not found</div>

    return (
        <div className="project">
            <h2>{project.project_name}</h2>
            
            {stats && (
                <div className="project-stats">
                    <h3>Project Statistics</h3>
                    <p>Total Tasks: {stats.total_tasks}</p>
                    <p>Completed: {stats.completed_tasks}</p>
                    <p>Active: {stats.active_tasks}</p>
                </div>
            )}

            <TaskList projectId={projectId} />
        </div>
    )
}

export default Project 