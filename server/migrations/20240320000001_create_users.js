exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('username').notNullable().unique()
        table.string('email').notNullable().unique()
        table.string('role').notNullable().defaultTo('user')
        table.timestamps(true, true) // Adds created_at and updated_at
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users')
} 