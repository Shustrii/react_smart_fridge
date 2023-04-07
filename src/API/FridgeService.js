import axios from 'axios';


const ALL_FRIDGE_PRODUCTS_URL = 'http://localhost:8080/fridge/v1/all/products';
const All_Measures_URL = 'http://localhost:8080/fridge/v1/all_measures';
const NOT_IN_FRIDGE_PRODUCTS_URL = 'http://localhost:8080/fridge/v1/not_in_fridge';
const ADD_PRODUCT_URL = 'http://localhost:8080/fridge/v1/save/fridge';
const Edit_Product_URL = 'http://localhost:8080/fridge/v1/product_quantity_update';
const Delete_Product_URL = 'http://localhost:8080/fridge/v1/delete_product_from_fridge';


const config = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  data: {},
};

export default class FridgeService{

  static async getAllFridgeProducts() {
    const response = await axios.get(ALL_FRIDGE_PRODUCTS_URL + '/'+1);
    return response;
  }

  static async getMeasures() {
    const response = await axios.get(All_Measures_URL);
    return response;
  }

  static async getNotInFridge() {
    const response = await axios.get(NOT_IN_FRIDGE_PRODUCTS_URL);
    return response;
  }

  static async addProduct(product) {
        
    const response = await axios.post(ADD_PRODUCT_URL, product);
    return response;
  }

  static async editProduct(product){
    //const response = await axios.put(Edit_Product_URL+"/"+product.product_id);
    const response = await axios.put(Edit_Product_URL, product);
    return response;
  }
    
  static async deleteProduct(product){
    config.data = product;
    const response = await axios.delete(Delete_Product_URL, config);
    return response;
  }

    


}