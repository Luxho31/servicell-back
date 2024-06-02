import nodemailer from "nodemailer";

const sendEmail = async (name, email, archivo) => {
    console.log(archivo);
    // Configuración del transporte de nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === "true" ? true : false,
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Configuración del correo electrónico
    try {
        const info = await transporter.sendMail({
            from: '"Servicell - KDC"<soporte@gmail.com>',
            to: email,
            subject: "Cotización",
            text: "Adjunto encontrará su cotización.",
            html: `<p>Hola ${name}, gracias por confiar en Servicell KDC.</p>
                <p>Hemos revisado tu solicitud y te realizamos una cotización para tu equipo:</p>
                <p>Si tu no enviaste esta solicitud, puedes ignorar este mensaje</p>        
            `,
            attachments: [
                {
                    filename: archivo.name,
                    path: archivo.path,
                },
            ],
        });

        console.log("Message sent: %s", info.messageId, email);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default sendEmail;