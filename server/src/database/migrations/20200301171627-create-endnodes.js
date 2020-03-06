module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('endnodes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      gateway_id: {
        type: Sequelize.UUID,
        references: { model: 'gateways', key: 'id' },
        onUpdate: 'CASCADE',
        onDelate: 'CASCADE',
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('endnodes');
  },
};
