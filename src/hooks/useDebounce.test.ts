import { act, renderHook } from '@testing-library/react'

import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('chỉ cập nhật giá trị sau khi hết thời gian chờ', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'clean' },
    })

    rerender({ value: 'clean code' })
    act(() => jest.advanceTimersByTime(299))
    expect(result.current).toBe('clean')

    act(() => jest.advanceTimersByTime(1))
    expect(result.current).toBe('clean code')
  })
})
