import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;


class Country_status extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India"
        }

        console.log("This is country status constructor") ;

    }

    componentDidMount(){

        // do nothing as of now 

    }

    render(){


        return(

            <>
            
            
            
                <h1> Country page </h1>

                <ul>
                    <li> Total cases : </li>
                    <li> Active cases : </li>
                    <li> Hospital Beds availability :</li>
                    <li> Vaccination :</li>
                    <li> Oxygen Demand :</li>
                    <li> Oxygen Supply : </li>


                </ul>
            
            
            
            </>





        )
    }

}



export default (props) => (
    <Country_status
        {...props}
        params={useParams()}
    />
);