import Brand from "../models/marca.model.js";

// POST - Registrar una nueva marca
const createBrand = async (req, res) => {
    try {
        const { brand, model } = req.body;

        const nuevaMarca = new Brand({
            brand,
            model,
        });

        const marcaGuardada = await nuevaMarca.save();

        return res.status(201).json(marcaGuardada);
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema al registrar la marca" });
    }
};

// GET - Listar todas las marcas
const getBrands = async (req, res) => {
    try {
        const marcas = await Brand.find();
        return res.status(200).json(marcas);
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema al listar las marcas" });
    }
};

// GET - Obtener una marca por ID
const getBrand = async (req, res) => {
    try {
        const marca = await Brand.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ msg: "Marca no encontrada" });
        }
        return res.status(200).json(marca);
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema al obtener la marca" });
    }
};

// PUT - Modificar una marca por ID
const updateBrand = async (req, res) => {
    try {
        const { brand, model } = req.body;
        const marca = await Brand.findById(req.params.id);

        if (!marca) {
            return res.status(404).json({ msg: "Marca no encontrada" });
        }

        marca.brand = brand || marca.brand;
        marca.model = model || marca.model;

        const marcaActualizada = await marca.save();
        return res.status(200).json(marcaActualizada);
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema al modificar la marca" });
    }
};

// DELETE - Eliminar una marca por ID
const deleteBrand = async (req, res) => {
    try {
        const marca = await Brand.findById(req.params.id);

        if (!marca) {
            return res.status(404).json({ msg: "Marca no encontrada" });
        }

        await marca.deleteOne();
        return res.status(200).json({ msg: "Marca eliminada exitosamente" });
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema al eliminar la marca" });
    }
};

export { getBrands, getBrand, createBrand, updateBrand, deleteBrand };