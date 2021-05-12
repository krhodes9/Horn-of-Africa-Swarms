 require([
        "esri/Map",
        "esri/layers/FeatureLayer",
        "esri/layers/GeoJSONLayer",
        "esri/views/MapView",
         "esri/widgets/Legend",
        "esri/widgets/Expand",
        "esri/widgets/Home",
        "esri/WebMap",
      ], function(Map, FeatureLayer, GeoJSONLayer, MapView, Legend, Expand, Home, WebMap) {
        
         var map = new Map({
          basemap: "dark-gray"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 10,
          center: [-90, 38] // longitude, latitude
        });
      });
