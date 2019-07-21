'use strict';

const mainCarousel = document.querySelector('.main-carousel');
const restartButton = document.querySelector('.restartButton');
const progressBar = document.querySelector('.progress-bar');
const templateSlide = document.getElementById('template-slide').innerHTML;
let marker = [];


Mustache.parse(templateSlide);
let slidesList = '';

for (let i = 0; i < data.length; i++) {
    slidesList += Mustache.render(templateSlide, data[i]);
}

mainCarousel.innerHTML = slidesList;

let flkty = new Flickity(mainCarousel, {
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

window.initMap = function () {

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: data[0].cords
    });

    for (let i = 0; i < data.length; i++) {

        marker[i] = new google.maps.Marker({
            position: data[i].cords,
            map: map
        });
    }
}

