document.addEventListener("DOMContentLoaded", function() {
    const descriptionPath = 'assets/gamesRes/kingsbridge/description.json';
    const specsPath = 'assets/gamesRes/kingsbridge/specs.json';

    const btnDesc = document.getElementById('btn-description');
    const btnSpecs = document.getElementById('btn-specs');
    const modalDesc = document.getElementById('modal-description');
    const modalSpecs = document.getElementById('modal-specs');
    const overlay = document.getElementById('overlay');
    const closeDesc = document.getElementById('close-description');
    const closeSpecs = document.getElementById('close-specs');
    const descContent = document.getElementById('description-content');
    const specsContent = document.getElementById('specs-content');

    async function fetchData(file) {
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error('Ошибка загрузки файла');
            return await res.json();
        } catch (e) {
            return { error: e.message };
        }
    }

    btnDesc.addEventListener('click', async () => {
        descContent.textContent = 'Загрузка...';
        modalDesc.classList.add('active');
        overlay.classList.add('active');
        const data = await fetchData(descriptionPath);
        if (data.error) {
            descContent.textContent = 'Ошибка загрузки описания.';
        } else {
            descContent.innerHTML = data.description.replace(/\n/g, '<br>') || 'Описание отсутствует.';
        }
    });

    btnSpecs.addEventListener('click', async () => {
        specsContent.textContent = 'Загрузка...';
        modalSpecs.classList.add('active');
        overlay.classList.add('active');
        const data = await fetchData(specsPath);
        if (data.error) {
            specsContent.textContent = 'Ошибка загрузки характеристик.';
        } else {
            specsContent.innerHTML = data.specs.replace(/\n/g, '<br>') || 'Описание отсутствует.';
        }
    });

    function closeModals() {
        modalDesc.classList.remove('active');
        modalSpecs.classList.remove('active');
        overlay.classList.remove('active');
    }

    closeDesc.addEventListener('click', closeModals);
    closeSpecs.addEventListener('click', closeModals);
    overlay.addEventListener('click', closeModals);

    // Закрытие по ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModals();
    });
});