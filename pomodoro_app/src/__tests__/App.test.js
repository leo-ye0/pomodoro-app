import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Mock the window.matchMedia
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    // 创建一个模拟的 document.documentElement
    document.documentElement.style.setProperty = vi.fn()
    document.documentElement.setAttribute = vi.fn()
    wrapper = mount(App)
  })

  it('初始化时应该设置为浅色主题', () => {
    expect(wrapper.vm.currentTheme).toBe('light')
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light')
  })

  it('点击主题切换按钮应该在明暗主题间切换', async () => {
    const themeButton = wrapper.find('.theme-toggle-btn')
    
    // 切换到暗色主题
    await themeButton.trigger('click')
    expect(wrapper.vm.currentTheme).toBe('dark')
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
    
    // 切换回浅色主题
    await themeButton.trigger('click')
    expect(wrapper.vm.currentTheme).toBe('light')
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light')
  })

  it('切换主题时应该更新所有CSS变量', async () => {
    const themeButton = wrapper.find('.theme-toggle-btn')
    await themeButton.trigger('click')
    
    // 验证是否设置了所有必要的CSS变量
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--background', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--container-bg', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--text-primary', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--text-secondary', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--button-primary', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--button-secondary', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--button-danger', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--button-warning', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--accent', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--stats-bg', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--task-bg', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--task-item-bg', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--border-color', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--scrollbar-track', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--scrollbar-thumb', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--scrollbar-thumb-hover', expect.any(String))
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--box-shadow', expect.any(String))
  })

  it('应该根据系统偏好设置初始主题', () => {
    // 模拟系统偏好为暗色主题
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    wrapper = mount(App)
    expect(wrapper.vm.currentTheme).toBe('dark')
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
  })
})