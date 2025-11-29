(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        loadLocationsAndInit();
    });

    function loadLocationsAndInit() {
        fetch('/data/locations.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                createPins(data.locations);
                initMap();
            })
            .catch(function(err) {
                console.error('Error loading locations:', err);
                initMap();
            });
    }

    function createPins(locations) {
        var container = document.getElementById('pins-container');
        if (!container || !locations) return;

        locations.forEach(function(loc) {
            var pin = document.createElement('div');
            pin.className = 'map-pin';
            pin.setAttribute('data-id', loc.id);
            pin.setAttribute('data-name', loc.name);
            pin.setAttribute('data-images', JSON.stringify(loc.images));
            pin.style.left = loc.x + '%';
            pin.style.top = loc.y + '%';

            pin.innerHTML =
                '<div class="pin-stem"></div>' +
                '<div class="pin-head"></div>' +
                '<div class="pin-tooltip">' + loc.name + '</div>';

            container.appendChild(pin);
        });
    }

    function initMap() {
        var mapContent = document.getElementById('map-content');
        var zoomInBtn = document.getElementById('zoom-in');
        var zoomOutBtn = document.getElementById('zoom-out');
        var resetBtn = document.getElementById('zoom-reset');

        if (!mapContent) return;

        var panzoom = Panzoom(mapContent, {
            maxScale: 5,
            minScale: 1,
            contain: 'outside',
            startScale: 1,
            panOnlyWhenZoomed: false,
            cursor: 'grab'
        });

        var mapWrapper = document.getElementById('map-wrapper');
        mapWrapper.addEventListener('wheel', function(event) {
            panzoom.zoomWithWheel(event);
        });

        zoomInBtn.addEventListener('click', function() {
            panzoom.zoomIn();
        });

        zoomOutBtn.addEventListener('click', function() {
            panzoom.zoomOut();
        });

        resetBtn.addEventListener('click', function() {
            panzoom.reset();
        });

        initPinClicks();
    }

    function initPinClicks() {
        var pins = document.querySelectorAll('.map-pin');

        pins.forEach(function(pin) {
            pin.addEventListener('click', function(e) {
                e.stopPropagation();

                var name = pin.getAttribute('data-name');
                var imagesJson = pin.getAttribute('data-images');
                var images = [];

                try {
                    images = JSON.parse(imagesJson);
                } catch (err) {
                    console.error('Error parsing images for pin:', name);
                    return;
                }

                if (images.length === 0) {
                    console.warn('No images for location:', name);
                    return;
                }

                openGallery(images, name);
            });
        });
    }

    function openGallery(images, locationName) {
        var items = images.map(function(src, index) {
            return {
                src: src,
                title: locationName + ' (' + (index + 1) + '/' + images.length + ')'
            };
        });

        $.magnificPopup.open({
            items: items,
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                titleSrc: 'title'
            },
            mainClass: 'mfp-fade',
            removalDelay: 300,
            callbacks: {
                open: function() {
                    document.body.style.overflow = 'hidden';
                },
                close: function() {
                    document.body.style.overflow = '';
                }
            }
        });
    }

})();
