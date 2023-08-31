import HttpService from "./ConfAxios";
class AuthService {
    login = async (payload) => {
       
        const loginEndpoint = 'login';
        return await HttpService.post(loginEndpoint, payload)
    };
    registre = async (payload) => {
       
        const loginEndpoint = 'register';
        return await HttpService.post(loginEndpoint, payload)
    };
    forgetpassword = async (payload) => {
       
        const loginEndpoint = 'forgetpassword';
        return await HttpService.post(loginEndpoint, payload)
    };
    resetPassword = async (payload) => {
       
        const loginEndpoint = 'resetPassword';
        return await HttpService.post(loginEndpoint, payload)
    };
    alluser = async (payload) => {
        const product ='users';
        return await HttpService.get(product, payload)
    };

    allproduct = async (payload) => {
        const product ='products';
        return await HttpService.get(product, payload)
    };


}


export default new AuthService();