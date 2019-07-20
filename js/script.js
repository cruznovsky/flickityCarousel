const mainCarousel = document.querySelector('.main-carousel');
const restartButton = document.querySelector('.restartButton');
const progressBar = document.querySelector('.progress-bar');

let flkty = new Flickity(mainCarousel, {
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    hash: true,
});

restartButton.addEventListener('click', function () {
    flkty.selectCell(0);
})

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
