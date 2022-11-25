// var transform = require("node-json-transform").transform;
import express from "express";
// or
import { transform } from "node-json-transform";

var result = transform(
  {
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
  },
  {
    item: {
      SSN: ["ENUM(region)", "-", "id"],
      CustomerFullName: ["firstName", "lastName"],
      CustomerAddress: ["address.street", "address.suite"],
      CustomerCity: ["address.city"],
      CustomerZipCode: ["address.zipcode"],
      CustomerProfession: ["ENUM(.occupation)"],
      CustomerAge: ["age"],
      LoanHistory: [
        "IF(.loanHistory.item.collateral) THEN .loanHistory.item.collateral.estimatedValues ELSE 0",
      ],
      TotalAssets: ["liquid_assets", "non_liquid_assets"],
    },
  }
);
console.log(result);
