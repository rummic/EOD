import React, { Component } from "react";





class sharedfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
          value: "",
        };
      }
    
      componentDidMount() {
        fetch("https://localhost:44388/api/Documents/DocumentSeen"+ window.location.search,{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },})
          .then(response => response.json())
          .then(parseJSON => {
            this.setState({
                value: parseJSON.value
              });
          });

      }
    render() {
        console.log(window.location.search)
        console.log(this.state.value)
        window.open('https://localhost:44388/Documents/'+ this.state.value, "_blank")
      return (
        null
      );
    }
  }
  
  export default sharedfiles;