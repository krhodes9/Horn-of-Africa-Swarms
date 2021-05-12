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
      
     const clusterConfig = {
          type: "cluster",
          clusterRadius: "100px",
          popupTemplate: {
            content: "This cluster represents {cluster_count} locust swarms.",
            fieldInfos: [{
              fieldName: "cluster_count",
              format: {
                places: 0,
                digitSeparator: true
              }
            }]
          },
          clusterMinSize: "24px",
          clusterMaxSize: "60px",
          labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')"
            },
            symbol: {
              type: "text",
              color: "white",
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: "12px"
              }
            },
            labelPlacement: "center-center",
          }]
        }

        var layer = new FeatureLayer({
          title: "East Africa Locust Swarms",
          url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Swarms_East_Africa/FeatureServer/0",
          copyright: "FAO",
          featureReduction: clusterConfig,
        

          popupTemplate: {
            title: "Locust Info",
            content: "Number {mag} {type} hit {place} on {time}",
            fieldInfos: [
              {
                fieldName: "time",
                format: {
                  dateFormat: "short-date-short-time"
                }
              }
            ]
          },
          renderer: {
            type: "simple",
            field:"",
            symbol: {
              type: "simple-marker",
              size: 4,
              color: "deeppink",
              outline: {
                color: "rgba(0, 200, 150, 0.4)",
                width: 3
              }
            }
          }
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
  
         view.ui.add(new Home({
          view: view
        }), "top-left");

       const legend = new Legend({
          view: view,
          container: "legendDiv"
        });

        const infoDiv = document.getElementById("infoDiv");
        view.ui.add(new Expand({
          view: view,
          content: infoDiv,
          expandIconClass: "esri-icon-layer-list",
          expanded: false
        }), "top-left");

        const toggleButton = document.getElementById("cluster");

        toggleButton.addEventListener("click", function(){
          let fr = layer.featureReduction;
          layer.featureReduction = fr && fr.type === "cluster" ? null : clusterConfig;
          toggleButton.innerText = toggleButton.innerText === "Enable Clustering" ? "Disable Clustering" : "Enable Clustering";
                  
        }); 
      });
