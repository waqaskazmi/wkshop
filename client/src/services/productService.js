import http from "./httpService";
//import config from "../config.json";

export function getProducts() {
  //return http.get(config.apiEndpoint + '/movies');
  return http.get('/products');
}

export function getProduct(id) {
  return http.get('/products/' + id);
}

export function saveProduct(product) {
  let producttoSave = {};
  producttoSave.title = product.title;
  producttoSave.img = product.img;
  producttoSave.img2 = product.img2;
  producttoSave.isNew = product.isNew;
  producttoSave.oldPrice = product.oldPrice;
  producttoSave.price = product.price;
  producttoSave.categories = product.categories;
  producttoSave.sub_categories = product.sub_categories;
  producttoSave.productType = product.productType;
  
  if(product._id){
    return http.put('/products/' + product._id, producttoSave);
  }
  else{
    return http.post('/products', producttoSave);
  }
}

export function deleteProduct(id) {
    return http.delete('/products/' + id);
}