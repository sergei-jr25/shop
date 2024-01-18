import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configServer: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'dpg-cm2n5mmn7f5s73ehf1rg-a',
	port: 5432,
	database: 'shoppst',
	username: 'sergeijr',
	password: 'drisHCFJRKji0xh1phGg7ve64UGEbyfz',
	autoLoadEntities: true,
	synchronize: true
})
