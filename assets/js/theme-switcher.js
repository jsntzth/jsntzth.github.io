document.addEventListener('DOMContentLoaded', function() {
  // 1. 动态创建主题切换所需元素（确保一定存在）
  const themeContainer = document.createElement('div');
  themeContainer.className = 'theme-switcher-container';
  themeContainer.style.position = 'fixed';
  themeContainer.style.bottom = '20px';
  themeContainer.style.right = '20px';
  themeContainer.style.zIndex = '9999';

  // 创建切换按钮
  const themeSwitcherBtn = document.createElement('button');
  themeSwitcherBtn.id = 'themeSwitcherBtn';
  themeSwitcherBtn.className = 'theme-switcher-btn';
  themeSwitcherBtn.style.padding = '8px 12px';
  themeSwitcherBtn.style.border = 'none';
  themeSwitcherBtn.style.borderRadius = '4px';
  themeSwitcherBtn.style.backgroundColor = '#333';
  themeSwitcherBtn.style.color = 'white';
  themeSwitcherBtn.style.cursor = 'pointer';

  // 创建主题选项列表
  const themeOptions = document.createElement('ul');
  themeOptions.id = 'themeOptions';
  themeOptions.className = 'theme-options hidden';
  themeOptions.style.position = 'absolute';
  themeOptions.style.bottom = '40px';
  themeOptions.style.right = '0';
  themeOptions.style.listStyle = 'none';
  themeOptions.style.padding = '0';
  themeOptions.style.margin = '0';
  themeOptions.style.backgroundColor = 'white';
  themeOptions.style.border = '1px solid #ddd';
  themeOptions.style.borderRadius = '4px';
  themeOptions.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

  // 添加主题选项
  const themes = [
    { id: 'light', name: '浅色模式' },
    { id: 'dark', name: '深色模式' },
    { id: 'light-img', name: '带图浅色' },
    { id: 'dark-img', name: '带图深色' }
  ];
  themes.forEach(theme => {
    const li = document.createElement('li');
    li.setAttribute('data-theme', theme.id);
    li.textContent = theme.name;
    li.style.padding = '8px 16px';
    li.style.cursor = 'pointer';
    li.style.whiteSpace = 'nowrap';
    li.addEventListener('mouseover', () => li.style.backgroundColor = '#f5f5f5');
    li.addEventListener('mouseout', () => li.style.backgroundColor = 'transparent');
    themeOptions.appendChild(li);
  });

  // 将元素添加到页面
  themeContainer.appendChild(themeSwitcherBtn);
  themeContainer.appendChild(themeOptions);
  document.body.appendChild(themeContainer);

  // 2. 初始化变量
  const body = document.body;
  const mathJaxDisplays = document.querySelectorAll('.MathJax_Display') || [];
  const validThemes = themes.map(t => t.id);
  let savedTheme = localStorage.getItem('blogTheme');
  if (!validThemes.includes(savedTheme)) savedTheme = 'light';

  // 3. 应用主题函数
  function applyTheme(theme) {
    // 移除旧主题
    validThemes.forEach(t => body.classList.remove(`theme-${t}`));
    // 添加新主题
    body.classList.add(`theme-${theme}`);

    // 更新公式颜色
    const formulaColor = theme.includes('dark') ? '#f0f0f0' : '#2d3748';
    mathJaxDisplays.forEach(el => {
      if (el?.style) el.style.color = formulaColor;
    });

    // 更新按钮文本（此时按钮一定存在）
    const themeName = themes.find(t => t.id === theme)?.name || '主题';
    themeSwitcherBtn.textContent = `${themeName} ▼`;
  }

  // 4. 绑定事件
  themeSwitcherBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeOptions.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    themeOptions.classList.add('hidden');
  });

  themeOptions.addEventListener('click', (e) => {
    e.stopPropagation();
    const selectedTheme = e.target.getAttribute('data-theme');
    if (validThemes.includes(selectedTheme)) {
      applyTheme(selectedTheme);
      localStorage.setItem('blogTheme', selectedTheme);
      themeOptions.classList.add('hidden');
    }
  });

  // 5. 初始应用主题
  applyTheme(savedTheme);

  // 6. MathJax 兼容处理
  if (window.MathJax?.Hub?.Queue) {
    MathJax.Hub.Queue(() => applyTheme(savedTheme));
  }

  // 7. 添加基础样式（确保 hidden 类生效）
  const style = document.createElement('style');
  style.textContent = `.hidden { display: none !important; }`;
  document.head.appendChild(style);
});
