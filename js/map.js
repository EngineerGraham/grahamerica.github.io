(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initMap();
    });

    function initMap() {
        var mapContent = document.getElementById('map-content');
        var zoomInBtn = document.getElementById('zoom-in');
        var zoomOutBtn = document.getElementById('zoom-out');
        var resetBtn = document.getElementById('zoom-reset');

        if (!mapContent) return;

        // Initialize Panzoom
        var panzoom = Panzoom(mapContent, {
            maxScale: 5,
            minScale: 1,
            contain: 'outside',
            startScale: 1,
            panOnlyWhenZoomed: false,
            cursor: 'grab'
        });

        // Enable mouse wheel zoom
        var mapWrapper = document.getElementById('map-wrapper');
        mapWrapper.addEventListener('wheel', function(event) {
            panzoom.zoomWithWheel(event);
        });

        // Zoom controls
        zoomInBtn.addEventListener('click', function() {
            panzoom.zoomIn();
        });

        zoomOutBtn.addEventListener('click', function() {
            panzoom.zoomOut();
        });

        resetBtn.addEventListener('click', function() {
            panzoom.reset();
        });

        // Initialize pin click handlers
        initPins();
    }

    function initPins() {
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
        // Build items array for Magnific Popup
        var items = images.map(function(src, index) {
            return {
                src: src,
                title: locationName + ' (' + (index + 1) + '/' + images.length + ')'
            };
        });

        // Open Magnific Popup gallery
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
                    // Pause panzoom interactions while popup is open
                    document.body.style.overflow = 'hidden';
                },
                close: function() {
                    document.body.style.overflow = '';
                }
            }
        });
    }

})();
