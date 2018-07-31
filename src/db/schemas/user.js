"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    //  _id: ObjectId,
    discord_id: { type: String, required: true, unique: true, maxlength: 18, minlength: 18 },
    admin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    developer: { type: Boolean, default: false },
    scripts: [ { type: Schema.Types.ObjectId, default: [] } ],

    bio: { type: String, default: "i love dick" },
    about: { type: String, default: "OCEAN MAN" },
    socials: [{
        icon: { type: String, required: true },
        name: { type: String, required: true },
        link: { type: String, required: true }
    }],
    trophies: [ { type: String, required: true } ],
    banner: { type: String, default: "https://ddlc.moe/images/itch-banner.png" },
    artwork: [ { type: String, required: true } ],
    activity: { type: Number, default: 0 },
    shits: { type: Number, default: 0 },
    modules: {
        about: { type: Boolean, default: true },
        artwork: { type: Boolean, default: true }
    }
});

module.exports = mongoose.model("User", UserSchema);
