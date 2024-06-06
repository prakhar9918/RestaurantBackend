const express = require('express');
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/createCategory', createCategory);
router.get('/getallCategory', getAllCategory);
router.put('/updateCategory/:id', updateCategory);
router.put('/deleteCategory/:id', deleteCategory);

module.exports = router;