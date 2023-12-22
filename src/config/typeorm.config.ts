import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configServer: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: configServer.get('HOST'),
	port: configServer.get('PORT'),
	database: configServer.get('DATABASE'),
	username: configServer.get('USERNAME2'),
	password: configServer.get('PASSWORD'),
	autoLoadEntities: true,
	synchronize: true
})
