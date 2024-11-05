let currentIndex = 0;

function moveBannerCarousel(direction) {
    const banners = document.querySelectorAll('.bannerDiv');
    const totalBanners = banners.length;
    if (banners) {
        if (!banners[currentIndex]) {
            currentIndex = (currentIndex + direction + totalBanners) % totalBanners;
        }
        // Atualiza o data-active do banner atual para false
        banners[currentIndex].setAttribute('data-active', 'false');
        // Calcula o próximo banner
        currentIndex = (currentIndex + direction + totalBanners) % totalBanners;
        // Atualiza o data-active do próximo banner para true
        banners[currentIndex].setAttribute('data-active', 'true');
    }
};

// Carrossel automático
setInterval(() => {
    moveBannerCarousel(1);
}, 5000);

function movecarousel(direction, componentId) {
    const carouselContent = document.getElementById(`carousel-content_${componentId}`);
    const scrollAmount = 350;
    if (carouselContent) {
        carouselContent.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    }
};