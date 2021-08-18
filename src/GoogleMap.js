import React, { useContext, useEffect, useState } from "react";
import { DetailsContext } from "./DetailsContext";
import { DrawingManager } from '@react-google-maps/api';
import { navigate } from "@reach/router";
import DrawingCmp from "./DrawingCmp";
import './Spinner.css';
import { window, document } from "browser-monads";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
import './GoogleMap.css';
import axios from "axios";
import qs from "qs";

const libraries = ["places", "drawing", "geometry"];
const mapContainerStyle = {
    height: "70vh",
    width: "100vw",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};
// let center = {
//     lat: 53.958332,
//     lng: -1.080278,
// };
let place = '';
export default function GoogleMap2() {
    // const [details, setDetails] = useContext(DetailsContext);
    let obj = window.localStorage.getItem('constructionUser');
    if (typeof (obj) == "string") {
        obj = JSON.parse(obj);
    } else {
        obj = {};
    }
    const [details, setDetails] = useState(obj);
    place = details.place ? details.place : ''

    let center = details.postcode_center ? details.postcode_center : {
        lat: 53.958332,
        lng: -1.080278,
    };
    //console.log(details.postcode_center)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(18);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    async function handleSubmit(e) {
        obj = window.localStorage.getItem('constructionUser');
        if (typeof (obj) == "string") {
            obj = JSON.parse(obj);
        } else {
            obj = {};
        }
        e.preventDefault();
        document.querySelector('.cont').style.display = 'block';
        console.log(obj);
        var data = qs.stringify({
            'url': obj.image_url_api
        });
        var config = {
            method: 'post',
            url: process.env.GATSBY_APP_HEROKU + '/getImageUrl',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        //console.log(data);
        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                let data1 = JSON.stringify(response.data);
                console.log(data1);
                data1 = JSON.parse(data1);
                //console.log(data1.body)
                
                obj.image_url = data1.body;
                window.localStorage.setItem('constructionUser', JSON.stringify(obj));
                navigate("/confirmDetails");
            })
            .catch(function (error) {
                console.log(error)
                alert('Something went wrong, Please try Again')
                document.querySelector('.cont').style.display = 'none';
                navigate('/selectArea')
            });
    }
    return (
        <div className="g-map">
            {/* <Locate panTo={panTo} /> */}
            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={18}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <DrawingCmp />
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                        icon={{
                            url: `/bear.svg`,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                <span role="img" aria-label="bear">
                                    🐻
                                </span>{" "}
                                Alert
                            </h2>
                            <p>Spotted {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
            {/* Spinner */}
            <div className="cont" style={{ display: 'none' }}>
                <div className="loader"></div>
                <h2>Please Hold On, Submitting your details...</h2>
            </div>
            <button className="btn_submit2 construct2" type="submit" onClick={handleSubmit}><i class="fas fa-arrow-right"></i>Next</button>
        </div>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });
    
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        place = '';
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };
    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value=='' ? place:value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}