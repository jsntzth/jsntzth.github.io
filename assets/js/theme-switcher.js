document.addEventListener('DOMContentLoaded', function() {
  const themeSwitcherBtn = document.getElementById('themeSwitcherBtn'); 
  const themeOptions = document.getElementById('themeOptions');
  const body = document.body;
  const mathJaxDisplays = document.querySelectorAll('.MathJax_Display');
  
  if (!themeSwitcherBtn || !themeOptions) {
    console.warn('主题切换按钮或选项列表不存在，跳过主题切换逻辑');
    return;
  }

  const savedTheme = localStorage.getItem('blogTheme') || 'light';
  applyTheme(savedTheme);

  themeSwitcherBtn.addEventListener('click', function(e) {
    e.stopPropagation(); 
    themeOptions.classList.toggle('hidden');
  });

  document.addEventListener('click', function() {
    themeOptions.classList.add('hidden');
  });

  themeOptions.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  themeOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', function() {
      const selectedTheme = this.getAttribute('data-theme');
      if (selectedTheme) { 
        applyTheme(selectedTheme);
        localStorage.setItem('blogTheme', selectedTheme);
        themeOptions.classList.add('hidden');
      }
    });
  });

  function applyTheme(theme) {
    body.classList.remove('theme-light', 'theme-dark', 'theme-light-img', 'theme-dark-img');
    body.classList.add(`theme-${theme}`);

    const formulaColor = theme.includes('dark') ? '#f0f0f0' : '#2d3748';
    mathJaxDisplays.forEach(el => {
      el.style.color = formulaColor;
    });

    const themeNameMap = {
      'light': '浅色模式',
      'dark': '深色模式',
      'light-img': '带图浅色',
      'dark-img': '带图深色'
    };

    if (themeSwitcherBtn && themeNameMap[theme]) {
      themeSwitcherBtn.textContent = `${themeNameMap[theme]} ▼`;
    }
  }
  if (window.MathJax) {
    MathJax.Hub.Queue(function() {
      applyTheme(savedTheme);
    });
  }
});
