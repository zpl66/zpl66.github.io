document.addEventListener('DOMContentLoaded', function() {
    const words = ['patience', 'is', 'key', 'in', 'life'];
    let currentIndex = 0;

    document.body.addEventListener('click', function(event) {
        const span = document.createElement('span');
        span.textContent = words[currentIndex];
        span.style.position = 'fixed';
        span.style.left = `${event.clientX}px`;
        span.style.top = `${event.clientY}px`;
        span.style.opacity = 1;
        span.style.transition = 'top 2s ease-out, opacity 2s ease-out';
        span.style.color = 'deepskyblue';
        span.style.fontSize = '24px';
        document.body.appendChild(span);

        setTimeout(() => {
            span.style.top = `${parseInt(span.style.top) - 100}px`;  // Moves the span up by 100px
            span.style.opacity = 0;  // Fades the span out
            setTimeout(() => document.body.removeChild(span), 2000);  // Remove after animation
        }, 0);

        currentIndex = (currentIndex + 1) % words.length; // Update the index
    });
});