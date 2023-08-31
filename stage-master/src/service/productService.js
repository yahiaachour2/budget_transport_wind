import HttpService from "./ConfAxios";
class productService {
   
    createproduct = async (payload) => {
        const product = 'createproduct';
        return await HttpService.post(product, payload)
    };
  
   
        allProducts = async (payload) => {
            const product = 'products';
            return await HttpService.get(product, payload)
        };


}

export default new productService();