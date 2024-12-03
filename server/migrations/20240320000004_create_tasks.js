exports.up = function(knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary()
        table.string('status').notNullable().defaultTo('active')
        table.integer('priority').notNullable()
        table.integer('assigned_to').unsigned()
        table.integer('project_id').unsigned().notNullable()
        table.integer('org_id').unsigned().notNullable()
        table.text('description')
        table.timestamps(true, true)

        // Foreign keys
        table.foreign('assigned_to').references('id').inTable('users')
        table.foreign('project_id').references('project_id').inTable('projects')
        table.foreign('org_id').references('org_id').inTable('organizations')

        // Indexes
        table.index('assigned_to')
        table.index('project_id')
        table.index('org_id')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('tasks')
} 