import Cotizacion from "../models/Cotizacion.js";
import emailCotizacion from "../helpers/emailCotizacion.js";
import generarPDF from "../helpers/generarPDF.js";
import fs from "fs";
import upload from "../helpers/multer.js";

const createCotizacion = async (req, res) => {
    const cotizacion = new Cotizacion(req.body);
    try {
        const cotizacionGuardada = await cotizacion.save();
        return res.status(200).json(cotizacionGuardada);
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema" });
    }
}

const getCotizaciones = async (req, res) => {
    const cotizaciones = await Cotizacion.find();
    return res.status(200).json(cotizaciones);
}

const getCotizacionById = async (req, res) => {
    const cotizacion = await Cotizacion.findById(req.params.id);
    return res.status(200).json(cotizacion);
}

const updateCotizacion = async (req, res) => {
    const cotizacion = await Cotizacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(cotizacion);
}

// const deleteCotizacion = async (req, res) => {
//     await Cotizacion.findByIdAndDelete(req.params.id);
//     return res.status(200).json({ msg: "Cotizacion eliminada" });
// }

const sentEmail = async (req, res) => {
    const cotizacion = await Cotizacion.findById(req.params.id);
    if (!cotizacion) return res.status(404).json({ msg: "Cotización no encontrada" });

    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error("Error al cargar el archivo:", err);
                return res.status(500).json({ msg: "Error al subir el archivo" });
            }

            if (!req.file) {
                return res.status(400).json({ msg: "No se subió ningún archivo" });
            }

            const { name, email } = cotizacion;
            const { filename } = req.file;
            const emailSent = await emailCotizacion(name, email, { name: filename, path: req.file.path });
            if (emailSent) {
                return res.status(200).json({ msg: "Correo enviado" });
            } else {
                return res.status(500).json({ msg: "Error al enviar el correo" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al generar el PDF o enviar el correo" });
    }
}

const generateInvoice = async (req, res) => {
    const { services } = req.body;
    const cotizacion = await Cotizacion.findById(req.params.id);
    if (!cotizacion) return res.status(404).json({ msg: "Cotización no encontrada" });

    try {
        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=cotizacion.pdf`,
        });

        // Asegura que cotizacion.services sea un arreglo
        const existingServices = Array.isArray(cotizacion.services) ? cotizacion.services : [];

        // Combina los servicios existentes con los nuevos servicios del request
        const cotizacionTemp = { ...cotizacion.toObject(), services: [...existingServices, ...services] };

        generarPDF(cotizacionTemp, stream);
        console.log({ Message: "PDF generado" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al generar el PDF" });
    }
}

export { createCotizacion, getCotizaciones, getCotizacionById, updateCotizacion, sentEmail, generateInvoice };