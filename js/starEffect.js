document.addEventListener('mousemove', function(event) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${event.clientX}px`;
    star.style.top = `${event.clientY}px`;
    document.body.appendChild(star);

    // 使星星在创建后移动并消失
    setTimeout(() => {
        star.style.transform = 'translateY(-20px)'; // 向上移动
        star.style.opacity = '0'; // 渐变至透明
    }, 10);

    // 从 DOM 中移除星星，防止DOM元素过多
    setTimeout(() => {
        document.body.removeChild(star);
    }, 600); // 确保这个时间长于transition时间
});