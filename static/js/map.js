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
                createGrid();
                createPins(data.locations);
                initMap();
            })
            .catch(function(err) {
                console.error('Error loading locations:', err);
                initMap();
            });
    }

    function createGrid() {
        var container = document.getElementById('pins-container');
        if (!container) return;

        var grid = document.createElement('div');
        grid.id = 'map-grid';
        grid.className = 'map-grid';

        // Create vertical lines (X axis) every 5%
        for (var x = 0; x <= 100; x += 5) {
            var line = document.createElement('div');
            line.className = 'grid-line-v';
            line.style.left = x + '%';

            var label = document.createElement('span');
            label.className = 'grid-label-x';
            label.textContent = x;
            line.appendChild(label);

            grid.appendChild(line);
        }

        // Create horizontal lines (Y axis) every 5%
        for (var y = 0; y <= 100; y += 5) {
            var line = document.createElement('div');
            line.className = 'grid-line-h';
            line.style.top = y + '%';

            var label = document.createElement('span');
            label.className = 'grid-label-y';
            label.textContent = y;
            line.appendChild(label);

            grid.appendChild(line);
        }

        container.appendChild(grid);
    }

    function createPins(locations) {
        var container = document.getElementById('pins-container');
        if (!container || !locations) return;

        locations.forEach(function(loc) {
            var hasImages = loc.images && loc.images.length > 0;
            var pin = document.createElement('div');
            pin.className = 'map-pin' + (hasImages ? '' : ' no-images');
            pin.setAttribute('data-id', loc.id);
            pin.setAttribute('data-name', loc.name);
            pin.setAttribute('data-images', JSON.stringify(loc.images));
            pin.style.left = loc.x + '%';
            pin.style.top = loc.y + '%';

            var tooltipText = hasImages ? loc.name : loc.name + '<span class="no-images-text">No images yet</span>';

            pin.innerHTML =
                '<div class="pin-stem"></div>' +
                '<div class="pin-head"></div>' +
                '<div class="pin-tooltip">' + tooltipText + '</div>';

            pin.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openGallery(loc.images, loc.name);
            });

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
            cursor: 'grab',
            excludeClass: 'map-pin'
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
    }

    function openGallery(images, locationName) {
        if (!images || images.length === 0) {
            showNoImagesNotice(locationName);
            return;
        }

        // Check if GLightbox is available
        if (typeof GLightbox === 'undefined') {
            console.error('GLightbox not loaded');
            window.open(images[0], '_blank');
            return;
        }

        // Build gallery items for GLightbox
        var items = images.map(function(src, index) {
            return {
                href: src,
                type: 'image',
                title: locationName,
                description: 'Image ' + (index + 1) + ' of ' + images.length
            };
        });

        // Create and open lightbox
        var lightbox = GLightbox({
            elements: items,
            touchNavigation: true,
            loop: true,
            closeButton: true,
            zoomable: false,
            draggable: false
        });

        lightbox.open();
    }

    function showNoImagesNotice(locationName) {
        // Remove any existing notice
        var existing = document.querySelector('.no-images-notice');
        if (existing) existing.remove();

        // Create notice element
        var notice = document.createElement('div');
        notice.className = 'no-images-notice';
        notice.innerHTML =
            '<div class="notice-content">' +
            '<h3>' + locationName + '</h3>' +
            '<p>No images yet</p>' +
            '<button class="notice-close">OK</button>' +
            '</div>';

        document.body.appendChild(notice);

        // Close handlers
        notice.querySelector('.notice-close').addEventListener('click', function() {
            notice.remove();
        });
        notice.addEventListener('click', function(e) {
            if (e.target === notice) notice.remove();
        });
    }

})();
