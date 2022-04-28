import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import makeAnimated from "react-select/animated";
import { default as ReactSelect } from "react-select";
import { DateRangePicker } from 'react-date-range';
import { components } from "react-select";
import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;

  const colourOptions = [
    { value: 1, label: "Country 1" },
    { value: 2, label: "Country 2" },
    { value: 3, label: "Country 3" },
    { value: 4, label: "Country 4" },
    { value: 5, label: "Country 5" }
  ];

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


class Stats_info extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            Country_Selected: null,
            Stat_options : null

        }

        console.log("This is stats constructor") ;

    }

    handleChange = selected => {
        this.setState({
          Country_Selected: selected
        });

        console.log(this.state.optionSelected) ;
        console.log(selected) ;
      };

    handleChange2 = selected => {
      this.setState({

        Stat_options : selected


      })
      console.log(selected) ;
    }

    handleSelect(date){
      console.log(date); // native Date object
    
    
  }

    componentDidMount(){

        // do nothing as of now 

    }

    render(){
      const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }

        return(

            <>
            
            
            
                <h1> Stats page </h1>
                <p>Select Countries</p>
                <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          options={colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>

          <br></br>
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

      <p> Select the date range </p>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
            
            
            
            </>





        )
    }

}



export default (props) => (
    <Stats_info
        {...props}
        params={useParams()}
    />
);