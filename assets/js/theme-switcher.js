document.addEventListener('DOMContentLoaded', function() {
  // 1. 尝试获取元素，不直接报错
  const themeSwitcherBtn = document.getElementById('themeSwitcherBtn'); 
  const themeOptions = document.getElementById('themeOptions');
  const body = document.body;

  // 2. 核心元素缺失时，直接终止脚本并提示（不影响页面其他功能）
  if (!themeSwitcherBtn || !themeOptions || !body) {
    console.log('主题切换所需元素不存在，已跳过主题功能');
    return;
  }

  // 3. 其他元素获取时增加容错（不存在则为空数组）
  const mathJaxDisplays = document.querySelectorAll ? 
    document.querySelectorAll('.MathJax_Display') : [];

  // 4. 初始化主题（确保默认值有效）
  const validThemes = ['light', 'dark', 'light-img', 'dark-img'];
  let savedTheme = localStorage.getItem('blogTheme');
  // 校验本地存储的主题是否有效，无效则用默认值
  if (!validThemes.includes(savedTheme)) {
    savedTheme = 'light';
  }

  // 5. 封装安全执行函数（防止 applyTheme 内部报错）
  function safeApplyTheme(theme) {
    try {
      applyTheme(theme);
    } catch (err) {
      console.error('应用主题时出错:', err);
    }
  }

  safeApplyTheme(savedTheme);

  // 6. 绑定事件前再次确认元素可用
  try {
    themeSwitcherBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      themeOptions.classList.toggle('hidden');
    });

    document.addEventListener('click', function() {
      themeOptions.classList.add('hidden');
    });

    // 防止选项列表内部点击冒泡
    themeOptions.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    themeOptions.querySelectorAll('li').forEach(option => {
      option.addEventListener('click', function() {
        const selectedTheme = this.getAttribute('data-theme');
        if (validThemes.includes(selectedTheme)) { // 校验主题有效性
          safeApplyTheme(selectedTheme);
          localStorage.setItem('blogTheme', selectedTheme);
          themeOptions.classList.add('hidden');
        }
      });
    });
  } catch (err) {
    console.error('绑定主题事件时出错:', err);
  }

  // 7. 主题应用逻辑（增加细节容错）
  function applyTheme(theme) {
    // 移除旧主题类时先检查是否存在
    ['theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img'].forEach(cls => {
      if (body.classList.contains(cls)) {
        body.classList.remove(cls);
      }
    });
    // 添加新主题类
    body.classList.add(`theme-${theme}`);

    // 处理公式颜色（容错：如果没有 MathJax 元素则跳过）
    if (mathJaxDisplays.length) {
      const formulaColor = theme.includes('dark') ? '#f0f0f0' : '#2d3748';
      mathJaxDisplays.forEach(el => {
        if (el && el.style) { // 确保元素和 style 属性存在
          el.style.color = formulaColor;
        }
      });
    }

    // 更新按钮文本（容错：确保映射关系存在）
    const themeNameMap = {
      'light': '浅色模式',
      'dark': '深色模式',
      'light-img': '带图浅色',
      'dark-img': '带图深色'
    };
    if (themeNameMap[theme] && themeSwitcherBtn.textContent !== undefined) {
      themeSwitcherBtn.textContent = `${themeNameMap[theme]} ▼`;
    }
  }

  // 8. MathJax 相关处理（增加存在性判断）
  if (window.MathJax && typeof window.MathJax.Hub?.Queue === 'function') {
    MathJax.Hub.Queue(function() {
      safeApplyTheme(savedTheme);
    });
  }
});
