import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

// export const getTypeOrmConfig = async (
// 	configServer: ConfigService
// ): Promise<TypeOrmModuleOptions> => ({
// 	type: 'postgres',
// 	host: configServer.get('POSTGRES_HOST'),
// 	database: configServer.get('POSTGRES_DATABASE'),
// 	username: configServer.get('POSTGRES_USER'),
// 	port: 5432,
// 	password: configServer.get('POSTGRES_PASSWORD'),
// 	autoLoadEntities: true,
// 	synchronize: true,
// 	ssl: true
// })

export const getTypeOrmConfig = async (
	configServer: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'shop-04-06',
	username: 'postgres',
	password: '12345',
	autoLoadEntities: true,
	synchronize: true
})
