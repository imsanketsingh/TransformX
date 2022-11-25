import { Button } from "@mui/material";
import React, { useState,useEffect } from "react";
import InputBox from "./inputBox";
import Papa from "papaparse"
import ResultPage from "./resultPage";
import axios from "axios";
// const spawn =require('child_process').spawn
const HomePage = () => {
  const [linespace, setlinespace] = useState("10px");
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
    // console.log(e);
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
      //   setjsonfile(e.target.result);
    };
  }
  function changePage(e) {
    callbackend(e);
    settotalfile([jsonfile, CSVData]);
    setissubmit(1);
  }
  async function callbackend(e) {
    const response = await fetch("http://localhost:3000/source", {
      method: "POST",
      mode: "no-cors",
      body: jsonfile,
    });
    console.log(response);
  }
  console.log(totalfile);
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
        <div style={{ height: "100px" }}></div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%" }}>
            <div
              style={{
                backgroundColor: "#f8ecbc",
                width: "80%",
                margin: "auto",
                border: "2px solid black",
                borderRadius: "20px",
                fontSize: "25px",
              }}
            >
              <h3 style={{ textAlign: "center", fontSize: "35px" }}>Steps:</h3>
              <ol>
                <li style={{ marginTop: linespace }}>
                  Upload the Source JSON and the Mapping files. Supported
                  extension for the Mapping file is "csv"{" "}
                </li>
                <br />
                <li style={{ marginTop: linespace }}>Click on "Proceed".</li>
                <br />
                <li style={{ marginTop: linespace }}>
                  A new page will open with the newly converted JSON file and
                  the respective Code.
                </li>
                <br />
                <li style={{ marginTop: linespace }}>
                  User may download the JSON file and the Code.
                </li>
              </ol>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
            <div
              style={{ marginTop: "5%", width: "100%", textAlign: "center" }}
            >
              <Button
                variant="contained"
                style={{ margin: "auto", width: "30%" }}
                onClick={(e) => changePage(e)}
              >
                Proceed
              </Button>
            </div>
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