// List of images for the slider (stored inside assets/images folder)
const images = [
    'assets/images/image1.png',
    'assets/images/image2.png',
    'assets/images/image3.png',
    'assets/images/image4.png',
    'assets/images/image5.png'
];

// Grab the important elements from the page
const sliderContainer = document.querySelector('.slider-container');
const sliderImages = document.querySelector('.slider-images');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.querySelector('.slider-dots');

// Keep track of which image is currently showing
let currentImageIndex = 0;
let slideshowInterval = null; // will store the ID of the auto-slide timer

// Function to load images and create dots below the slider
function renderSlider() {
    // Add all the images
    sliderImages.innerHTML = '';
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        img.onerror = () => { console.error(`Failed to load image at: ${src}`); };
        sliderImages.appendChild(img);
    });

    // Add the clickable dots
    sliderDots.innerHTML = '';
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentImageIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateSliderPosition();
            resetInterval();
        });
        sliderDots.appendChild(dot);
    });

    updateSliderPosition();
}

// Function to move the slider so the current image is visible
function updateSliderPosition() {
    sliderImages.style.transform = `translateX(${-currentImageIndex * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

// Move to the next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateSliderPosition();
}

// Move to the previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateSliderPosition();
}

// Stop the auto slideshow
function stopInterval() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Start the auto slideshow (every 3 seconds)
function startInterval() {
    stopInterval();
    slideshowInterval = setInterval(showNextImage, 3000);
}

// Reset the slideshow timer (useful when user clicks manually)
function resetInterval() {
    stopInterval();
    startInterval();
}

// Button clicks for next/previous
nextBtn.addEventListener('click', () => {
    showNextImage();
    resetInterval();
});
prevBtn.addEventListener('click', () => {
    showPrevImage();
    resetInterval();
});

// Pause slideshow when hovering over the slider
sliderContainer.addEventListener('mouseenter', stopInterval);
// Resume slideshow when the mouse leaves
sliderContainer.addEventListener('mouseleave', startInterval);

// Run the slider setup once the page is ready
document.addEventListener('DOMContentLoaded', () => {
    renderSlider();
    startInterval();
});
