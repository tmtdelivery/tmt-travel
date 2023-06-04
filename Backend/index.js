import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://themomstiffin07:surajanddheeraj@cluster0.vvwozau.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas", error);
  });

const paymentSchema = new Schema({
  date: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  homeAddress: {
    type: String,
    default: "",
    required: false,
  },
  alternateAddress: {
    type: String,
    default: "",
    required: false,
  },
});
const User = mongoose.model("User", UserSchema);

const orderSchema = new Schema({
  id: Object,
  name: String,
  phone: Number,
  address: String,
  date: String,
  delivery: String,
  remarks: String,
});

const Order = mongoose.model("Order", orderSchema);

app.post("/api/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });

  try {
    await newUser.save();
    res.send({ msg: "saved" });
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isPassword = await Admin.findOne({ password });
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "valid", user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isPassword = await User.findOne({ password });
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "valid", user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, phone, homeAddress, alternateAddress } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (homeAddress) {
      user.homeAddress = homeAddress;
    }
    if (alternateAddress) {
      user.alternateAddress = alternateAddress;
    }
    if (phone) {
      user.phone = phone;
    }
    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(200).json({ message: "User updated", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/orders", async (req, res) => {
  const newOrder = new Order({
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    date: req.body.date,
    delivery: req.body.delivery,
    remarks: req.body.remarks,
  });

  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.credits -= 1;
    await user.save();
    await newOrder.save();
    res.send({ msg: "Order placed" });
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/getorders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.send(error);
  }
});

app.put("/api/orderdelivery/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, {
      delivery: "delivered",
    });
    res.status(200).json({ message: "Order delivery status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/createpayment", async (req, res) => {
  const options = {
    amount: 299900, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/paymentverification/:id", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const userId = req.params.id;
  const today = new Date().toDateString();
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    const newPayment = new Payment({
      date: today,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id: userId,
    });
    await newPayment.save();
    const user = await User.findOne({ _id: userId });
    user.credits += 60;
    await user.save();
    res.status(200).json({
      success: true,
      id: razorpay_payment_id,
      credits: user.credits,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

app.get("/api/getpayments", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.send(error);
  }
});
app.put("/api/users/:id/add-credits", async (req, res) => {
  const { id } = req.params;
  let { addedcredits } = req.body;

  try {
    // Find the user by id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's credits
    user.credits += parseInt(addedcredits);

    // Save the updated user
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/api/makeorders", async (req, res) => {
  try {
    // Find all users who haven't placed an order
    const users = await User.find({ credits: { $gt: 0 } });

    // Create orders for each user
    const orderPromises = users.map(async (user) => {
      // Check if the user has already placed an order with a status other than "delivered"
      const existingOrder = await Order.findOne({ id: user._id, delivery: { $ne: "delivered" } });
      if (!existingOrder) {
        const {name,phone, homeAddress } = user;

        const newOrder = new Order({
          id: user._id,
          name,
          phone,
          address: homeAddress,
          date: new Date().toDateString(),
          delivery: "not delivered",
          remarks: "",
        });

        await newOrder.save();
        user.credits -= 1;
        await user.save();
      }
    });

    // Execute all order creation operations
    await Promise.all(orderPromises);

    res.status(200).json({ message: "✅ Orders created for eligible users" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
