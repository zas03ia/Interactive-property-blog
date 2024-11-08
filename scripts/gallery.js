document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const imgnumber = document.getElementById('img-number');
    const closeButton = document.querySelector('.gallery-close');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');

    let currentIndex = 0;

    // Function to change images (next or previous)
    function changeImage(direction) {
        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = images.length - 1; // Go to last image if it's the first image
        } else if (currentIndex >= images.length) {
            currentIndex = 0; // Go to first image if it's the last image
        }

        modalImage.src = images[currentIndex].src;
        imgnumber.textContent = `${currentIndex+1}/8`;
    }

    // Function to open the modal and show the clicked image
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = img.src;
            imgnumber.textContent = `${index+1}/8`;
            currentIndex = index;
        });
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Add event listeners to the navigation buttons
    prevButton.addEventListener('click', () => {
        changeImage(-1); // Go to the previous image
    });

    nextButton.addEventListener('click', () => {
        changeImage(1); // Go to the next image
    });
});