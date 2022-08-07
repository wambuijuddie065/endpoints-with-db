"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductControllers_1 = require("../Controllers/ProductControllers");
const router = (0, express_1.Router)();
router.get('/', ProductControllers_1.getProducts);
router.get('/:id', ProductControllers_1.getProduct);
router.post('/', ProductControllers_1.insertProduct);
router.put('/:id', ProductControllers_1.updateProduct);
router.delete('/:id', ProductControllers_1.deleteProduct);
exports.default = router;