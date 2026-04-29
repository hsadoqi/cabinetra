/**
 * API Response Types
 * Shared types for API communication between frontend and backend
 */

export interface ApiResponse<T = unknown> {
  data: T
  status: 'success' | 'error'
  timestamp: string
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

export interface HealthResponse {
  status: 'ok'
  timestamp: string
}

// Add more type definitions as features are developed
