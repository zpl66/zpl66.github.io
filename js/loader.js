document.addEventListener("DOMContentLoaded", function() {
  // 页面加载完成时隐藏加载页面并显示内容
  window.addEventListener("load", function() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  });
});
