const knex = require('./connection')

// User Queries
const userQueries = {
    createUser: (userData) => {
        return knex('users').insert(userData).returning('*')
    },
    
    getUserById: (id) => {
        return knex('users').where('id', id).first()
    },
    
    updateUser: (id, updates) => {
        return knex('users')
            .where('id', id)
            .update(updates)
            .returning('*')
    }
}

// Organization Queries
const orgQueries = {
    createOrg: (orgData) => {
        return knex('organizations').insert(orgData).returning('*')
    },
    
    getOrgById: (orgId) => {
        return knex('organizations').where('org_id', orgId).first()
    }
}

// Project Queries
const projectQueries = {
    createProject: (projectData) => {
        return knex('projects').insert(projectData).returning('*')
    },
    
    getProjectsByOrg: (orgId) => {
        return knex('projects').where('org_id', orgId)
    },
    
    getProjectDetails: (projectId) => {
        return knex('projects')
            .where('project_id', projectId)
            .first()
            .then(project => {
                return knex('tasks')
                    .where('project_id', projectId)
                    .then(tasks => ({
                        ...project,
                        tasks
                    }))
            })
    }
}

// Task Queries
const taskQueries = {
    createTask: (taskData) => {
        return knex('tasks').insert(taskData).returning('*')
    },
    
    getTasksByProject: (projectId) => {
        return knex('tasks')
            .where('project_id', projectId)
            .orderBy('priority', 'desc')
    },
    
    getTasksAssignedToUser: (userId) => {
        return knex('tasks')
            .where('assigned_to', userId)
            .where('status', 'active')
            .orderBy('priority', 'desc')
    },
    
    updateTaskStatus: (taskId, status) => {
        return knex('tasks')
            .where('id', taskId)
            .update({ status })
            .returning('*')
    },
    
    getTaskWithComments: (taskId) => {
        return knex('tasks')
            .where('tasks.id', taskId)
            .first()
            .then(task => {
                return knex('comments')
                    .where('task_id', taskId)
                    .orderBy('created_at', 'desc')
                    .then(comments => ({
                        ...task,
                        comments
                    }))
            })
    }
}

// Comment Queries
const commentQueries = {
    addComment: (commentData) => {
        return knex('comments').insert(commentData).returning('*')
    },
    
    getCommentsByTask: (taskId) => {
        return knex('comments')
            .where('task_id', taskId)
            .orderBy('created_at', 'desc')
    }
}

// Advanced Queries
const advancedQueries = {
    getProjectStats: (projectId) => {
        return knex('tasks')
            .where('project_id', projectId)
            .select(
                knex.raw('COUNT(*) as total_tasks'),
                knex.raw('COUNT(CASE WHEN status = \'completed\' THEN 1 END) as completed_tasks'),
                knex.raw('COUNT(CASE WHEN status = \'active\' THEN 1 END) as active_tasks')
            )
            .first()
    },
    
    searchTasks: (searchParams) => {
        return knex('tasks')
            .join('users', 'tasks.assigned_to', 'users.id')
            .join('projects', 'tasks.project_id', 'projects.project_id')
            .where(builder => {
                if (searchParams.status) builder.where('tasks.status', searchParams.status)
                if (searchParams.priority) builder.where('tasks.priority', searchParams.priority)
                if (searchParams.orgId) builder.where('tasks.org_id', searchParams.orgId)
                if (searchParams.searchTerm) {
                    builder.where('tasks.description', 'ilike', `%${searchParams.searchTerm}%`)
                }
            })
            .select(
                'tasks.*',
                'users.username as assigned_to_user',
                'projects.project_name'
            )
    }
}

module.exports = {
    ...userQueries,
    ...orgQueries,
    ...projectQueries,
    ...taskQueries,
    ...commentQueries,
    ...advancedQueries
} 