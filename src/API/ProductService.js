import axios from "axios";

const All_Products_URL = "http://localhost:8080/fridge/v1/all/products";
const All_Measures_URL = "http://localhost:8080/fridge/v1/all_measures";
const All_ProductTypes_URL = "http://localhost:8080/fridge/v1/all_types";
const Save_Product_URL = "http://localhost:8080/fridge/v1/add/product";
const Delete_Product_URL = "http://localhost:8080/fridge/v1/delete_product";
const Update_Product_URL = "http://localhost:8080/fridge/v1/product_update";

const config = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {}
  };


export default class ProductService {

    static async getAllProducts() {
        const response = await axios.get(All_Products_URL);
        return response;
    }

    static async addProduct(product) {
        //console.log("product  "+ product);
        const response = await axios.post(Save_Product_URL, product);
        // await fetch(Save_Product_URL, {
        //     method: 'post',
        //     body: JSON.stringify(product),
        //     headers: {'content-type': 'application/json'}
        // });
        
        return response;
    }

    static async getMeasures() {
        const response = await axios.get(All_Measures_URL);
        return response;
    }

    static async getProductTypes() {
        const response = await axios.get(All_ProductTypes_URL);
        return response;
    }

    static async deleteProduct(product){
        config.data = product;
        const response = await axios.delete(Delete_Product_URL, config);
        return response;
    }

    static async updateProduct(product){
        const response = await axios.put(Update_Product_URL + "/" +product.id, product);
        return response;
    }
}

