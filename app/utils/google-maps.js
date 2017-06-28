import Ember from 'ember';

const google = window.google;

export default Ember.Object.extend({


  init() {
    this.set('geocoder', new google.maps.Geocoder());
  },

  createMap(element, location) {
    let map = new google.maps.Map(element, { scrollwheel: true, zoom: 13 });
    this.pinLocation(location, map);
    return map;
  },



  pinLocation(location, map) {
    this.get('geocoder').geocode({address: location}, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        navigator.geolocation.getCurrentPosition(function(myPosition) {
          let pos = {
            lat: myPosition.coords.latitude,
            lng: myPosition.coords.longitude
          };
          //let geometry = result[0].geometry.location;
          let position = pos;
          map.setCenter(position);
          new google.maps.Marker({ position, map, title: location });
        });
      }
    });
  }

});