document.addEventListener('DOMContentLoaded', function() {
    // 初始化左侧看板娘
    loadlive2d("live2dcanvas-left", "/path/to/hijiki/model.json");
  
    // 初始化右侧看板娘
    loadlive2d("live2dcanvas-right", "/node_modules/live2d-widget-model-wanko/assets/wanko.model.json");
  
    // 右侧看板娘点击事件
    var live2dRight = document.getElementById('live2d-widget-right');
    if (live2dRight) {
      live2dRight.addEventListener('click', function() {
        window.location.href = '/chat/';
      });
    }
  });
  