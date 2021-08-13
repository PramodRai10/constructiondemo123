/* global google */
import React, { useContext } from "react";
import { DrawingManager } from "@react-google-maps/api";
import { DetailsContext } from "./DetailsContext"

const DrawingComponent = () => {

    const [details, setDetails] = useContext(DetailsContext);
    const onLoad = (drawingManager) => {
        console.log("drawingManager", drawingManager);
    };

    const onPolygonComplete = (polygon) => {
        var polygonBounds = polygon.getPath();

        console.log(polygonBounds.getNorthEast());
        console.log(polygon);
        var bounds = [];
        var link_str = "https://maps.googleapis.com/maps/api/staticmap?size=640x640&path=";
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = {
                lat: polygonBounds.getAt(i).lat(),
                lng: polygonBounds.getAt(i).lng()
            };
            link_str += `${point.lat},${point.lng}|`
            bounds.push(point);
        }
        link_str += `${bounds[0].lat},${bounds[0].lng}`
        link_str += `&sensor=false&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`
        //console.log(link_str);
        var result = parseFloat(window.google.maps.geometry.spherical.computeArea(polygon.getPath())) * 0.000247105;
        var area = result.toFixed(4);
        //console.log(bounds);

        //console.log(area);
        setDetails({
            ...details, map_coordinates: bounds, shape: 'Polygon', area: area, image_url_api: link_str
        });
        // polygon.setMap(null);
    };
    // const onCircleComplete = (circle) => {
    //     console.log(circle);
    //     var bounds = circle.getBounds();
    //     console.log(bounds);
    //     var start = bounds.getNorthEast();
    //     var end = bounds.getSouthWest();
    //     var center = bounds.getCenter();
    //     //console.log(start, end, center);

    //     var bounds = [{
    //         NorthEast: {
    //             lat: start.lat(),
    //             lng: start.lng()
    //         }
    //     }, {
    //         SouthWest: {
    //             lat: end.lat(),
    //             lng: end.lng()
    //         }
    //     }, {
    //         Center: {
    //             lat: center.lat(),
    //             lng: center.lng()
    //         }
    //     }];
    //     console.log(bounds);

    //     var link_str = "https://maps.googleapis.com/maps/api/staticmap?size=640x640&path=";
    //     for (var i = 0; i < bounds.length; i++) {
    //         var point = Object.values(bounds[i])[0];
    //         link_str += `${point.lat},${point.lng}|`
    //     }
    //     // for (var i = 0; i < polygonBounds.length; i++) {
    //     //     var point = {
    //     //         lat: polygonBounds.getAt(i).lat(),
    //     //         lng: polygonBounds.getAt(i).lng()
    //     //     };
    //     //     link_str += `${point.lat},${point.lng}|`
    //     //     bounds.push(point);
    //     // }
    //     link_str += `${bounds[0].lat},${bounds[0].lng}`
    //     link_str += `&sensor=false&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`
    //     console.log(link_str);
    //     // var result = parseFloat(window.google.maps.geometry.spherical.computeArea(polygon.getPath())) * 0.000247105;
    //     // var area = result.toFixed(4);
    //     // //console.log(bounds);

    //     // //console.log(area);
    //     // setDetails({
    //     //     ...details, map_coordinates: bounds, shape: 'Polygon', area: area, image_url_api: link_str
    //     // });
    //     // polygon.setMap(null);
    // };


    return (
        <DrawingManager
            onLoad={onLoad}
            drawingMode="polygon"
            onCircleComplete={onPolygonComplete}
            options={{
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON]
                },
                polygonOptions: { editable: true }
                // circleOptions: {
                //     // fillColor: '#ffff00',
                //     // fillOpacity: 1,
                //     strokeWeight: 5,
                //     clickable: false,
                //     editable: true,
                //     zIndex: 1
                // }
            }}
        />
    );
};

export default DrawingComponent;
