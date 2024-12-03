const { setupDatabase } = require('./knexfile')
const knex = require('./database/connection')

const setup = async () => {
    try {
        // Create database if it doesn't exist
        await setupDatabase()

        // Run migrations
        await knex.migrate.latest()
        console.log('Migrations completed successfully')

        // Optional: Run seeds if you have any
        // await knex.seed.run()
        // console.log('Seeds completed successfully')

    } catch (error) {
        console.error('Setup failed:', error)
        process.exit(1)
    } finally {
        await knex.destroy()
    }
}

// Run setup if this file is run directly
if (require.main === module) {
    setup()
        .then(() => {
            console.log('Setup completed successfully')
            process.exit(0)
        })
        .catch(err => {
            console.error('Setup failed:', err)
            process.exit(1)
        })
}

module.exports = setup 