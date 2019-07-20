const mainCarousel = document.querySelector('.main-carousel');
const restartButton = document.querySelector('.restartButton');

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