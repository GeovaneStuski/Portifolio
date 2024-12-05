/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  // Users Table
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username', 60).unique().notNullable();
    table.string('password', 60).notNullable();
  });

  // Technologies Table
  await knex.schema.createTable('technologies', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name', 60).notNullable();
  });

  // Projects Table
  await knex.schema.createTable('projects', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('imagepath').notNullable();
    table.string('title').notNullable();
    table.string('repositorylink').notNullable();
    table.string('description');
  });

  // Project Technologies Table
  await knex.schema.createTable('project_technologies', (table) => {
    table.uuid('project_id').notNullable();
    table.uuid('technology_id').notNullable();
    table.foreign('project_id').references('projects.id').onDelete('CASCADE');
    table.foreign('technology_id').references('technologies.id').onDelete('CASCADE');
    table.primary(['project_id', 'technology_id']);
  });

  // Personal Information Table
  await knex.schema.createTable('personal_information', (table) => {
    table.string('email').notNullable().defaultTo('geovanestuski2@gmail.com');
    table.string('phone').notNullable().defaultTo('42988698179');
    table.string('linkedin').notNullable().defaultTo('https://www.linkedin.com/in/geovanestuski');
    table.string('github').notNullable().defaultTo('https://github.com/GeovaneStuski');
    table.string('about_text');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('personal_information');
  await knex.schema.dropTableIfExists('project_technologies');
  await knex.schema.dropTableIfExists('projects');
  await knex.schema.dropTableIfExists('technologies');
  await knex.schema.dropTableIfExists('users');
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
