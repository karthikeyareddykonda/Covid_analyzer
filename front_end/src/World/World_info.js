import React from "react";
import WorldMap from "react-svg-worldmap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;

  const statOptions = [
    { value : 1 , label : "Deaths" },
    { value : 2, label : "Active cases"}
    

  ]

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

class World_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            Stat_options : null
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

        this.setcolor = this.setcolor.bind(this) ;

    }
    handleChange2 = selected => {
        this.setState({
  
          Stat_options : selected
  
  
        })
        console.log(selected) ;
      }

    componentDidMount(){

        // do nothing as of now 

    }

    handleSelect(date){
        console.log(date); // native Date object
      
      
    }

    setcolor(props){

        console.log("entere");
        console.log(props) ;
        var maxc = 0;
        for(var i = 0; i< props.data.length; i++){

            maxc = Math.max(maxc,props.data[i].value);

            
        } 
        console.log(this.data);
        for(var i = 0; i< props.data.length; i++){
          this.data[i].value = this.data[i].value/maxc ;
          
        }
        
        console.log(this.data);


      
        


    }

    render(){

        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          }


        return(

            

            <>
            {< this.setcolor data = {this.data} />}

            
            
            
            
                <h1> World page </h1>
            
                <WorldMap
                    color="red"
                    title="Top 10 Populous Countries"
                    
                    value-suffix="people"
                    size="responsive"
                    data={this.data}
                />

            <p>Select Statistic</p>
                <span
                    class="d-inline-block"
                    data-toggle="popover"
                    data-trigger="focus"
                    data-content="Please selecet account(s)"
                >
                    <ReactSelect
                    options={statOptions}
                    
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                        Option
                    }}
                    onChange={this.handleChange2}
                    
                    value={this.state.Stat_options}
                    />
                </span>
                <br></br>

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