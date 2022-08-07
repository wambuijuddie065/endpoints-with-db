"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.insertProduct = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const Config_1 = require("../Config/Config");
const insertProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { product, description } = req.body;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("product", mssql_1.default.VarChar, product)
            .input("description", mssql_1.default.VarChar, description)
            .execute("insertProducts");
        res.json({
            message: "Product inserted successfully!",
        });
    }
    catch (error) {
        res.json({ Error });
    }
});
exports.insertProduct = insertProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const products = yield pool.request().execute("getProducts");
        res.json(products.recordset);
    }
    catch (error) {
        res.json({ Error });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const products = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getProduct");
        const { recordset } = products;
        if (!products.recordset[0]) {
            res.json({ message: "Product Not Found" });
        }
        else {
            res.json(recordset);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { product, description } = req.body;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const products = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getProduct");
        const { recordset } = products;
        if (!products.recordset[0]) {
            res.json({ message: "Product Not Found!" });
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("product", mssql_1.default.VarChar, product)
                .input("description", mssql_1.default.VarChar, description)
                .execute("updateProduct");
            res.json({
                message: "Product updated successfully!",
            });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
        const products = yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getProduct');
        const { recordset } = products;
        if (!products.recordset[0]) {
            res.json({ message: 'Product Not Found' });
        }
        else {
            yield pool.request()
                .input('id', mssql_1.default.VarChar, id)
                .execute("deleteProduct");
            res.json({ message: 'Product Deleted Successfully' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteProduct = deleteProduct;
