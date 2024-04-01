'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('boiler_parts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			boiler_manufacturer: { type: Sequelize.STRING },
			price: { type: Sequelize.INTEGER },
			parts_manufacturer: { type: Sequelize.STRING },
			vendor_code: { type: Sequelize.STRING },
			description: { type: Sequelize.STRING(2048) },
			images: { type: Sequelize.STRING(2048) },
			bestsellers: { type: Sequelize.BOOLEAN },
			new: { type: Sequelize.BOOLEAN },
			in_stock: { type: Sequelize.INTEGER },
			popularity: { type: Sequelize.INTEGER },
			compatibility: { type: Sequelize.STRING(2048) },
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			update_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('boiler_parts')
	}
}
