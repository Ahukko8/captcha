const imageGrid = document.getElementById('image-grid');
const submitBtn = document.getElementById('submit-btn');
const refreshBtn = document.getElementById('refresh-btn');
const result = document.getElementById('result');

// Local images array (adjust filenames to match your images)
const images = [
    { path: 'images/panda1.jpg', isPanda: true },
    { path: 'images/not1.jpg', isPanda: false },
    { path: 'images/panda3.jpg', isPanda: true },
    { path: 'images/panda2.jpg', isPanda: true },
    { path: 'images/not2.jpg', isPanda: false },
    { path: 'images/not3.jpg', isPanda: false },
    
];

function loadCaptcha() {
    imageGrid.innerHTML = '';
    result.textContent = '';
    const shuffledImages = images.sort(() => 0.5 - Math.random()).slice(0, 6);
    shuffledImages.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.path;
        imgElement.dataset.isPanda = img.isPanda;
        imgElement.dataset.index = index;
        imgElement.addEventListener('click', toggleSelection);
        imageGrid.appendChild(imgElement);
    });
}

function toggleSelection(event) {
    const img = event.target;
    img.classList.toggle('selected');
}

function verifySelection() {
    const selectedImages = document.querySelectorAll('.image-grid img.selected');
    let correct = true;

    const allImages = document.querySelectorAll('.image-grid img');
    allImages.forEach(img => {
        const isPanda = img.dataset.isPanda === 'true';
        const isSelected = img.classList.contains('selected');
        if (isPanda && !isSelected) correct = false;
        if (!isPanda && isSelected) correct = false;
    });

    if (correct) {
        window.location.href = 'success.html';
    } else {
        result.textContent = 'Failed! Try again.';
        result.style.color = 'red';
    }
}

submitBtn.addEventListener('click', verifySelection);
refreshBtn.addEventListener('click', loadCaptcha);

loadCaptcha();