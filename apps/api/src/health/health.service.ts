import type { HealthResponse } from '@cabinetra/infrastructure-types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HealthService {
  check(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }
}
