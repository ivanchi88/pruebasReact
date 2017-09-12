'use strict';

import React from 'react'

class MyComponent extends React.Component {

  constructor (props) {
    super(props)
  }


  render () {
    return (
      <div>
        <h1>HOLA :)</h1>
        <InputZone/>
      </div>
    )
  }
}


function CuadroTexto (props){
  return (
  <div>
      <input type = "text" onChange = { (event) => {props.onChangeName(event)} } />
  </div>)
}


class InputZone extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      label : "hola"
    }
    this.onChangeName = this.onChangeName.bind(this);
  }

  onChangeName(event)
  {
    var text = event.target.value
    console.log(text)
    //console.log (this.state.label)
    this.setState({label: text})
  }

  render(){
    return (
       <div>
       <CuadroTexto onChangeName = {this.onChangeName}/>
       {this.state.label}
       </div> 
      )
  }
}

export default MyComponent