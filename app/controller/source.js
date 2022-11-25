import express from "express";
// const express = require("express");
// import { dummy } from "./target";
const router = express.Router();

// var transform = require("node-json-transform").transform;
import { transform } from "node-json-transform";
import spawn from "child_process";
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
  const source = {
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
  // let strigifiedData = JSON.stringify(res.params.map);
  // const py = spawn("python", ["./final.py", strigifiedData]);
  // const resultstring = "";
  // const resultData = "";
  // py.stdout.on([source, strigifiedData], function (stdData) {
  //   resultstring += stdData.toString();
  // });
  // py.stdout.on("end", function () {
  //   resultData = JSON.parse(resultstring);
  // });
  console.log(source);
  //   var result = transform({ source }, { map });

  //   dummy(source, map);
  //   const temp = {
  //     id: "1",
  //     regin: "India",
  //     pakistan: "fasd",
  //   };
  //   const temp2 = {
  //     id: "34",
  //     regin: "Japan",
  //     pakistan: "fasd",
  //   };
  const final = transform(source, map);
  console.log(final);
  try {
    return res.json("hello");
  } catch (error) {
    console.log(error);
  }
};;;;;

export default router;
