const { faker } = require('@faker-js/faker')

;('use strict')

const boiler1 = '/uploads/boilers/bolier-1.jpg'
const boiler2 = '/uploads/boilers/bolier-2.jpg'
const boiler3 = '/uploads/boilers/bolier-3.jpg'
const boiler4 = '/uploads/boilers/bolier-4.jpg'
const boiler5 = '/uploads/boilers/bolier-5.jpg'
const boiler6 = '/uploads/boilers/bolier-6.jpg'
const boiler7 = '/uploads/boilers/bolier-7.jpg'
const boiler8 = '/uploads/boilers/bolier-8.jpg'
const boiler9 = '/uploads/boilers/bolier-9.jpg'
const boiler10 = '/uploads/boilers/bolier-10.jpg'

const boiler11 = '/uploads/boilers/bolier-11.jpg'
const boiler12 = '/uploads/boilers/bolier-12.jpg'
const boiler13 = '/uploads/boilers/bolier-13.jpg'
const boiler14 = '/uploads/boilers/bolier-14.jpg'
const boiler15 = '/uploads/boilers/bolier-15.jpg'
const boiler16 = '/uploads/boilers/bolier-16.jpg'
const boiler17 = '/uploads/boilers/bolier-17.jpg'
const boiler18 = '/uploads/boilers/bolier-18.jpg'
const boiler19 = '/uploads/boilers/bolier-19.jpg'
const boiler20 = '/uploads/boilers/bolier-20.jpg'
const boiler21 = '/uploads/boilers/bolier-21.jpg'
const boiler22 = '/uploads/boilers/bolier-22.jpg'
const boiler23 = '/uploads/boilers/bolier-23.jpg'
const boiler24 = '/uploads/boilers/bolier-24.jpg'
const boiler25 = '/uploads/boilers/bolier-25.jpg'

const boilers = [
	boiler1,
	boiler2,
	boiler3,
	boiler4,
	boiler5,
	boiler6,
	boiler7,
	boiler8,
	boiler9,
	boiler10,
	boiler11,
	boiler12,
	boiler13,
	boiler14,
	boiler15,
	boiler16,
	boiler17,
	boiler18,
	boiler19,
	boiler20,
	boiler21,
	boiler22,
	boiler23,
	boiler24,
	boiler25
]

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
				images: boilers[Math.floor(Math.random() * boilers.length)],
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
