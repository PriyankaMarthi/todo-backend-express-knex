/* 
  Update with your config settings.
  The test database and development database are by default the same.
  Knex also allows for easy switching between databases. 
  But the .returning() method will only work for PostgreSQL, MSSQL, and Oracle databases.
*/
require('dotenv').config();
const { Client } = require('pg')

const createDatabaseIfNotExists = async (config) => {
    const dbName = config.connection.database
    
    // Temporarily connect to 'postgres' database to check/create our database
    const tmpConfig = {
        host: config.connection.host,
        port: config.connection.port,
        user: config.connection.user,
        password: config.connection.password,
        database: 'postgres' // Connect to default postgres database
    }

    const client = new Client(tmpConfig)

    try {
        await client.connect()
        
        // Check if database exists
        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname='${dbName}'`
        )

        if (result.rows.length === 0) {
            // Database doesn't exist, create it
            await client.query(`CREATE DATABASE ${dbName}`)
            console.log(`Database ${dbName} created successfully`)
        } else {
            console.log(`Database ${dbName} already exists`)
        }

    } catch (err) {
        console.error('Error creating database:', err)
        throw err
    } finally {
        await client.end()
    }
}

const baseConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || 'task_management_db',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: './migrations',
        tableName: 'knex_migrations'
    }
}

// Create a setup script
const setupDatabase = async () => {
    try {
        await createDatabaseIfNotExists(baseConfig)
        console.log('Database setup completed')
    } catch (err) {
        console.error('Database setup failed:', err)
        process.exit(1)
    }
}

module.exports = {
    development: baseConfig,
    production: {
        ...baseConfig,
        pool: {
            min: 2,
            max: 20
        }
    },
    setupDatabase
}

