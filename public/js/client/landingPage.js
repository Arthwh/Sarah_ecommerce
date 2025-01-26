function moveBannerCarousel(direction, componentId) {
    const carouselContent = document.getElementById(`bannerSection_${componentId}`);
    const banners = carouselContent.querySelectorAll('.bannerDiv');
    const totalBanners = banners.length;
    if (banners) {
        let currentIndex = parseInt(carouselContent.dataset.currentIndex);
        if (!banners[currentIndex]) {
            let newCurrentIndex = (currentIndex + direction + totalBanners) % totalBanners;
            currentIndex = newCurrentIndex
        }
        // Atualiza o data-active do banner atual para false
        banners[currentIndex].setAttribute('data-active', 'false');
        // Calcula o próximo banner
        currentIndex = (currentIndex + direction + totalBanners) % totalBanners;
        carouselContent.dataset.currentIndex = currentIndex;
        // Atualiza o data-active do próximo banner para true
        banners[currentIndex].setAttribute('data-active', 'true');
    }
};

if (document.querySelector('.banner-section')) {
    const banners = document.querySelectorAll('.banner-section');
    banners.forEach(section => {
        setInterval(() => {
            moveBannerCarousel(1, section.dataset.componentId);
        }, 5000);
    });
}

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