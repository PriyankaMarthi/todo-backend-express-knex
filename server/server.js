const express = require('express')
const configureServer = require('./server-config')
const routes = require('./server-routes')

const app = express()

// Configure server middleware
configureServer(app)

// Apply routes
app.use('/api', routes)

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Task Management API',
        version: '1.0.0'
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource does not exist'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app