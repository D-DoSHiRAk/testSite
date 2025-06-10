document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("carousel-video");
    const toggle = document.getElementById("sound-toggle");

    toggle.addEventListener("touchend", () => {
        video.muted = !video.muted;
        toggle.textContent = video.muted ? "🔇" : "🔊";
    });

    toggle.addEventListener("click", () => {
        video.muted = !video.muted;
        toggle.textContent = video.muted ? "🔇" : "🔊";
    });

    // Автоматическое воспроизведение, если элемент в зоне видимости
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);
});