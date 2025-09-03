/**
 * 主题配置对象
 * 定义了应用的亮色和暗色主题的所有颜色变量
 */
export const themes = {
  // 亮色主题配置
  light: {
    // 全局背景渐变色
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    // 容器背景色
    containerBg: '#ffffff',
    // 主要和次要文本颜色
    textPrimary: '#333333',
    textSecondary: '#666666',
    // 按钮颜色系列
    buttonPrimary: '#4ecdc4',
    buttonSecondary: '#f0f0f0',
    buttonDanger: '#ef5350',
    buttonWarning: '#ffa726',
    // 强调色
    accent: '#ff6b6b',
    // 统计区域背景色
    statsBg: '#f8f9fa',
    // 任务区域背景色
    taskBg: '#f8f9fa',
    taskItemBg: '#ffffff',
    // 边框颜色
    borderColor: '#e0e0e0',
    // 滚动条样式
    scrollbarTrack: '#f1f1f1',
    scrollbarThumb: '#c1c1c1',
    scrollbarThumbHover: '#a8a8a8',
    // 阴影效果
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  },
  // 暗色主题配置
  dark: {
    // 全局背景渐变色
    background: 'linear-gradient(135deg, #1a1c2c 0%, #2d1f3d 100%)',
    // 容器背景色
    containerBg: '#2d2d2d',
    // 主要和次要文本颜色
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    // 按钮颜色系列
    buttonPrimary: '#4ecdc4',
    buttonSecondary: '#404040',
    buttonDanger: '#ef5350',
    buttonWarning: '#ffa726',
    // 强调色
    accent: '#ff6b6b',
    // 统计区域背景色
    statsBg: '#363636',
    // 任务区域背景色
    taskBg: '#363636',
    taskItemBg: '#2d2d2d',
    // 边框颜色
    borderColor: '#404040',
    // 滚动条样式
    scrollbarTrack: '#2d2d2d',
    scrollbarThumb: '#505050',
    scrollbarThumbHover: '#606060',
    // 阴影效果
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  }
}