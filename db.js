const mongoose = require("mongoose");
const URI =
  "mongodb+srv://satyajeethitk:S144oKzaEhLPdT02@cluster0.mlsvx83.mongodb.net/goFoodMern?retryWrites=true&w=majority";
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("db connected");
    const fetchCollection = mongoose.connection.db.collection("foodData");
    console.log("collection found");
    const data = await fetchCollection.find({}).toArray();
    if (!data) {
      console.log("error in fetching data from collection");
    } else console.log();
  } catch (error) {
    console.log("error from db", error);
  }
};
module.exports = connectDb;
