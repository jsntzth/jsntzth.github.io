document.addEventListener('DOMContentLoaded', function() {
  // 获取主题切换相关元素，并增加存在性校验
  const themeSwitcherBtn = document.getElementById('themeSwitcherBtn');
  const themeOptions = document.getElementById('themeOptions');
  const body = document.body;
  const mathJaxDisplays = document.querySelectorAll('.MathJax_Display') || [];

  // 核心元素缺失时直接退出，避免后续报错
  if (!themeSwitcherBtn || !themeOptions || !body) {
    console.log('主题切换元素不存在，已跳过脚本执行');
    return;
  }

  // 从本地存储获取保存的主题，默认使用浅色模式
  const savedTheme = localStorage.getItem('blogTheme') || 'light';
  applyTheme(savedTheme);

  // 绑定主题切换按钮点击事件（显示/隐藏选项列表）
  themeSwitcherBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡，避免触发文档点击事件
    themeOptions.classList.toggle('hidden');
  });

  // 点击文档其他区域隐藏主题选项列表
  document.addEventListener('click', function() {
    themeOptions.classList.add('hidden');
  });

  // 绑定主题选项点击事件（切换主题）
  themeOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', function() {
      const selectedTheme = this.getAttribute('data-theme');
      applyTheme(selectedTheme);
      localStorage.setItem('blogTheme', selectedTheme); // 保存主题到本地存储
      themeOptions.classList.add('hidden'); // 切换后隐藏选项列表
    });
  });

  // 应用主题的核心函数
  function applyTheme(theme) {
    // 再次校验元素存在性
    if (!body || !themeSwitcherBtn) return;

    // 移除所有主题类，添加当前选中的主题类
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    body.classList.add(`theme-${theme}`);

    // 更新数学公式颜色（深色模式用浅色，浅色模式用深色）
    const formulaColor = theme.includes('dark') ? '#f0f0f0' : '#2d3748';
    mathJaxDisplays.forEach(el => {
      if (el) el.style.color = formulaColor; // 避免操作 null 元素
    });

    // 主题名称映射表（用于按钮文本显示）
    const themeNameMap = {
      'light': '浅色模式',
      'dark': '深色模式',
      'light-img': '带图浅色',
      'dark-img': '带图深色'
    };

    // 更新切换按钮文本
    if (themeNameMap[theme]) {
      themeSwitcherBtn.textContent = `${themeNameMap[theme]} ▼`;
    }
  }

  // 如果页面存在 MathJax，在其加载完成后重新应用主题（确保公式颜色正确）
  if (window.MathJax) {
    MathJax.Hub.Queue(function() {
      applyTheme(savedTheme);
    });
  }
});
