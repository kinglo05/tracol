const functions = require("firebase-functions");
const axios = require("axios");

exports.triggerWebApp = functions.pubsub
    .schedule("50 23 * * *")
    .timeZone("Asia/Manila")
    .onRun(async (context) => {
        try {
            const response = await axios.get("https://yourwebapp.com/trigger-save");
            console.log("Web app function triggered:", response.data);
        } catch (error) {
            console.error("Error triggering web app function:", error);
        }
        return null;
    });
