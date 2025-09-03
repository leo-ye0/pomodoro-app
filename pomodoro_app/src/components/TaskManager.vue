<template>
  <div class="task-section">
    <h3 style="margin-bottom: 20px; color: #333;">任务列表</h3>
    
    <!-- 添加任务 -->
    <div class="task-input">
      <input 
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="输入新任务..."
        type="text"
      />
      <select v-model="newTaskPriority" class="priority-select">
        <option value="high">高优先级</option>
        <option value="medium">中优先级</option>
        <option value="low">低优先级</option>
      </select>
      <select v-model="newTaskCategory" class="category-select">
        <option value="">选择分类</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
      <button class="add-btn" @click="addTask">添加</button>
    </div>

    <!-- 筛选器 -->
    <div class="filters">
      <select v-model="priorityFilter" class="filter-select">
        <option value="">全部优先级</option>
        <option value="high">高优先级</option>
        <option value="medium">中优先级</option>
        <option value="low">低优先级</option>
      </select>
      <select v-model="categoryFilter" class="filter-select">
        <option value="">全部分类</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        :class="['task-item', { completed: task.completed }, `priority-${task.priority}`]"
      >
        <input 
          type="checkbox"
          class="task-checkbox"
          v-model="task.completed"
        />
        <div class="task-content">
          <span class="task-text">{{ task.text }}</span>
          <span v-if="task.category" class="category-tag">{{ task.category }}</span>
        </div>
        <button class="delete-btn" @click="deleteTask(task.id)">删除</button>
      </div>
      
      <div v-if="filteredTasks.length === 0" style="text-align: center; color: #999; padding: 20px;">
        暂无任务
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'TaskManager',
  setup() {
    /**
     * 任务列表状态管理
     */
    const tasks = ref([])           // 存储所有任务的数组
    const newTask = ref('')         // 新任务的输入内容
    const newTaskPriority = ref('medium')  // 新任务的优先级
    const newTaskCategory = ref('')  // 新任务的分类
    const priorityFilter = ref('')   // 优先级筛选条件
    const categoryFilter = ref('')   // 分类筛选条件

    /**
     * 预定义的任务分类列表
     * 用于任务分类的下拉选择
     */
    const categories = [
      '工作',
      '学习',
      '生活',
      '健康',
      '其他'
    ]

    /**
     * 组件挂载时从本地存储加载任务数据
     * 确保页面刷新后任务数据不会丢失
     */
    onMounted(() => {
      const savedTasks = localStorage.getItem('pomodoro-tasks')
      if (savedTasks) {
        tasks.value = JSON.parse(savedTasks)
      }
    })

    /**
     * 将任务数据保存到本地存储
     * 在任务数据发生变化时调用
     */
    const saveTasks = () => {
      localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks.value))
    }

    /**
     * 添加新任务
     * 创建包含文本、优先级和分类的任务对象
     * 添加到任务列表并保存到本地存储
     */
    const addTask = () => {
      if (newTask.value.trim()) {
        tasks.value.push({
          id: Date.now(),  // 使用时间戳作为唯一ID
          text: newTask.value.trim(),
          completed: false,
          priority: newTaskPriority.value,
          category: newTaskCategory.value
        })
        // 重置输入字段
        newTask.value = ''
        newTaskPriority.value = 'medium'
        newTaskCategory.value = ''
        // 保存更新后的任务列表
        saveTasks()
      }
    }

    /**
     * 删除指定任务
     * @param {number} id - 要删除的任务ID
     */
    const deleteTask = (id) => {
      tasks.value = tasks.value.filter(task => task.id !== id)
      saveTasks()
    }

    /**
     * 切换任务完成状态
     * @param {number} id - 要切换状态的任务ID
     */
    const toggleTask = (id) => {
      const task = tasks.value.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        saveTasks()
      }
    }

    /**
     * 过滤任务列表
     * 根据当前选择的优先级和分类筛选条件
     * 返回符合条件的任务列表
     */
    const filteredTasks = computed(() => {
      return tasks.value.filter(task => {
        const matchesPriority = !priorityFilter.value || task.priority === priorityFilter.value
        const matchesCategory = !categoryFilter.value || task.category === categoryFilter.value
        return matchesPriority && matchesCategory
      })
    })

    return {
      tasks,
      newTask,
      newTaskPriority,
      newTaskCategory,
      priorityFilter,
      categoryFilter,
      categories,
      filteredTasks,
      addTask,
      deleteTask,
      toggleTask
    }
  }
}
</script>

<style scoped>
.task-section {
  margin-top: 30px;
  text-align: left;
}

.task-input {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  align-items: center;
  flex-wrap: nowrap;
}

.task-input input {
  flex: 3;
  min-width: 250px;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 16px;
  background-color: var(--container-bg);
  color: var(--text-primary);
}

.priority-select,
.category-select {
  flex: 1;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  background-color: var(--container-bg);
  color: var(--text-primary);
  font-size: 14px;
  min-width: 120px;
  white-space: nowrap;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--container-bg);
  color: var(--text-primary);
  font-size: 14px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: var(--task-item-bg);
  border-radius: 10px;
  margin-bottom: 8px;
  box-shadow: var(--box-shadow);
  border-left: 4px solid var(--border-color);
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.task-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-1px);
}

/* Priority colors */
.task-item.priority-high {
  border-left-color: #ff4d4f;
}

.task-item.priority-medium {
  border-left-color: #faad14;
}

.task-item.priority-low {
  border-left-color: #52c41a;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

.task-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-text {
  flex: 1;
  font-size: 16px;
}

.category-tag {
  padding: 4px 8px;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 12px;
  font-size: 12px;
  white-space: nowrap;
}

.completed .task-text {
  text-decoration: line-through;
  color: #999;
}

.completed {
  opacity: 0.6;
}

.add-btn {
  padding: 12px 24px;
  background: var(--button-primary);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  white-space: nowrap;
  min-width: 80px;
}

.add-btn:hover {
  background: #45b7aa;
  transform: translateY(-1px);
}

.delete-btn {
  background: var(--button-danger);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.delete-btn:hover {
  background: #e53935;
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .task-input input {
    min-width: 200px;
  }
  
  .priority-select,
  .category-select {
    min-width: 100px;
  }
  
  .task-input {
    margin-bottom: 12px;
  }
  
  .filters {
    margin-bottom: 12px;
  }
}

@media (max-width: 480px) {
  .task-input {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;
  }
  
  .task-input input,
  .priority-select,
  .category-select,
  .add-btn {
    min-width: auto;
    width: 100%;
  }
  
  .filters {
    flex-direction: column;
    margin-bottom: 10px;
  }
  
  .task-item {
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px;
    margin-bottom: 6px;
  }
  
  .task-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>