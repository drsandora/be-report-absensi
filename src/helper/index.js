const bcrypt = require("bcrypt");
const axios = require("axios");

const {
  APP_SECRET,
  TEMP_SECRET
} = require("../config");

module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };


//Raise Events
module.exports.PublishAuthEvent = async (payload) => {
  const res = axios.post("http://localhost:8000/app-events", {
    payload,
  });
};

// module.exports.PublishShoppingEvent = async (payload) => {
//   // axios.post('http://gateway:8000/shopping/app-events/',{
//   //         payload
//   // });

//   axios.post(`http://shopping:8003/app-events/`, {
//     payload,
//   });
// };