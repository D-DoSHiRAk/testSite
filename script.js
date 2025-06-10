document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('carousel-track');
    const images = track.children;
    const total = images.length;
    let currentIndex = 0;

    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let animationID = 0;

    const carousel = document.getElementById('carousel');
    let slideWidth = carousel.clientWidth;

    window.addEventListener('resize', () => {
        slideWidth = carousel.clientWidth;
        setPositionByIndex();
    });

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function touchStart(event) {
        isDragging = true;
        startX = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        track.style.transition = 'none';
        event.preventDefault();
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startX;
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < total - 1) currentIndex++;
        if (movedBy > 50 && currentIndex > 0) currentIndex--;

        setPositionByIndex();
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = -currentIndex * slideWidth;
        prevTranslate = currentTranslate;
        track.style.transition = 'transform 0.3s ease';
        setSliderPosition();
    }

    // Слушатели на карусель целиком, чтобы работать и с мышью и с тачами
    carousel.addEventListener('touchstart', touchStart);
    carousel.addEventListener('touchmove', touchMove);
    carousel.addEventListener('touchend', touchEnd);

    carousel.addEventListener('mousedown', (event) => {
        touchStart(event);
        // Добавляем слушатели на window, чтобы ловить mousemove/mouseup за пределами карусели
        window.addEventListener('mousemove', touchMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    function onMouseUp(event) {
        touchEnd(event);
        window.removeEventListener('mousemove', touchMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

    setPositionByIndex();
});