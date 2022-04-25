import React from "react";
import WorldMap from "react-svg-worldmap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;


class World_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India"
        }

        console.log("This is world constructor") ;

        this.data = [
            { country: "cn", value: 1389618778 }, // china
            { country: "in", value: 1311559204 }, // india
            { country: "us", value: 331883986 }, // united states
            { country: "id", value: 264935824 }, // indonesia
            { country: "pk", value: 210797836 }, // pakistan
            { country: "br", value: 210301591 }, // brazil
            { country: "ng", value: 208679114 }, // nigeria
            { country: "bd", value: 161062905 }, // bangladesh
            { country: "ru", value: 141944641 }, // russia
            { country: "mx", value: 127318112 }, // mexico
          ];

    }

    componentDidMount(){

        // do nothing as of now 

    }

    handleSelect(date){
        console.log(date); // native Date object
      
      
    }

    render(){

        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          }


        return(

            <>
            
            
            
                <h1> World page </h1>
            
                <WorldMap
                    color="red"
                    title="Top 10 Populous Countries"
                    
                    value-suffix="people"
                    size="responsive"
                    data={this.data}
                />

                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={this.handleSelect}
                />
            
            
            </>





        )
    }

}



export default (props) => (
    <World_info
        {...props}
        params={useParams()}
    />
);