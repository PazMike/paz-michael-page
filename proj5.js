

// Array of image sources for different galleries (Page-based)
const galleryData = {
    homePage: [
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/MaleSinglePhoto.jpg', alt: 'Male Single Photo' },
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/FemaleGraduation.jpg', alt: 'Graduation Photo' },
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/familySunsetpic.jpg', alt: 'Family Photo' },
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/WeddingPic.jpg', alt: 'Wedding Photo' }
    ],
    aboutPage: [
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/aboutPage.jpg', alt: 'About' },
       
    ],
    servicesPage: [
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/servicesPage.jpg', alt: 'Services' },
       
    ],
    contactPage: [
        { src: 'https://raw.githubusercontent.com/PazMike/paz-michael-page/refs/heads/main/contactPage.jpg', alt: 'Contact' },

    ]
};

// Requirement #1: Slideshow/Lightbox Overlay for Image
let currentImageIndex = 0; // Keep track of the current image index

function openOverlayImage(imageSrc, altText, index) {
    currentImageIndex = index; // Update the index when opening the overlay

    // Create overlay container
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = altText;
    img.classList.add('overlay-img');

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.classList.add('close-overlay');

    // Add previous and next buttons for navigation
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.classList.add('prev-overlay');
    overlay.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.classList.add('next-overlay');
    overlay.appendChild(nextBtn);

    // Append image and buttons to overlay
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Close the overlay when clicking the close button
    closeBtn.addEventListener('click', () => {
        overlay.remove();  // Remove overlay from the page
    });

    // Close the overlay if clicked outside of the image
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();  // Remove overlay if outside the image is clicked
        }
    });

    // Handle Previous Image Button
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryData.homePage.length) % galleryData.homePage.length;
        img.src = galleryData.homePage[currentImageIndex].src;  // Update image source
        img.alt = galleryData.homePage[currentImageIndex].alt;  // Update alt text
    });

    // Handle Next Image Button
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryData.homePage.length;
        img.src = galleryData.homePage[currentImageIndex].src;  // Update image source
        img.alt = galleryData.homePage[currentImageIndex].alt;  // Update alt text
    });
}

// Requirement #3: Dynamically create a photo gallery using `createElement` and `appendChild`
function createPhotoGallery(pageName) {
    const galleryContainer = document.createElement('div');
    galleryContainer.classList.add('gallery');

    // Get the images for the specified page from galleryData
    const galleryImages = galleryData[pageName];

    // Create and append each image to the gallery
    galleryImages.forEach((imageData, index) => {
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.classList.add('gallery-image');

        // Open the image in overlay when clicked
        img.addEventListener('click', () => {
            openOverlayImage(imageData.src, imageData.alt, index); // Pass the index to the overlay
        });

        galleryContainer.appendChild(img);
    });

    // Append the gallery to the page (you can append it to a specific section)
    document.getElementById('photo-gallery').appendChild(galleryContainer);
}

// Initialize the photo gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we are on by checking the body ID or URL
    let pageName = document.body.id || 'homePage';  // Default to 'homePage' if no ID is found
    createPhotoGallery(pageName);  // Create the gallery for the correct page
});
