import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// User API calls
export const userApi = {
    createUser: (userData) => api.post('/users', userData),
    getUser: (id) => api.get(`/users/${id}`),
}

// Organization API calls
export const orgApi = {
    createOrg: (orgData) => api.post('/organizations', orgData),
    getOrg: (id) => api.get(`/organizations/${id}`),
}

// Project API calls
export const projectApi = {
    createProject: (projectData) => api.post('/projects', projectData),
    getProjectsByOrg: (orgId) => api.get(`/projects/org/${orgId}`),
    getProjectDetails: (id) => api.get(`/projects/${id}`),
    getProjectStats: (id) => api.get(`/projects/${id}/stats`),
}

// Task API calls
export const taskApi = {
    createTask: (taskData) => api.post('/tasks', taskData),
    getTasksByProject: (projectId) => api.get(`/tasks/project/${projectId}`),
    getTasksAssignedToUser: (userId) => api.get(`/tasks/user/${userId}`),
    updateTaskStatus: (taskId, status) => api.patch(`/tasks/${taskId}/status`, { status }),
    getTaskWithComments: (taskId) => api.get(`/tasks/${taskId}`),
    searchTasks: (params) => api.get('/tasks/search', { params }),
}

// Comment API calls
export const commentApi = {
    addComment: (commentData) => api.post('/comments', commentData),
    getCommentsByTask: (taskId) => api.get(`/comments/task/${taskId}`),
}

export default {
    userApi,
    orgApi,
    projectApi,
    taskApi,
    commentApi,
} 