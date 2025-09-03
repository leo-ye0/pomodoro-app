<template>
  <div>
    <!-- 模式选择器 -->
    <div class="mode-selector">
      <button 
        v-for="mode in modes" 
        :key="mode.key"
        :class="['mode-btn', { active: currentMode === mode.key }]"
        @click="switchMode(mode.key)"
      >
        {{ mode.name }}
      </button>
    </div>

    <!-- 计时器显示 -->
    <div class="timer-display">
      {{ formatTime(timeLeft) }}
    </div>

    <!-- 控制按钮 -->
    <div class="timer-controls">
      <button 
        :class="['control-btn', isRunning ? 'pause-btn' : 'start-btn']"
        @click="toggleTimer"
      >
        {{ isRunning ? '暂停' : '开始' }}
      </button>
      <button class="control-btn reset-btn" @click="resetTimer">
        重置
      </button>
    </div>

    <!-- 统计信息 -->
    <div class="stats">
      <div class="stat-item">
        <div class="stat-number">{{ completedPomodoros }}</div>
        <div class="stat-label">已完成番茄钟</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ currentSession }}</div>
        <div class="stat-label">当前轮次</div>
      </div>
    </div>

    <!-- 任务管理 -->
    <TaskManager />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import TaskManager from './TaskManager.vue'

export default {
  name: 'PomodoroTimer',
  components: {
    TaskManager
  },
  setup() {
    const modes = [
      { key: 'work', name: '工作', duration: 25 * 60 },
      { key: 'shortBreak', name: '短休息', duration: 5 * 60 },
      { key: 'longBreak', name: '长休息', duration: 15 * 60 }
    ]

    const currentMode = ref('work')
    const timeLeft = ref(25 * 60)
    const isRunning = ref(false)
    const completedPomodoros = ref(0)
    const currentSession = ref(1)
    const timer = ref(null)
    const audio = ref(null)

    // 初始化音频
    onMounted(() => {
      audio.value = new Audio('/notification.mp3')
      audio.value.preload = 'auto'
    })

    // 格式化时间显示
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // 切换模式
    const switchMode = (mode) => {
      if (isRunning.value) return
      currentMode.value = mode
      const selectedMode = modes.find(m => m.key === mode)
      timeLeft.value = selectedMode.duration
    }

    // 开始/暂停计时器
    const toggleTimer = () => {
      if (isRunning.value) {
        clearInterval(timer.value)
        isRunning.value = false
      } else {
        isRunning.value = true
        timer.value = setInterval(() => {
          if (timeLeft.value > 0) {
            timeLeft.value--
          } else {
            completeSession()
          }
        }, 1000)
      }
    }

    // 重置计时器
    const resetTimer = () => {
      clearInterval(timer.value)
      isRunning.value = false
      const selectedMode = modes.find(m => m.key === currentMode.value)
      timeLeft.value = selectedMode.duration
    }

    // 完成一个会话
    const completeSession = () => {
      clearInterval(timer.value)
      isRunning.value = false
      
      // 播放提示音
      if (audio.value) {
        audio.value.play().catch(e => console.log('音频播放失败:', e))
      }

      if (currentMode.value === 'work') {
        completedPomodoros.value++
        
        // 每4个番茄钟后进入长休息
        if (completedPomodoros.value % 4 === 0) {
          currentMode.value = 'longBreak'
          timeLeft.value = 15 * 60
          currentSession.value++
        } else {
          currentMode.value = 'shortBreak'
          timeLeft.value = 5 * 60
        }
      } else {
        // 休息结束，回到工作模式
        currentMode.value = 'work'
        timeLeft.value = 25 * 60
      }

      // 自动开始下一个会话
      setTimeout(() => {
        toggleTimer()
      }, 1000)
    }

    // 清理定时器
    onUnmounted(() => {
      if (timer.value) {
        clearInterval(timer.value)
      }
    })

    return {
      modes,
      currentMode,
      timeLeft,
      isRunning,
      completedPomodoros,
      currentSession,
      formatTime,
      switchMode,
      toggleTimer,
      resetTimer
    }
  }
}
</script>