const { faker } = require('@faker-js/faker')

;('use strict')

const boilerPartsData = [
	'Ariston',
	'Baxi',
	'Buderus',
	'Henry',
	'Strategies',
	'Saunier Duval',
	'Bongioanni',
	'Chaffoteaux&Maury',
	'Nortwest'
]
const manufacturersPartsData = [
	'Azure',
	'Gloves',
	'Cambrigdeshire',
	'Salmon',
	'Montana',
	'Sensor',
	'Lesly',
	'Radian',
	'Gasoline',
	'Croatia'
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'boiler_parts',
			[...Array(100)].map(() => ({
				boiler_manufacturer:
					boilerPartsData[Math.floor(Math.random() * boilerPartsData.length)],
				parts_manufacturer:
					manufacturersPartsData[
						Math.floor(Math.random() * manufacturersPartsData.length)
					],
				price: faker.number.int({ min: 1000, max: 40000 }),
				name: faker.lorem.sentence(2),
				description: faker.lorem.paragraph(),
				images: faker.image.urlLoremFlickr({ category: 'business' }),
				vendor_code: faker.internet.password(),
				in_stock: faker.number.int({ max: 100 }),
				bestsellers: faker.datatype.boolean(),
				new: faker.datatype.boolean(),
				popularity: faker.number.int({ max: 40 }),
				compatibility: faker.lorem.sentence(7),
				created_at: new Date(),
				update_at: new Date()
			}))
		)
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('boiler_parts', null), {}
	}
}
