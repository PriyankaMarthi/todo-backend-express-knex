import React, { useState } from 'react'
import Project from './components/Project'
import { taskApi } from './services/api'
import './App.css'

function App() {
    const [searchParams, setSearchParams] = useState({
        status: '',
        priority: '',
        searchTerm: ''
    })
    const [searchResults, setSearchResults] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await taskApi.searchTasks(searchParams)
            setSearchResults(response.data)
        } catch (err) {
            console.error('Search failed:', err)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Task Management System</h1>
            </header>

            <div className="search-section">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchParams.searchTerm}
                        onChange={(e) => setSearchParams({
                            ...searchParams,
                            searchTerm: e.target.value
                        })}
                    />
                    <select
                        value={searchParams.status}
                        onChange={(e) => setSearchParams({
                            ...searchParams,
                            status: e.target.value
                        })}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="search-results">
                {searchResults.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Project: {task.project_name}</p>
                        <p>Assigned to: {task.assigned_to_user}</p>
                    </div>
                ))}
            </div>

            {/* Example project view */}
            <Project projectId={1} />
        </div>
    )
}

export default App