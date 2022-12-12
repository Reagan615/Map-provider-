mapboxgl.accessToken = 'pk.eyJ1IjoicmVhZ2FuNjE1IiwiYSI6ImNsYmt4anFsZzAyM2Ezd3FncTQ3NnhvemwifQ.Q7HshMC5Ax4-oMDBmeB7bA';
const monument = [-97.1930229807033, 49.81526785117632];
let loader = document.querySelector('.loading');
let board = document.querySelector('.board');
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: monument, // starting position [lng, lat]
    zoom: 9, // starting zoom
    bearing: 27,
    pitch: 45
});


function getLocation(position) {
    const options = {
        enableHighAccuracy: true
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, errorHandler, options);
    } else {
        console.log('geolocation is not support by your browser');
    }
};

function onSuccess(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    /* console.log(longitude, latitude); */
    map.setCenter([longitude, latitude]);
    const marker1 = new mapboxgl.Marker().setLngLat([-97.1955112, 49.8164595]).addTo(map);
    const marker2 = new mapboxgl.Marker().setLngLat([-97.196208, 49.816715]).addTo(map);
    const marker3 = new mapboxgl.Marker().setLngLat([-97.1881982, 49.8118703]).addTo(map);
    const marker4 = new mapboxgl.Marker().setLngLat([-97.1863782, 49.8139344]).addTo(map);
    map.setZoom(15);
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Manitoba Institute of Trades&Technology'
    );
    const el = document.createElement('div');
    el.id = 'marker';
    new mapboxgl.Marker(el)
        .setLngLat(monument)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    loader.style.visibility = 'hidden';
    board.classList.remove('board');
}

function errorHandler(error) {
    console.log(error.message);
}

window.onload = function () {
    getLocation();
}

map.on('load', () => {
    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Dairy Queen</strong><p>Classic burger and fries fast food chain serving ice cream cones and signature milkshakes.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1955112, 49.8164595]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Ben & Florentine</strong><p>This cozy eatery serves hearty fare from eggs waffles to burgers, and there is a kids menu.</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.196208, 49.816715]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Jim Pattison Subaru South</strong><p>subaru dealer</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1881982, 49.8118703]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Gerry Gordons Mazda</strong><p>Mazda dealer</p>'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-97.1863782, 49.8139344]
                    }
                },

            ]
        }
    })
    map.addLayer({
        'id': 'places',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-color': '#4264fb',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
})

map.on('mousemove', (e) => {
    document.getElementById('info').innerHTML =
        // `e.point` is the x, y coordinates of the `mousemove` event
        // relative to the top-left corner of the map.
        JSON.stringify(e.point) +
        '<br />' +
        // `e.lngLat` is the longitude, latitude geographical position of the event.
        JSON.stringify(e.lngLat.wrap());
});

const chapters = {
    'Dairy-Queen': {
        bearing: 27,
        center: [-97.1955112, 49.8164595],
        zoom: 15.5,
        pitch: 20
    },
    'Ben-Florentine': {
        duration: 6000,
        center: [-97.196208, 49.816715],
        bearing: 150,
        zoom: 15,
        pitch: 0
    },
    'Jim-Pattison': {
        center: [-97.1881982, 49.8118703],
        bearing: 90,
        speed:0.6,
        zoom: 15,
        pitch: 40
    },
    'Gerry-Gordons': {
        center: [-97.1863782, 49.8139344],
        bearing: 150,
        zoom: 15,
        pitch: 20,
        speed:0.5
    },
}


window.loader = function() {
    
}




