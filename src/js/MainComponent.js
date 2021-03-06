'use strict';

import React from 'react'

function CuadroTexto (props){
  return ( 
    <input style = {props.style.inputBoxStyle} type = "text" onChange = { (event) => {props.onChangeName(event)} } 
    onKeyDown = { (event) => { if (event.keyCode == 13) {props.submitDireccionMap(props.label)}}}/>
    )
}

function SearchButton (props){
  return (
      <button style = {props.style.searchButtonStyle} onClick = { () => {props.submitDireccionMap(props.label)}} >Buscar</button>
    )


}


class InputZone extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      label : "Escribe algo! :)"
    }
    this.onChangeName = this.onChangeName.bind(this);
  }

  onChangeName(event)
  {
    var text = event.target.value
    if (text.length == 0) {
      text = "Escribe algo! :)"
    }
    this.setState({label: text})
  }

  render(){
    return (
       <div >
          <div name = "InputLine">
            <CuadroTexto style = {this.props.style} onChangeName = {this.onChangeName} submitDireccionMap = {this.props.submitDireccionMap} label = {this.state.label}/> 
            <SearchButton style = {this.props.style} submitDireccionMap = {this.props.submitDireccionMap} label = {this.state.label} />
          </div>
          <span style = {this.props.style.inputStyle}>
          {this.state.label}
          </span>
       </div> 
      )
  }
}

class Mapa extends React.Component {
  constructor (props){
    super(props);
    //let map = new google.maps.Map();
    this.state = {map : null, center:this.props.center, markers : []}
  }

  componentDidMount(prevProps, prevState){

    //documento con la clave de la API de google
    let key = require ('../apiKeys/google/mapsKey');
    let url = "https://maps.googleapis.com/maps/api/js?key=" + key.appKey;
    //cargar el script y crear un mapa
    let self = this;
    loadScript(url, function() {
      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: self.props.mapLocation
      })
      self.setState({map: map});
    });

  }
    componentDidUpdate(nextProps, nextState) {
      this.state.map.setCenter(this.props.center)

      let image = "./img/gota.png"
      let map = this.state.map
      let center = this.props.center
      let dropMarker = new google.maps.Marker({
        position: center,
        map: map,
        icon: image});
      this.state.markers.push(dropMarker);
      console.log(this.state.center)
      //console.log(this.state.markers)
  }

  render (){
    let mapStyles = require ('../styles/mapStyle.js')
    return (
      <div>
        <div style = {mapStyles.mapStyle} id = 'map'>MAPA</div>
      </div>
      ) 

  }

}




class MainComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {busqueda: "nada", mapCenter: {lat: 40.4167754, lng: -3.7037901999999576} }
    this.submitDireccionMap = this.submitDireccionMap.bind(this)
  }

  submitDireccionMap(text){
    var geocoder = new google.maps.Geocoder();
    let self = this;
    geocoder.geocode( {'address': text}, function(results, status){
      if (status == 'OK'){
          let center = results[0].geometry.location
          self.setState({mapCenter: center})
      }
      else {
        console.log('ERROR DE GEOCODING: ' + status);
      }
    })

    //window.open('http://127.0.0.1:8000/hola');
    fetch('http://127.0.0.1:8000/response')
      .then((res) => {return res.json()})
      .then((data) => {
           console.log(data);
           this.setState({busqueda: data.nombre})
      })
  }

  render () {
    let mapStyles = require ('../styles/mapStyle.js')
    return (
      <div>
        <h1 style = {mapStyles.inputStyle}>Hola :)</h1>
        <h3> {this.state.busqueda} </h3>
        <InputZone style = {mapStyles} submitDireccionMap = {this.submitDireccionMap}/>
        <Mapa center = {this.state.mapCenter}/>
      </div>
    )
  }
}

//funcion para ejecutar el script de google y poder utilizar su API, sacado de: https://forums.meteor.com/t/error-connecting-google-maps-through-script-tag-in-react-js/32834/2
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

export default MainComponent