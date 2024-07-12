// models/Auction.js
const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    name: { type: String, required: true },
    startingBid: { type: Number, required: true },
    imageUrl: { type: String },
    timeRemaining: { type: Number },
    timeCurrent: { type: Number },
    winner:{ type: String },
    lastSpear: { type: String },
    description: { type: String }
    
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
