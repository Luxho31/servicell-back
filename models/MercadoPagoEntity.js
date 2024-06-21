/*
    {
  "action": "payment.update",
  "api_version": "v1",
  "data": {
    "id": "123456"
  },
  "date_created": "2021-11-01T02:02:02Z",
  "id": "123456",
  "live_mode": false,
  "type": "payment",
  "user_id": 1762277778
}
*/

import mongoose from "mongoose";

const ordenSchema = new mongoose.Schema(
  {
      action: {
          type: String,
          required: true
      },
      api_version: {
          type: String,
          required: true
      },
      data: {
          id: {
              type: String,
              required: true
          }
      },
      date_created: {
          type: Date,  // Cambiado a tipo Date para almacenar fechas
          required: true
      },
      orderId: {  // Cambiado de `id` a `orderId` para evitar confusiones
          type: String,
          required: true,
          unique: true  // Asegura que cada orderId sea único
      },
      live_mode: {
          type: Boolean,
          required: true
      },
      type: {
          type: String,
          required: true
      },
      user_id: {
          type: String,  // Cambiado a String si es un identificador único
          required: true
      },
  },
  {
      timestamps: true  // Agrega createdAt y updatedAt automáticamente
  }
);

const Orden = mongoose.model("Orden", ordenSchema);

export default Orden;