// 等待页面完全加载
window.addEventListener('load', function() {
  // 直接通过类名获取元素（更可靠）
  const switcherContainer = document.querySelector('.theme-switcher-container');
  const switcherBtn = document.querySelector('.theme-switcher-btn');
  const themeOptions = document.querySelector('.theme-options');
  const themeItems = document.querySelectorAll('.theme-options li');
  const body = document.body;

  // 检查所有必要元素是否存在
  if (!switcherContainer || !switcherBtn || !themeOptions || themeItems.length === 0) {
    console.error('主题切换元素缺失，请检查HTML结构');
    return;
  }

  // 初始化主题
  let currentTheme = localStorage.getItem('blogTheme') || 'light';
  applyTheme(currentTheme);

  // 按钮点击事件（显示/隐藏选项）
  switcherBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    switcherContainer.classList.toggle('active');
  });

  // 点击选项切换主题
  themeItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const theme = this.getAttribute('data-theme');
      if (theme) {
        currentTheme = theme;
        applyTheme(theme);
        localStorage.setItem('blogTheme', theme);
        switcherContainer.classList.remove('active');
      }
    });
  });

  // 点击页面其他地方关闭选项
  document.addEventListener('click', function() {
    switcherContainer.classList.remove('active');
  });

  // 阻止选项面板内部点击事件冒泡
  themeOptions.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // 应用主题的核心函数
  function applyTheme(theme) {
    // 移除所有主题类
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    // 添加当前主题类
    body.classList.add('theme-' + theme);
    // 更新按钮文本
    updateButtonText(theme);
  }

  // 更新按钮显示文本
  function updateButtonText(theme) {
    const texts = {
      'light': '普通浅色',
      'dark': '普通深色',
      'light-img': '带图浅色',
      'dark-img': '带图深色'
    };
    switcherBtn.textContent = texts[theme] || '切换主题';
  }
});
