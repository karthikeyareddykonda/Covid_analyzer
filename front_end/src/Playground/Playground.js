import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import makeAnimated from "react-select/animated";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from "react-chartjs-2";


import {
    BrowserRouter as Router ,
    Routes,
    Route,
    Link,
    useParams
  
  } from 'react-router-dom' ;



  const totalDuration = 1000;
  const delayBetweenPoints = totalDuration / 5;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };



class Playground extends React.Component{

    constructor(props){

        super(props); 

        this.state = {
            name : "India",
            mydata : [33, 53, 85, 41, 44, 65]
            
        }

        this.data = [1,2,3,4,5,6,7,8,9,1,2,4,4,5,6] ;

        console.log("This is Playground constructor") ;

    }

    

    

    componentDidMount(){

        // do nothing as of now 

    }
    
    render(){
       const  data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "First dataset",
                data: this.state.mydata,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
              }
            ]
          };


        return(

            <>
            
            
            
                <h1> Playground page </h1>
                <div className="App">
      <Line data={data}
      
      options = {{
        
        animations: animation
        
        
      }}
      
      
      
      
      />
    </div>
               
        

          
      
            
            
            
            </>





        )
    }

}



export default (props) => (
    < Playground
        {...props}
        params={useParams()}
    />
);