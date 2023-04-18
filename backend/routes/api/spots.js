const express = require("express");


const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
// get all spots
router.get("/", async (req,res) =>{
})
module.exports = router;
