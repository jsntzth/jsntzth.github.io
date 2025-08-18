// 等待页面完全加载，避免元素未渲染导致失效
window.addEventListener('load', function() {
  // 获取关键元素（与HTML类名对应）
  const switcherContainer = document.querySelector('.theme-switcher-container');
  const switcherBtn = document.querySelector('.theme-switcher-btn');
  const themeOptions = document.querySelector('.theme-options');
  const themeItems = document.querySelectorAll('.theme-options li');
  const body = document.body;

  // 检查元素是否存在（避免报错）
  if (!switcherContainer || !switcherBtn || !themeOptions || themeItems.length === 0) {
    console.error('主题切换元素缺失，请检查header.html');
    return;
  }

  // 初始化：读取本地存储的主题，默认普通深色
  let currentTheme = localStorage.getItem('blogTheme') || 'dark';
  applyTheme(currentTheme);

  // 1. 点击主题按钮：显示/隐藏选项面板
  switcherBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡（避免点击后立即关闭）
    switcherContainer.classList.toggle('active');
  });

  // 2. 点击主题选项：切换主题
  themeItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const newTheme = this.getAttribute('data-theme');
      if (newTheme) {
        currentTheme = newTheme;
        applyTheme(newTheme);
        localStorage.setItem('blogTheme', newTheme); // 保存到本地，刷新不丢失
        switcherContainer.classList.remove('active'); // 切换后关闭面板
      }
    });
  });

  // 3. 点击页面其他地方：关闭选项面板
  document.addEventListener('click', function() {
    if (switcherContainer.classList.contains('active')) {
      switcherContainer.classList.remove('active');
    }
  });

  // 4. 点击选项面板内部：不关闭（避免误触）
  themeOptions.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // 核心函数：应用主题（给body加对应的类）
  function applyTheme(themeName) {
    // 先移除所有主题类，避免样式冲突
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    // 给body加当前主题类（如theme-light-img）
    body.classList.add(`theme-${themeName}`);
    // 更新按钮文字（显示当前主题）
    updateBtnText(themeName);
  }

  // 辅助函数：更新主题按钮文字
  function updateBtnText(themeName) {
    const themeTextMap = {
      'light': '普通浅色 ▼',
      'dark': '普通深色 ▼',
      'light-img': '带图浅色 ▼',
      'dark-img': '带图深色 ▼'
    };
    switcherBtn.textContent = themeTextMap[themeName] || '切换主题 ▼';
  }
});
