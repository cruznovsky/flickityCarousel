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
        zoom: 6,
        center: data[0].cords
    });

    for (let i = 0; i < data.length; i++) {

        marker[i] = new google.maps.Marker({
            position: data[i].cords,
            map: map
        });

        marker[i].addListener('click', function () {
            flkty.select(i);
        })
    }

    flkty.on('change', function (index) {
        smoothPanAndZoom(map, 8, data[index].cords);
    });
};

var smoothPanAndZoom = function (map, zoom, cords) {
    // Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom - 1);
    jumpZoom = Math.max(jumpZoom, 3);

    // Zaczynamy od oddalenia mapy do wyliczonego powiększenia.
    smoothZoom(map, jumpZoom, function () {
        // Następnie przesuwamy mapę do żądanych współrzędnych.
        smoothPan(map, cords, function () {
            // Na końcu powiększamy mapę do żądanego powiększenia.
            smoothZoom(map, zoom);
        });
    });
};

var smoothZoom = function (map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    // Jeśli steps == 0, czyli startingZoom == zoom
    if (!steps) {
        // Jeśli podano trzeci argument
        if (callback) {
            // Wywołaj funkcję podaną jako trzeci argument.
            callback();
        }
        // Zakończ działanie funkcji
        return;
    }

    // Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
    var stepChange = - (startingZoom - zoom) / steps;

    var i = 0;
    // Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
    var timer = window.setInterval(function () {
        // Jeśli wykonano odpowiednią liczbę kroków
        if (++i >= steps) {
            // Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
            window.clearInterval(timer);
            // Jeśli podano trzeci argument
            if (callback) {
                // Wykonaj funkcję podaną jako trzeci argument
                callback();
            }
        }
        // Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
        map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
};

var smoothPan = function (map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);

    var steps = 12;
    var panStep = { lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps };

    var i = 0;
    var timer = window.setInterval(function () {
        if (++i >= steps) {
            window.clearInterval(timer);
            if (callback) callback();
        }
        map.panTo({ lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i });
    }, 1000 / 30);
};