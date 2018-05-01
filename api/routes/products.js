const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../../middleware/authCheck');
const productController = require('../../controllers/products');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/');
    },
    filename: function(req, file, cb){
        const date = new Date().toISOString().replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }

}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 *5
    },
    fileFilter: fileFilter
});

router.get('/', productController.get_products);

router.post('/',checkAuth, upload.single('productImage'), productController.add_product);

router.get('/:productID',checkAuth, productController.get_product);

router.patch('/:productID',checkAuth, productController.update_product);

router.delete('/:productID',checkAuth, productController.delete_product);

module.exports = router; 