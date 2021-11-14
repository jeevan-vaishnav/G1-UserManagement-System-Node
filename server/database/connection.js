const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    //mongodb connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false, not supported
      //   useCreateIndex: true,not supported
    });
    console.log(`MongoDB Connected : ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
