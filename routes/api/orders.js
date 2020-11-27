const express = require("express");
const router = express.Router();

const OrderModelClass = require("../../models/order/order.model");
const mdbOrderModel = new OrderModelClass();

router.get("/all", async (req, res) => {
    try {
        const rslt = await mdbOrderModel.getAll();
        res.status(200).json(rslt);
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Algo salió mal" });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { nombre, correo, telefono, producto, forma_pago, estado_orden } = req.body;
        const result = await mdbOrderModel.addOne({ nombre, correo, telefono, producto, forma_pago, estado_orden });
        res.status(200).json({ msg: "Se agregó con exito" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "No se agregó: ", error: e });
    }
})


router.get('/one/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let result = await mdbOrderModel.getById(id);
        res.status(200).json(result);
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ "msg": "Algo Salió Mal." });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, correo, telefono, producto, forma_pago, estado_orden } = req.body;
        const result = await mdbOrderModel.updateById(id, nombre, correo, telefono, producto, forma_pago, estado_orden);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "No se pudo actualizar " });
    }
})

router.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let rslt = await mdbOrderModel.removeById(id);
        res.status(200).json(rslt);
    } catch (e) {
        console.log(e);
        res.status(500).json({ "msg": "No se pudo borrar" });
    }
})

module.exports = router;