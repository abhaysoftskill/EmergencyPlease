import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from "react-native";
// import { Container, Text } from "native-base";

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
// var Polyline = require('@mapbox/polyline');

class LocationA extends Component {
    constructor(props) {
        super(props)
        this.state = {
          coords: []
        }
      }
    
      componentDidMount() {
        // find your origin and destination point coordinates and pass it to our method.
        // I am using Bursa,TR -> Istanbul,TR for this example
        this.getDirections("40.1884979, 29.061018", "41.0082,28.9784")
      }
    
      async getDirections(startLoc, destinationLoc) {
            try {
                // googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
                let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyCGLgQXcqtOT_DzZI4gavScYkaqFc5EuTw&origin=${ startLoc }&destination=${ destinationLoc }`)
                console.log(resp)
                let respJson = await resp.json();
                console.log(respJson)

                let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return  {
                        latitude : point[0],
                        longitude : point[1]
                    }
                })
                this.setState({coords: coords})
                return coords
            } catch(error) {
                alert(error)
                return error
            }
        }
    
      render() {
        return (
          <View>
            <MapView style={styles.map} initialRegion={{
              latitude:41.0082, 
              longitude:28.9784, 
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}>
    
            <MapView.Polyline 
                coordinates={this.state.coords}
                strokeWidth={2}
                strokeColor="red"/>
    
            </MapView>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

export default LocationA;