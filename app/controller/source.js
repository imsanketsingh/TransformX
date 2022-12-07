import express from "express";
const router = express.Router();
import { transform } from "node-json-transform";
import { PythonShell } from "python-shell";
import { json } from "stream/consumers";
function dataConverter(req, res) {
  let source = req.query.json;
  let map = req.query.map;
  console.log(source, map);
  map = JSON.stringify(map);
  source = JSON.stringify(source);
  let options = {
    scriptPath: "./controller/",
    args: [source, map],
    mode: 'text',
  };
  let finaldata = "Hello";
  PythonShell.run('final.py', options, async function (err, ans) {
    if (err)
      console.log(err);
    finaldata = ans;

  });
  function adjustData(data){
    let str=data.join("\n");
    console.log(typeof(str));
    // let newval=JSON.parse(str);
    console.log(str);
  }
  setTimeout(() => adjustData(finaldata), 1000);
}

export const getSource = async (req, res) => {
  dataConverter(req, res);
  try {
    return res.json("vinay mc");
  } catch (error) {
    console.log(error);
  }
};

export default router;
