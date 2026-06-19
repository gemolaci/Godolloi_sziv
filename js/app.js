(function () {
  var gpxPath = "assets/gpx/godolloi-sziv-maraton.gpx";
  var status = document.getElementById("map-status");

  var map = L.map("map", {
    scrollWheelZoom: false
  }).setView([47.596, 19.355], 12);

    // ✅ elevation control
    var elevationControl = L.control.elevation({
        theme: "magenta-theme",
        detached: true,
        elevationDiv: "#elevation-div",
        height: 180,
        autohide: false,
        collapsed: false,
        polyline: false,
        detached: true,
        waypoints: false,
        autofitBounds: true,
        summary: false,
        time: false
    });

    elevationControl.addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> közreműködők'
  }).addTo(map);
   

    // ✅ unique icons
    var startIcon = L.icon({
        iconUrl: 'assets/icons/start.png',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30],
        zIndexOffset: 0
    });

    var cpIcon = L.icon({
        iconUrl: 'assets/icons/cp.png',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30],
        zIndexOffset: 2000
    });

    var rpIcon = L.icon({
        iconUrl: 'assets/icons/rp.png',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30],
        zIndexOffset: 1000
    });

    var rpNotIcon = L.icon({
        iconUrl: 'assets/icons/rp_not.png',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30],
        zIndexOffset: 500
    });

    var runnerIcon = L.icon({
        iconUrl: 'assets/icons/run.png',
        iconSize: [34, 34],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
    });

    var route = new L.GPX(gpxPath, {
        async: true,

        marker_options: {
            startIconUrl: null, //https://unpkg.com/leaflet-gpx@1.7.0/pin-icon-start.png",
            endIconUrl: null, //"https://unpkg.com/leaflet-gpx@1.7.0/pin-icon-end.png",
            shadowUrl: "https://unpkg.com/leaflet-gpx@1.7.0/pin-shadow.png",            
            wptIconUrls: {
                '': 'assets/icons/start.png'
            }

        },

        polyline_options: {
            color: "#fc56ac",
            opacity: 0.92,
            weight: 5,
            lineCap: "round"
        }
    });

    // ✅ waypoint handling
    route.on("addpoint", function (e) {
        if (!e.point) return;

        var rawName = e.point.options.title || "";

        var name = rawName
            .trim()
            .replace(/\s+/g, " ")
            .toUpperCase();

        const rpList = ["CSAP", "KÚT"];
        const rpNotList = ["NEM MŰKÖDŐ KÚT", "NEM MŰKÖDŐ CSAP"];

        var icon = cpIcon;

        if (rpNotList.includes(name)) {
            icon = rpNotIcon;
        } else if (rpList.includes(name)) {
            icon = rpIcon;
        }

        // ✅ icon replacement
        e.point.setIcon(icon);
        e.point.setZIndexOffset(icon.options.zIndexOffset || 0);

        // ✅ popup
        if (rawName) {
            e.point.bindPopup("<b>" + rawName + "</b>");
        }
    });


    route.on("addline", function (e) {
        elevationControl.addData(e.line);
    });


    route.on("loaded", function (event) {
        var gpxLayer = event.target;

        let startLatLng = null;
        function findPolyline(layer) {
            if (layer instanceof L.Polyline) {
                let latlngs = layer.getLatLngs();

                if (Array.isArray(latlngs[0])) {
                    latlngs = latlngs[0];
                }

                startLatLng = latlngs[0];
            }

            if (layer.eachLayer) {
                layer.eachLayer(findPolyline);
            }
        }

        findPolyline(event.target);



        if (!startLatLng) {
            console.warn("Nincs startLatLng");
            return;
        }

        L.marker(startLatLng, {
            icon: startIcon,
        }).addTo(map).bindPopup("<b>Start</b>");

        map.fitBounds(event.target.getBounds(), {
          padding: [26, 26]
    });

    var distanceKm = event.target.get_distance() / 1000;
    status.textContent = "GPX betöltve: " + distanceKm.toFixed(1) + " km";
  });

  route.on("error", function () {
    status.textContent = "A GPX fájl nem tölthető be. Ellenőrizd az assets/gpx mappát.";
  });

    route.addTo(map);   


    // ✅ LEGEND BOX
    var legend = L.control({ position: 'topright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'map-legend');

        div.innerHTML = `
        <div class="legend-title">Jelmagyarázat</div>
        <div class="legend-item">
            <img src="assets/icons/start.png">
            <span>GPX kezdőpont</span>
        </div>
        <div class="legend-item">
            <img src="assets/icons/cp.png">
            <span>Ellenőrző pont</span>
        </div>
        <div class="legend-item">
            <img src="assets/icons/rp.png">
            <span>Vízvételi pont</span>
        </div>
        <div class="legend-item">
            <img src="assets/icons/rp_not.png">
            <span>Nem működő kút</span>
        </div>
    `;

        return div;
    };

    legend.addTo(map);
    L.DomEvent.disableClickPropagation(legend.getContainer());

})();
