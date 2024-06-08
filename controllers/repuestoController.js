import Repuesto from "../models/Repuesto.js";

const createRepuesto = async (req, res) => {
    try {
        const repuesto = new Repuesto(req.body);
        await repuesto.save();
        return res.status(201).json(repuesto);
    } catch (error) {
        return res.status(400).json({ msg: "Error al crear repuesto", message: error.message });
    }
}

const getRepuestos = async (req, res) => {
    try {
        const repuestos = await Repuesto.find();
        return res.status(200).json(repuestos);
    } catch (error) {
        return res.status(400).json({ msg: "Error al obtener todos los repuestos", message: error.message });
    }
}

const getRepuestoById = async (req, res) => {
    const { id } = req.params;

    try {
        const repuesto = await Repuesto.findById(id);

        if (!repuesto) return res.status(404).json({ message: "Repuesto no encontrado" });

        return res.status(200).json(repuesto);
    } catch (error) {
        return res.status(400).json({ msg: "Error al obtener un repuesto", message: error.message });
    }
}

const updateRepuesto = async (req, res) => {
    const { id } = req.params;
    const repuesto = await Repuesto.findById(id);

    if (!repuesto) return res.status(404).json({ message: "Repuesto no encontrado" })

    repuesto.replacement_type = req.body.replacement_type || repuesto.replacement_type;
    repuesto.brand = req.body.brand || repuesto.brand;
    repuesto.model = req.body.model || repuesto.model;
    repuesto.description = req.body.description || repuesto.description;
    repuesto.price = req.body.price || repuesto.price;
    repuesto.stock = req.body.stock || repuesto.stock;

    try {
        const updatedRepuesto = await repuesto.save();
        return res.status(200).json(updatedRepuesto);
        // const repuesto = await Repuesto.findByIdAndUpdate
        //     (req.params.id, req.body, { new: true });
        // res.status(200).json(repuesto);
    }
    catch (error) {
        return res.status(400).json({ msg: "Error al actualizar repuesto", message: error.message });
    }
}

const deleteRepuesto = async (req, res) => {
    const { id } = req.params;
    const repuesto = await Repuesto.findById(id);

    if (!repuesto) return res.status(404).json({ message: "Repuesto no encontrado" });

    // if (repuesto.stock > 0) return res.status(400).json({ message: "No se puede eliminar un repuesto con stock" });

    try {
        await repuesto.deleteOne()
        return res.status(200).json({ message: "Repuesto eliminado" });
    } catch (error) {
        return res.status(400).json({ msg: "Error al eliminar repuesto", message: error.message });
    }
}

export { createRepuesto, getRepuestos, getRepuestoById, updateRepuesto, deleteRepuesto };