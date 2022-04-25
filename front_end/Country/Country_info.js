import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Country_status from "./Country_status"; 
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;


class Country_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India"
        }

        console.log("This is country constructor") ;

    }

    componentDidMount(){

        // do nothing as of now 

    }

    render(){


        return(

            <>
            
            
            
                <h1> Country page </h1>
            


               


                <ul>

                    <li>

                    <Link to = "/Country/status"  > Country </Link>
                    </li>

                    

                    


                    

                    
                </ul>
                
            
            </>





        )
    }

}



export default (props) => (
    <Country_info
        {...props}
        params={useParams()}
    />
);