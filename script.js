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
          url: ""https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Madison_WI_City_Wards/FeatureServer"
        });
        
        const clusterConfig = {
          type: "cluster",
          clusterRadius: "100px",
          popupTemplate: {
            content: "This cluster represents {cluster_count} urban trees.",
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
          title: "City of Madison: Urban Trees",
          url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/Madison_Trees/FeatureServer",
          copyright: "City of Madison, WI",
          featureReduction: clusterConfig,
        

          popupTemplate: {
            title: "Urban Tree Info",
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
              color: "green",
              outline: {
                color: "rgba(300, 0, 0, 0.4)",
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
          center: [37.7832, 5.5085],
          scale: 9340000
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
