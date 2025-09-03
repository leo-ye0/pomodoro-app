# Pomodoro Timer: A Vue.js-based Time Management Application

This Pomodoro Timer application helps users boost productivity through focused work sessions using the Pomodoro Technique. Built with Vue.js 3, it provides an intuitive interface for managing work intervals and breaks while tracking tasks and progress.

The application implements the classic Pomodoro Technique with customizable work sessions (25 minutes), short breaks (5 minutes), and long breaks (15 minutes). It features a clean, responsive interface with visual and audio notifications, task management capabilities, and session tracking. The task management system includes persistent storage, allowing users to maintain their task list across sessions.

## Repository Structure
```
.
├── index.html              # Entry point HTML file with basic document structure
├── package.json           # Project configuration and dependencies
├── src/                   # Source code directory
│   ├── App.vue           # Root Vue component
│   ├── __tests__/        # Test files directory
│   ├── components/       # Vue components directory
│   │   ├── PomodoroTimer.vue    # Main timer component with core functionality
│   │   └── TaskManager.vue      # Task management component with local storage
│   ├── main.js          # Application entry point and Vue initialization
│   ├── style.css        # Global styles and responsive design
│   └── theme.js         # Theme configuration
└── vite.config.js       # Vite build and development server configuration
```

## Usage Instructions
### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)
- Modern web browser with JavaScript enabled

### Installation and Development
```bash
# Clone the repository
git clone [repository-url]
cd pomodoro-app

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev

# Run tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Build for production
npm run build

# Preview production build
npm run preview
```

### Quick Start
1. Launch the application in your web browser
2. Select a mode:
   - Work (25 minutes)
   - Short Break (5 minutes)
   - Long Break (15 minutes)
3. Click "开始" to start the timer
4. Use the task manager below to track your activities

### More Detailed Examples
```javascript
// Adding a new task
1. Type your task in the input field
2. Press Enter or click "添加" to add the task
3. Check the checkbox to mark tasks as complete
4. Click "删除" to remove tasks

// Timer Controls
- Click "开始" to start the timer
- Click "暂停" to pause
- Click "重置" to reset the current session
```

### Troubleshooting
Common Issues:
1. Audio notifications not working
   - Check browser permissions for audio playback
   - Ensure notification.mp3 file is present in the public directory
   - Error message in console: "音频播放失败"

2. Task persistence issues
   - Clear browser cache and local storage
   - Verify browser local storage permissions
   - Check browser console for storage-related errors

Debug Mode:
```javascript
// Enable Vue.js devtools in browser
// Check browser console for component state
// Local storage inspection:
localStorage.getItem('tasks')
```

## Data Flow
The application manages time intervals and task states through Vue.js reactive system, with local storage persistence for tasks.

```ascii
[User Input] -> [Vue Components] -> [State Management]
      ↑               ↓                    ↓
   [UI Updates] <- [Timer Logic] <- [Local Storage]
```

Component Interactions:
1. PomodoroTimer manages timer state and mode selection
2. TaskManager handles task CRUD operations and persistence
3. Timer events trigger audio notifications and mode transitions
4. Local storage synchronizes task state across sessions
5. Vue reactive system ensures UI updates reflect state changes
6. Component communication happens through props and events
7. Timer logic handles automatic mode switching and session counting

## Testing
The application uses Vitest as the testing framework along with @vue/test-utils for component testing. Tests are located in the `src/__tests__` directory.

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage
The test suite covers:
- Component rendering and lifecycle
- Timer functionality and state management
- Task management operations
- Local storage integration
- User interactions and event handling
- Edge cases and error scenarios

For detailed coverage information, run the coverage report and check the generated report in the coverage directory.