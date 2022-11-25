import express from "express";
// const express = require("express");

// import { postJson } from "../controller/target.js";
import { getSource } from "../controller/source.js";
// const getPost = require("../controller/source.js");

const router = express.Router();

router.post("/", getSource);
// router.post("/target", postJson);

export default router;

// module.exports = router;
