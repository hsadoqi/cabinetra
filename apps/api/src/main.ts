import 'reflect-metadata'

import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS for local development
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CORS_ORIGIN || 'http://localhost:8080'
      : ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true,
  })

  const port = parseInt(process.env.PORT || '5000', 10)
  
  await app.listen(port)
  console.log(`✓ API server running on http://localhost:${port}`)
}

bootstrap().catch((err) => {
  console.error('Failed to start API server:', err)
  process.exit(1)
})
