import Carrito from "../models/Carrito.js";
import Repuesto from "../models/Repuesto.js";
import Usuario from "../models/Usuario.js";

const addCarritoItemByUserId = async (req, res) => {
    const { replacement, user } = req.body;

    try {

        const repuesto = await Repuesto.findById(replacement);
        const usuario = await Usuario.findById(user);

        if (!repuesto) return res.status(404).json({ message: "Repuesto no encontrado" });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const existingItem = await Carrito.findOne({ replacement });

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.price = repuesto.price;
            existingItem.totalPrice = existingItem.quantity * repuesto.price;
            const updatedItem = await existingItem.save();
            return res.status(200).json(updatedItem);
        } else {
            const carritoItem = new Carrito({
                replacement: repuesto._id,
                user: usuario._id,
                quantity: 1,
                price: repuesto.price,
                totalPrice: repuesto.price
            });

            const carritoGuardado = await carritoItem.save();
            return res.status(201).json(carritoGuardado);
        }

    } catch (error) {
        return res.status(400).json({ msg: "Error al agregar al carrito", message: error.message });
    }
}

const getCarritoItemsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const carritoItems = await Carrito.find({ user: userId }).populate('replacement');
        return res.status(200).json(carritoItems);
    } catch (error) {
        return res.status(400).json({ msg: "Error al obtener los items del carrito", message: error.message });
    }

    // const carritoItems = await Carrito.find().where('usuario').equals(req.user);
    // res.json(carritoItems);
}

const getCarritoItemByUserId = async (req, res) => {
    const { id, userId } = req.params;
    try {
        const carritoItem = await Carrito.findOne({ _id: id, user_id: userId }).populate('replacement_id');

        if (!carritoItem) return res.status(404).json({ message: "Item del carrito no encontrado" });

        return res.status(200).json(carritoItem);
    } catch (error) {
        return res.status(400).json({ msg: "Error al obtener item del carrito", message: error.message });
    }
}

const updateCarritoItemByUserId = async (req, res) => {
    const { id, userId } = req.params;
    const { quantity } = req.body;

    try {
        const carritoItem = await Carrito.findOne({ _id: id, user: userId });

        if (!carritoItem) return res.status(404).json({ message: "Item del carrito no encontrado" });

        carritoItem.quantity = quantity;
        carritoItem.totalPrice = carritoItem.quantity * carritoItem.price;

        const carritoGuardado = await carritoItem.save();

        return res.status(200).json(carritoGuardado);
    } catch (error) {
        return res.status(400).json({ msg: "Error al actualizar item del carrito", message: error.message });
    }
}

const deleteCarritoItemByUserId = async (req, res) => {
    const { carritoItemId, userId } = req.params;

    console.log('carritoItemId:', carritoItemId);
    console.log('userId:', userId);

    try {
        const carritoItem = await Carrito.findOne({ _id: carritoItemId, user: userId });
        console.log(carritoItem);

        if (!carritoItem) return res.status(404).json({ message: "Item del carrito no encontrado" });

        await carritoItem.deleteOne();
        return res.status(200).json({ message: "Item eliminado del carrito" });

    } catch (error) {
        return res.status(400).json({ msg: "Error al eliminar item del carrito", message: error.message });
    }
}

const clearCarritoItemByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        await Carrito.deleteMany({ user_id: userId });
        return res.status(200).json({ message: "Items del carrito eliminados" });
    } catch (error) {
        return res.status(400).json({ msg: "Error al eliminar items del carrito", message: error.message });
    }
}

export { addCarritoItemByUserId, getCarritoItemsByUserId, getCarritoItemByUserId, updateCarritoItemByUserId, deleteCarritoItemByUserId, clearCarritoItemByUserId };