const config = require('config');

module.exports = function(){
    if(!process.env.wkshop_jwtPrivateKey){
    //if(!config.get("jwtPrivateKey")){
        throw new Error("FATAL ERROR : jwtPrivateKey is not defined");
    }
}