import express from "express";
// const express = require("express");
// import { dummy } from "./target";
const router = express.Router();

// var transform = require("node-json-transform").transform;
import { transform } from "node-json-transform";
// import { PythonShell } from "python-shell";
// or
// var { transform } = require("node-json-transform");

// const temp = {
//   id: "1",
//   regin: "India",
//   pakistan: "fasd",
// };
// const temp2 = {
//   id: "34",
//   regin: "Japan",
//   pakistan: "fasd",
// };

export const getSource = async (req, res) => {
  console.log(req);
  let source = {
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
  };
  const map = {
    item: {
      SSN: ["1", "-", "122-34-6543"],
      CustomerFullName: ["firstName", "lastName"],
      CustomerAddress: ["address.street", "address.suite"],
      CustomerCity: ["address.city"],
      CustomerZipCode: ["address.zipcode"],
      CustomerProfession: ["SELF"],
      CustomerAge: ["age"],
      TotalAssets: ["liquid_assets", "non_liquid_assets"],
    },
    operate: [
      {
        run: (SSN) => {
          return "1-122-34-6543";
        },
        on: "SSN",
      },

      {
        run: (CustomerFullName) => {
          return CustomerFullName[0] + " " + CustomerFullName[1];
        },
        on: "CustomerFullName",
      },

      {
        run: (CustomerAddress) => {
          return CustomerAddress[0] + " " + CustomerAddress[1];
        },
        on: "CustomerAddress",
      },

      {
        run: (CustomerCity) => {
          return CustomerCity[0];
        },
        on: "CustomerCity",
      },

      {
        run: (CustomerZipCode) => {
          return CustomerZipCode[0];
        },
        on: "CustomerZipCode",
      },

      {
        run: (CustomerProfession) => {
          return "SELF";
        },
        on: "CustomerProfession",
      },

      {
        run: (CustomerAge) => {
          return CustomerAge[0];
        },
        on: "CustomerAge",
      },

      {
        run: (TotalAssets) => {
          return TotalAssets[0] + TotalAssets[1];
        },
        on: "TotalAssets",
      },
    ],
  };

  // stringifiedData = JSON.stringify(stringifiedData);
  // source = JSON.stringify(source);
  // let options = {
  //   scriptPath: "./controller/",
  //   args: [source, stringifiedData],
  //   mode: 'text',
  // };
  // let finaldata;

// let pyshell= new PythonShell("final.py", options);
// var s =await new pyshell.on('message', function (message) {
//   // received a message sent from the Python script (a simple "print" statement)
//   finaldata=message;
// });
//   console.log(s.message);

  //console.log(resultstring);
  

  // var result = transform({ source }, { map });

  // dummy(source, map);
  // const temp = {
  //   id: "1",
  //   regin: "India",
  //   pakistan: "fasd",
  // };
  // const temp2 = {
  //   id: "34",
  //   regin: "Japan",
  //   pakistan: "fasd",
  // };
  const final = transform(source, map);
  // console.log(final);
  console.log(res);
  try {
    return res.json("vinay mc");
  } catch (error) {
    console.log(error);
  }
};

export default router;
