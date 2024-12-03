exports.up = function(knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('comment_id').primary()
        table.text('contents').notNullable()
        table.integer('task_id').unsigned().notNullable()
        table.foreign('task_id').references('id').inTable('tasks')
        table.timestamps(true, true)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('comments')
} 