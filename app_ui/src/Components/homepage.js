import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputBox from "./inputBox";
import Papa from "papaparse";
import ResultPage from "./resultPage";
import axios from "axios";
// const spawn =require('child_process').spawn
const HomePage = () => {
  const [issubmit, setissubmit] = useState(0);
  //code added
  const [CSVData, setCSVData] = useState("");
  var commonConfig = { delimiter: "," };
  const [totalfile, settotalfile] = useState();
  const [jsonfile, setjsonfile] = useState({
    id: "122-34-6543",
    region: "NA",
    firstName: "Leanne",
    lastName: "Graham",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
    },
    occupation: "self-employed",
    age: 29,
    loanHistory: [
      {
        princicpal: 40000,
        periodInYears: "3",
        rateOfInterest: 10,
        collateral: [
          {
            assetName: "property",
            estimatedValues: 7000,
          },
        ],
      },
      {
        princicpal: 140000,
        periodInYears: "4",
        rateOfInterest: 12,
        isCommercial: true,
        collateral: [
          {
            assetName: "condo",
            estimatedValues: 30000,
          },
        ],
      },
      {
        princicpal: 60000,
        periodInYears: "4",
        rateOfInterest: 12,
      },
    ],
    liquid_assets: 100000,
    non_liquid_assets: 300000,
  });
  function parseData(e) {
    console.log(e);
    Papa.parse(e.target.files[0], {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        setCSVData(result.data);
      },
    });
  }
  function jsonDatareciever(e) {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      // console.log("e.target.result", e.target.result);
        setjsonfile(e.target.result);
    };
  }
  // console.log(CSVData, jsonfile);
  function callbackend(e) {
    axios({
      method:"POST",
      url:'http://localhost:8000/source',
      params:{
        map:CSVData,
        json:jsonfile
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded'}
    }).then(e => console.log(e)).catch(e => console.log(e));
  }
  function changePage(e) {
    callbackend(e);
    settotalfile([jsonfile, CSVData]);
    setissubmit(1);
  }

  // console.log(totalfile);
  // let strigifiedData=JSON.stringify(CSVData);
  // const py =spawn('python', ['script.py', strigifiedData]);
  // const [resultData, setresultData]=useState();
  // useEffect(()=>{
  //     let resultString=""
  //     py.stdout.on('data', function(stdData){
  //         resultString+=stdData.toString();
  //     })
  //     py.stdout.on('end', function(){
  //         setresultData(JSON.parse(resultString));
  //     })
  // })
  // console.log(resultData);
  if (issubmit === 0) {
    return (
      <>
        <div style={{ height: "50px" }}></div>

        <div style={{
          display: "flex",
          flexDirection: "column"
        }}>
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "auto",
              height: "100%",
            }}
          >
            <InputBox
              text="Source JSON"
              type="application/JSON"
              jsonDatareciever={jsonDatareciever}
            />
            <div style={{ height: "50px" }}></div>
            <InputBox text="Mapping File" type=".csv" parsing={parseData} />
          </div>
          <div
            style={{ marginTop: "2%", width: "100%", textAlign: "center" }}
          >
            <Button
              variant="contained"
              style={{ margin: "auto", width: "10%" }}
              onClick={(e) => changePage(e)}
            >
              Proceed
            </Button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <ResultPage fun={setissubmit} />
      </>
    );
  }
};
export default HomePage;
