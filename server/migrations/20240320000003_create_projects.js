exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('project_id').primary()
        table.string('project_name').notNullable()
        table.integer('org_id').unsigned().notNullable()
        table.foreign('org_id').references('org_id').inTable('organizations')
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('projects')
} 