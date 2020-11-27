const express = require("express");
const router = express.Router();

const OrdersRoutes = require("./api/orders");

router.use("/orders", OrdersRoutes);

module.exports = router;