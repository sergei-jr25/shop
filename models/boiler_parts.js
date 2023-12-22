'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class boiler_parts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	boiler_parts.init(
		{
			name: DataTypes.STRING,
			boiler_manufacturer: DataTypes.STRING,
			price: DataTypes.INTEGER,
			parts_manufacturer: DataTypes.STRING,
			vendorCode: DataTypes.STRING,
			description: DataTypes.STRING,
			images: DataTypes.STRING,
			bestsellers: DataTypes.BOOLEAN,
			new: DataTypes.BOOLEAN,
			in_stock: DataTypes.BOOLEAN,
			popularity: DataTypes.INTEGER,
			compatibility: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'boiler_parts'
		}
	)
	return boiler_parts
}
