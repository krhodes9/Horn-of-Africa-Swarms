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
        
        const map = new Map({
          basemap: "dark-gray",
          layers: []
        });
               
        var view = new MapView({
          container: "viewDiv",
          map: map, 
          center: [45, 9],
          scale: 13340000
        });
      });
