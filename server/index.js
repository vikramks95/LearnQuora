const express = require('express');
const app = express();



const dbConnect = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
// const razaropay  = require('./config/razorpay')

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
// const paymentRoutes = require('./routes/Payment');
const contactRoutes = require('./routes/Contact');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');


const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');



require("dotenv").config();
const PORT = process.env.PORT || 5000 ;

// middlewares
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:5174",  // Your React frontend
  "http://localhost:5173",  // Optional if you use other ports
  "http://localhost:3000"   // Optional if you used CRA before
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

// app.use(cors({ origin: "*", credentials: true }));
app.use(
    fileUpload({
        useTempFiles : true ,
        tempFileDir : "/tmp"
    })
)


// database connection 
dbConnect();

// cloudinary connect
cloudinaryConnect();

// mount the routes 
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
// app.use("api/v1/payments" , paymentRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/contact" , contactRoutes);
app.use("/api/v1/payment" , paymentRoutes)

// def route
app.get('/' , (req , res) => {
    return res.json({
        success : true ,
        message : "Your Server is up and running"
    })
})


app.listen(PORT , () => {
    console.log(`Your app is running on the port number ${PORT}`);
})









