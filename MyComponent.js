'use strict';

import React from 'react'

function CuadroTexto (props){
  return ( 
    <input type = "text" onChange = { (event) => {props.onChangeName(event)} } />
    )
}

function SearchButton (props){
  return (
      <button onClick = { () => {props.onSubmitButton(props.label)}}>Buscar</button>
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
       <div>
          <div name = "InputLine">
            <CuadroTexto onChangeName = {this.onChangeName}/> 
            <SearchButton onSubmitButton = {this.props.onSubmitButton} label = {this.state.label} />
          </div>
          {this.state.label}
       </div> 
      )
  }
}

class Mapa extends React.Component {
  constructor (props){
    super(props);
    //let map = new google.maps.Map();
    this.state = {map : null, center:this.props.center}
  }

  componentDidMount(prevProps, prevState){

    //documento con la clave de la API de google
    let key = require ('./mapsKey');
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
  }

  render (){
    
    return (
      <div>
        <div style = {{height: '400px', width: '400px'}} id = 'map'>MAPA</div>
      </div>
      ) 

  }

}




class MyComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {busqueda: "", mapCenter: {lat: 40.4167754, lng: -3.7037901999999576}, }
    this.onSubmitButton = this.onSubmitButton.bind(this)
  }

  onSubmitButton(text){
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
  }

  render () {
    return (
      <div>
        <h1>HOLA :)</h1>
        <InputZone onSubmitButton = {this.onSubmitButton}/>
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

export default MyComponent