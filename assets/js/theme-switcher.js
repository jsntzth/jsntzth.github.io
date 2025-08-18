document.addEventListener('DOMContentLoaded', function() {
  // 获取元素（确保与HTML中的ID一致）
  const switcherContainer = document.querySelector('.theme-switcher-container');
  const switcherBtn = document.querySelector('.theme-switcher-btn');
  const themeOptions = document.querySelectorAll('.theme-options li');
  const body = document.body;

  // 检查元素是否存在（避免报错）
  if (!switcherContainer || !switcherBtn || themeOptions.length === 0) {
    console.error('主题切换元素未找到，请检查HTML结构');
    return;
  }

  // 初始化：默认使用浅色主题
  let currentTheme = localStorage.getItem('blogTheme') || 'light';
  applyTheme(currentTheme);

  // 点击按钮显示/隐藏选项
  switcherBtn.addEventListener('click', function(e) {
    e.stopPropagation();  // 阻止事件冒泡
    switcherContainer.classList.toggle('active');
  });

  // 点击选项切换主题
  themeOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      const newTheme = this.getAttribute('data-theme');
      if (newTheme) {
        currentTheme = newTheme;
        applyTheme(currentTheme);
        localStorage.setItem('blogTheme', currentTheme);
        switcherContainer.classList.remove('active');
      }
    });
  });

  // 点击页面其他地方关闭选项
  document.addEventListener('click', function() {
    switcherContainer.classList.remove('active');
  });

  // 应用主题的核心函数
  function applyTheme(theme) {
    // 移除所有主题类
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    // 添加当前主题类
    body.classList.add(`theme-${theme}`);
    // 更新按钮文字
    switcherBtn.textContent = {
      'light': '普通浅色 ▼',
      'dark': '普通深色 ▼',
      'light-img': '带图浅色 ▼',
      'dark-img': '带图深色 ▼'
    }[theme] || '切换主题 ▼';
  }
});
