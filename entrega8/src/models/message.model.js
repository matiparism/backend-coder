import mongoose from 'mongoose';

// Definimos el esquema para los mensajes
const messageSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  body: String
});

// Creamos el modelo de Post
const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
