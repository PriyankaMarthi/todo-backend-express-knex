exports.up = function(knex) {
    return knex.schema.createTable('organizations', table => {
        table.increments('org_id').primary()
        table.string('name').notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('organizations')
} 