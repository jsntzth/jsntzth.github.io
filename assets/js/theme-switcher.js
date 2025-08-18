document.addEventListener('DOMContentLoaded', function() {
  // 1. 精准获取主题切换相关元素（确保与HTML完全匹配）
  const switcherBtn = document.getElementById('themeSwitcherBtn');
  const themeOptionsList = document.getElementById('themeOptions');
  const themeOptionItems = themeOptionsList ? themeOptionsList.querySelectorAll('li') : [];
  const body = document.body;

  // 检查关键元素是否存在（避免报错导致脚本失效）
  if (!switcherBtn || !themeOptionsList || themeOptionItems.length === 0) {
    console.error('主题切换元素缺失，请检查HTML中是否有 id="themeSwitcherBtn" 和 id="themeOptions"');
    return;
  }

  // 2. 初始化：优先读取本地存储的主题，默认用“普通浅色”
  let currentTheme = localStorage.getItem('blogTheme') || 'light';
  // 初始化时就应用主题（确保页面加载时样式正确）
  applyTheme(currentTheme);

  // 3. 点击“切换主题”按钮：显示/隐藏选项面板
  switcherBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡（避免点击按钮后立即关闭面板）
    themeOptionsList.classList.toggle('hidden');
    // 更新按钮文字为当前主题（提升用户体验）
    updateSwitcherBtnText(currentTheme);
  });

  // 4. 点击具体主题选项（包括带图浅色）：切换主题
  themeOptionItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      // 获取选项的 data-theme 属性（如 "light-img"）
      const selectedTheme = this.getAttribute('data-theme');
      if (selectedTheme) {
        currentTheme = selectedTheme;
        applyTheme(currentTheme); // 应用选中的主题
        localStorage.setItem('blogTheme', currentTheme); // 保存到本地存储
        themeOptionsList.classList.add('hidden'); // 切换后关闭面板
      }
    });
  });

  // 5. 点击页面其他区域：关闭主题选项面板
  document.addEventListener('click', function() {
    if (!themeOptionsList.classList.contains('hidden')) {
      themeOptionsList.classList.add('hidden');
    }
  });

  // 6. 核心函数1：应用主题（给body添加对应的主题类）
  function applyTheme(themeName) {
    // 先移除所有主题类，避免样式冲突
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    // 给body添加当前主题类（如 "theme-light-img"）
    body.classList.add(`theme-${themeName}`);
    // 更新按钮文字
    updateSwitcherBtnText(themeName);
  }

  // 7. 辅助函数：更新“切换主题”按钮的文字
  function updateSwitcherBtnText(themeName) {
    const themeTextMap = {
      'light': '普通浅色 ▼',
      'dark': '普通深色 ▼',
      'light-img': '带图浅色 ▼',
      'dark-img': '带图深色 ▼'
    };
    switcherBtn.textContent = themeTextMap[themeName] || '切换主题 ▼';
  }
});
