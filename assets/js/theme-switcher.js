// theme-switcher.js 完整代码
document.addEventListener('DOMContentLoaded', function() {
  // 1. 获取主题切换关键元素（确保与 HTML 中的 ID 一致）
  const themeSwitcherBtn = document.getElementById('themeSwitcherBtn');
  const themeOptions = document.getElementById('themeOptions');
  const body = document.body;

  // 检查元素是否存在（避免报错）
  if (!themeSwitcherBtn || !themeOptions) {
    console.warn('主题切换元素不存在');
    return;
  }

  // 2. 初始化：从 localStorage 读取保存的主题，没有则默认 light
  const savedTheme = localStorage.getItem('blogTheme') || 'light';
  applyTheme(savedTheme); // 应用保存的主题

  // 3. 点击切换按钮，显示/隐藏主题选项
  themeSwitcherBtn.addEventListener('click', function() {
    themeOptions.classList.toggle('hidden');
    // 点击按钮时更新按钮文字（显示当前主题）
    themeSwitcherBtn.textContent = `${getThemeName(savedTheme)} ▼`;
  });

  // 4. 点击主题选项，切换主题
  themeOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', function() {
      const newTheme = this.getAttribute('data-theme'); // 获取选中的主题（如 light-img）
      applyTheme(newTheme); // 应用新主题
      localStorage.setItem('blogTheme', newTheme); // 保存到本地存储
      themeOptions.classList.add('hidden'); // 隐藏选项面板
    });
  });

  // 5. 核心函数：应用主题（给 body 加对应的 theme-xxx 类）
  function applyTheme(themeName) {
    // 先移除所有主题类，避免冲突
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    // 添加当前主题类
    body.classList.add(`theme-${themeName}`);
    // 更新按钮文字（显示当前主题）
    themeSwitcherBtn.textContent = `${getThemeName(themeName)} ▼`;
    // 更新全局主题变量（方便其他脚本使用）
    savedTheme = themeName;
  }

  // 辅助函数：获取主题的中文名称（用于按钮显示）
  function getThemeName(themeName) {
    const themeMap = {
      'light': '普通浅色',
      'dark': '普通深色',
      'light-img': '带图浅色',
      'dark-img': '带图深色'
    };
    return themeMap[themeName] || '切换主题';
  }

  // 6. 点击页面其他地方，关闭主题选项面板
  document.addEventListener('click', function(e) {
    if (!themeSwitcherBtn.contains(e.target) && !themeOptions.contains(e.target)) {
      themeOptions.classList.add('hidden');
    }
  });
});
