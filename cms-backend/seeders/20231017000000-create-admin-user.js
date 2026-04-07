'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if users already exist
    const existingUsers = await queryInterface.sequelize.query(
      "SELECT email FROM users WHERE email IN ('admin@myaibo.in', 'editor@myaibo.in')",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingUsers && existingUsers.length > 0) {
      console.log('Admin and editor users already exist, skipping seeder');
      return;
    }

    // Hash password manually since we're using bulkInsert (bypasses model hooks)
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'admin@myaibo.in',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'editor@myaibo.in',
        password: hashedPassword,
        first_name: 'Content',
        last_name: 'Editor',
        role: 'editor',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@myaibo.in', 'editor@myaibo.in']
    }, {});
  }
};
