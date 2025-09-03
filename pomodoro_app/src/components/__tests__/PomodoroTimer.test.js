import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PomodoroTimer from '../PomodoroTimer.vue'

// Mock the Audio API
global.Audio = class {
  constructor() {
    this.preload = ''
  }
  play() {
    return Promise.resolve()
  }
}

describe('PomodoroTimer', () => {
  let wrapper

  beforeEach(() => {
    // Reset timers before each test
    vi.useFakeTimers()
    wrapper = mount(PomodoroTimer)
  })

  it('初始化时应该显示工作模式的25分钟', () => {
    expect(wrapper.vm.timeLeft).toBe(25 * 60)
    expect(wrapper.vm.currentMode).toBe('work')
    expect(wrapper.find('.timer-display').text()).toBe('25:00')
  })

  it('点击开始按钮应该启动计时器', async () => {
    const startButton = wrapper.find('.control-btn')
    await startButton.trigger('click')
    
    expect(wrapper.vm.isRunning).toBe(true)
    
    // 模拟1秒后
    vi.advanceTimersByTime(1000)
    expect(wrapper.vm.timeLeft).toBe(25 * 60 - 1)
  })

  it('点击暂停按钮应该停止计时器', async () => {
    // 先开始计时
    const button = wrapper.find('.control-btn')
    await button.trigger('click')
    
    // 等待1秒
    vi.advanceTimersByTime(1000)
    const initialTime = wrapper.vm.timeLeft
    
    // 暂停计时器
    await button.trigger('click')
    expect(wrapper.vm.isRunning).toBe(false)
    
    // 再等待1秒，确认时间没有继续减少
    vi.advanceTimersByTime(1000)
    expect(wrapper.vm.timeLeft).toBe(initialTime)
  })

  it('点击重置按钮应该重置计时器', async () => {
    // 先开始计时并等待一段时间
    await wrapper.find('.start-btn').trigger('click')
    vi.advanceTimersByTime(5000)
    
    // 点击重置按钮
    const resetButton = wrapper.find('.reset-btn')
    await resetButton.trigger('click')
    
    expect(wrapper.vm.timeLeft).toBe(25 * 60)
    expect(wrapper.vm.isRunning).toBe(false)
  })

  it('工作时间结束后应该自动切换到休息模式', async () => {
    await wrapper.find('.start-btn').trigger('click')
    
    // 快进到工作时间结束
    vi.advanceTimersByTime(25 * 60 * 1000)
    
    // 等待自动切换的延时
    vi.advanceTimersByTime(1000)
    
    expect(wrapper.vm.currentMode).toBe('shortBreak')
    expect(wrapper.vm.timeLeft).toBe(5 * 60)
    expect(wrapper.vm.completedPomodoros).toBe(1)
  })

  it('完成4个番茄钟后应该进入长休息模式', async () => {
    // 模拟完成3个番茄钟
    for (let i = 0; i < 3; i++) {
      wrapper.vm.completedPomodoros = i
      await wrapper.find('.start-btn').trigger('click')
      vi.advanceTimersByTime(25 * 60 * 1000)
      vi.advanceTimersByTime(5 * 60 * 1000) // 短休息时间
    }
    
    // 完成第4个番茄钟
    await wrapper.find('.start-btn').trigger('click')
    vi.advanceTimersByTime(25 * 60 * 1000)
    vi.advanceTimersByTime(1000) // 等待自动切换延时
    
    expect(wrapper.vm.currentMode).toBe('longBreak')
    expect(wrapper.vm.timeLeft).toBe(15 * 60)
    expect(wrapper.vm.completedPomodoros).toBe(4)
  })

  it('切换模式时应该正确更新时间', async () => {
    // 确保计时器没有运行
    expect(wrapper.vm.isRunning).toBe(false)
    
    // 切换到短休息模式
    const shortBreakButton = wrapper.find('button:nth-child(2)')
    await shortBreakButton.trigger('click')
    
    expect(wrapper.vm.currentMode).toBe('shortBreak')
    expect(wrapper.vm.timeLeft).toBe(5 * 60)
    
    // 切换到长休息模式
    const longBreakButton = wrapper.find('button:nth-child(3)')
    await longBreakButton.trigger('click')
    
    expect(wrapper.vm.currentMode).toBe('longBreak')
    expect(wrapper.vm.timeLeft).toBe(15 * 60)
  })

  it('运行时不应该允许切换模式', async () => {
    // 开始计时
    await wrapper.find('.start-btn').trigger('click')
    const initialMode = wrapper.vm.currentMode
    const initialTime = wrapper.vm.timeLeft
    
    // 尝试切换模式
    const shortBreakButton = wrapper.find('button:nth-child(2)')
    await shortBreakButton.trigger('click')
    
    // 验证模式和时间没有改变
    expect(wrapper.vm.currentMode).toBe(initialMode)
    expect(wrapper.vm.timeLeft).toBe(initialTime)
  })
})