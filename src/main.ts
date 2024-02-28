import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://shop-mdk7.onrender.com',
			'https://online-shop-client-37335w3eq-sergei-jr25.vercel.app'
		]
	})

	app.setGlobalPrefix('api')
	await app.listen(5000)
}
bootstrap()
