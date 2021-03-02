 require([
        "esri/Map",
        "esri/layers/FeatureLayer",
        "esri/layers/GeoJSONLayer",
        "esri/views/MapView",
         "esri/widgets/Legend",
        "esri/widgets/Expand",
        "esri/widgets/Home",
        "esri/WebMap"
      ], function(Map, FeatureLayer, GeoJSONLayer, MapView, Legend, Expand, Home, WebMap) {

          var featureLayer = new FeatureLayer({
          url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/arcgis/rest/services/DL_Breeding_Sites/FeatureServer"
        });
        
        // Configures clustering on the layer. A cluster radius
        // of 100px indicates an area comprising screen space 100px
        // in length from the center of the cluster
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
              color: "#004a5d",
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: "12px"
              }
            },
            labelPlacement: "center-center",
          }]
        }

        const layer = new GeoJSONLayer({
          title: "Desert Locust Swarms",
          url: "https://opendata.arcgis.com/datasets/b3f84bff1c514484be7f4d65098f9372_0.geojson",
          copyright: "FAO of United Nations",
          featureReduction: clusterConfig,
          // popupTemplates can still be viewed on
          // individual features
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
            field: "mag",
            symbol: {
              type: "simple-marker",
              size: 4,
              color: "orange",
              outline: {
                color: "rgba(0, 139, 174, 0.5)",
                width: 4
              }
            }
          }
        });

        const map = new Map({
          basemap: "gray",
          layers: [featureLayer, layer]
        });
               
        var view = new MapView({
          container: "viewDiv",
          map: map, 
          center: [20.7832, 20.5085],
          scale: 33033300
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

        // To turn off clustering on a layer, set the
        // featureReduction property to null
        toggleButton.addEventListener("click", function(){
          let fr = layer.featureReduction;
          layer.featureReduction = fr && fr.type === "cluster" ? null : clusterConfig;
          toggleButton.innerText = toggleButton.innerText === "Enable Clustering" ? "Disable Clustering" : "Enable Clustering";
                  
        });
      });
