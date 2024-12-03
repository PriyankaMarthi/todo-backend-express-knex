const express = require('express')
const router = express.Router()
const queries = require('./database/db-queries')

// User routes
router.post('/users', async (req, res, next) => {
    try {
        const user = await queries.createUser(req.body)
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
})

router.get('/users/:id', async (req, res, next) => {
    try {
        const user = await queries.getUserById(req.params.id)
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json(user)
    } catch (err) {
        next(err)
    }
})

// Organization routes
router.post('/organizations', async (req, res, next) => {
    try {
        const org = await queries.createOrg(req.body)
        res.status(201).json(org)
    } catch (err) {
        next(err)
    }
})

router.get('/organizations/:id', async (req, res, next) => {
    try {
        const org = await queries.getOrgById(req.params.id)
        if (!org) return res.status(404).json({ error: 'Organization not found' })
        res.json(org)
    } catch (err) {
        next(err)
    }
})

// Project routes
router.post('/projects', async (req, res, next) => {
    try {
        const project = await queries.createProject(req.body)
        res.status(201).json(project)
    } catch (err) {
        next(err)
    }
})

router.get('/projects/org/:orgId', async (req, res, next) => {
    try {
        const projects = await queries.getProjectsByOrg(req.params.orgId)
        res.json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/projects/:id', async (req, res, next) => {
    try {
        const project = await queries.getProjectDetails(req.params.id)
        if (!project) return res.status(404).json({ error: 'Project not found' })
        res.json(project)
    } catch (err) {
        next(err)
    }
})

// Task routes
router.post('/tasks', async (req, res, next) => {
    try {
        const task = await queries.createTask(req.body)
        res.status(201).json(task)
    } catch (err) {
        next(err)
    }
})

router.get('/tasks/project/:projectId', async (req, res, next) => {
    try {
        const tasks = await queries.getTasksByProject(req.params.projectId)
        res.json(tasks)
    } catch (err) {
        next(err)
    }
})

router.get('/tasks/user/:userId', async (req, res, next) => {
    try {
        const tasks = await queries.getTasksAssignedToUser(req.params.userId)
        res.json(tasks)
    } catch (err) {
        next(err)
    }
})

router.patch('/tasks/:id/status', async (req, res, next) => {
    try {
        const task = await queries.updateTaskStatus(req.params.id, req.body.status)
        if (!task) return res.status(404).json({ error: 'Task not found' })
        res.json(task)
    } catch (err) {
        next(err)
    }
})

router.get('/tasks/:id', async (req, res, next) => {
    try {
        const task = await queries.getTaskWithComments(req.params.id)
        if (!task) return res.status(404).json({ error: 'Task not found' })
        res.json(task)
    } catch (err) {
        next(err)
    }
})

// Comment routes
router.post('/comments', async (req, res, next) => {
    try {
        const comment = await queries.addComment(req.body)
        res.status(201).json(comment)
    } catch (err) {
        next(err)
    }
})

router.get('/comments/task/:taskId', async (req, res, next) => {
    try {
        const comments = await queries.getCommentsByTask(req.params.taskId)
        res.json(comments)
    } catch (err) {
        next(err)
    }
})

// Advanced routes
router.get('/projects/:id/stats', async (req, res, next) => {
    try {
        const stats = await queries.getProjectStats(req.params.id)
        res.json(stats)
    } catch (err) {
        next(err)
    }
})

router.get('/tasks/search', async (req, res, next) => {
    try {
        const tasks = await queries.searchTasks(req.query)
        res.json(tasks)
    } catch (err) {
        next(err)
    }
})

module.exports = router
