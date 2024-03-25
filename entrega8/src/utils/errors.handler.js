
const errorDictionary = {
    PRODUCT_NOT_FOUND: 'El producto no fue encontrado.',
    ADD_TO_CART_ERROR: 'Error al agregar producto al carrito.',
    INVALID_PRODUCT_DATA: 'Los datos del producto son inválidos.',
    
  };
  
  const customizeError = (errorCode) => {
    return {
      code: errorCode,
      message: errorDictionary[errorCode] || 'Error desconocido',
    };
  };
  
  export default customizeError;
  
  
