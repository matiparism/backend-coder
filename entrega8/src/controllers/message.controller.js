import MessageModel from './models/message.model.js';

class MessageController {
  async saveMsg(msg) {
    if (!msg) {
      console.log("El mensaje está vacío");
      return;
    }

    const existsMsg = await MessageModel.findOne({ id: msg.id });

    if (existsMsg) {
      console.log("El mensaje ya existe");
      throw Error(`Post with id ${msg.id} already exists`);
    }

    try {
      const newMsg = new MessageModel(post);
      await newMsg.save();
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      throw Error("Hubo un error al crear el mensaje: " + error);
    }
  }

  async deleteMsg(id) {
    const msg = await MessageModel.findOne({ id: id });

    if (!msg) {
      console.log("El mensaje no existe");
      throw Error("El mensaje no existe");
    }

    try {
      await MessageModel.deleteOne({ id: id });
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      return;
    }
  }

  async getMsg() {
    return await MessageModel.find();
  }
}

export default MessageController;
