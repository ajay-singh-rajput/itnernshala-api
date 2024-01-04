// SDK initialization

const ImageKit = require("imagekit");

exports.initImagekit = function(){
    const imagekit = new ImageKit({
        publicKey : process.env.IMAGEKIT_PUBLIC_KEY ,
        privateKey : process.env.IMAGEKIT_PRIVET_KEY,
        urlEndpoint :process.env.IMAGEKIT_URL_END_POINT
    });
    return imagekit;
}

