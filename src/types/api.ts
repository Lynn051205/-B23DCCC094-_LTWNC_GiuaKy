export interface ApiSuccess<T> {
  ok: true
  data: T
}

export interface ApiFailure {
  ok: false
  error: string
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure

/** Type guard: thu hẹp ApiResult<T> về nhánh thành công */
export function isApiSuccess<T>(result: ApiResult<T>): result is ApiSuccess<T> {
  return result.ok
}
