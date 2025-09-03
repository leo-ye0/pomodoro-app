<template>
  <div class="app-container" :class="currentTheme">
    <div class="theme-toggle">
      <button @click="toggleTheme" class="theme-toggle-btn">
        {{ currentTheme === 'light' ? '🌙' : '☀️' }}
      </button>
    </div>
    <div class="pomodoro-container">
      <PomodoroTimer />
    </div>
  </div>
</template>

<script>
import PomodoroTimer from './components/PomodoroTimer.vue'
import { themes } from './theme.js'

export default {
  name: 'App',
  components: {
    PomodoroTimer
  },
  /**
   * 组件数据
   * @returns {Object} 包含当前主题状态的数据对象
   */
  data() {
    return {
      // 当前主题模式：'light' 或 'dark'
      currentTheme: 'light'
    }
  },
  methods: {
    /**
     * 切换明暗主题
     * 在亮色和暗色主题之间切换，并应用相应的样式
     */
    toggleTheme() {
      // 切换主题模式
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
      // 设置根元素的主题属性，用于CSS选择器
      document.documentElement.setAttribute('data-theme', this.currentTheme)
      // 应用新主题的颜色方案
      this.applyTheme()
    },

    /**
     * 应用主题样式
     * 将当前主题的所有颜色和样式变量应用到根元素
     * 通过CSS变量实现动态主题切换
     */
    applyTheme() {
      const theme = themes[this.currentTheme]
      // 设置全局背景渐变
      document.documentElement.style.setProperty('--background', theme.background)
      // 设置容器背景色
      document.documentElement.style.setProperty('--container-bg', theme.containerBg)
      // 设置文本颜色
      document.documentElement.style.setProperty('--text-primary', theme.textPrimary)
      document.documentElement.style.setProperty('--text-secondary', theme.textSecondary)
      // 设置按钮颜色
      document.documentElement.style.setProperty('--button-primary', theme.buttonPrimary)
      document.documentElement.style.setProperty('--button-secondary', theme.buttonSecondary)
      document.documentElement.style.setProperty('--button-danger', theme.buttonDanger)
      document.documentElement.style.setProperty('--button-warning', theme.buttonWarning)
      // 设置强调色
      document.documentElement.style.setProperty('--accent', theme.accent)
      // 设置统计区域背景
      document.documentElement.style.setProperty('--stats-bg', theme.statsBg)
      // 设置任务相关背景色
      document.documentElement.style.setProperty('--task-bg', theme.taskBg)
      document.documentElement.style.setProperty('--task-item-bg', theme.taskItemBg)
      // 设置边框颜色
      document.documentElement.style.setProperty('--border-color', theme.borderColor)
      // 设置滚动条样式
      document.documentElement.style.setProperty('--scrollbar-track', theme.scrollbarTrack)
      document.documentElement.style.setProperty('--scrollbar-thumb', theme.scrollbarThumb)
      document.documentElement.style.setProperty('--scrollbar-thumb-hover', theme.scrollbarThumbHover)
      // 设置阴影效果
      document.documentElement.style.setProperty('--box-shadow', theme.boxShadow)
    }
  },
  mounted() {
    // Check if user has a preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    this.currentTheme = prefersDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', this.currentTheme)
    this.applyTheme()
  }
}
</script>