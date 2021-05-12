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

          var featureLayer = new FeatureLayer({
          url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/East_Africa/FeatureServer/0"
        });
  
  const map = new Map({
          basemap: "dark-gray",
          layers: [featureLayer, layer]
        });
               
        var view = new MapView({
          container: "viewDiv",
          map: map, 
          center: [45, 9],
          scale: 13340000
        });
  });
