import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import { v4 as uid } from "uuid";
import { sqlConfig } from "../Config/Config";

export interface ExtendedRequest extends Request {
  body: {
    product: string;
    description: string;
  };
}
export const insertProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid();
    const { product, description } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("product", mssql.VarChar, product)
      .input("description", mssql.VarChar, description)
      .execute("insertProducts");
    res.json({
      message: "Product inserted successfully!",
    });
  } catch (error: any) {
    res.json({ Error });
  }
};

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const products = await pool.request().execute("getProducts");
    res.json(products.recordset);
  } catch (error: any) {
    res.json({ Error });
  }
};
export const getProduct: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await mssql.connect(sqlConfig);
    const products = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getProduct");
    const { recordset } = products;

    if (!products.recordset[0]) {
      res.json({ message: "Product Not Found" });
    } else {
      res.json(recordset);
    }
  } catch (error: any) {
    res.json({ error });
  }
};
export const updateProduct: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const { product, description } = req.body as {
      product: string;
      description: string;
    };
    const pool = await mssql.connect(sqlConfig);
    const products = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getProduct");

    const { recordset } = products;
    if (!products.recordset[0]) {
      res.json({ message: "Product Not Found!" });
    } else {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("product", mssql.VarChar, product)
        .input("description", mssql.VarChar, description)
        .execute("updateProduct");
      res.json({
        message: "Product updated successfully!",
      });
    }
  } catch (error: any) {
    res.json({ error });
  }
};

 export const deleteProduct:RequestHandler<{id:string}>=async (req,res)=>{
    try {
        const id=req.params.id;
        const pool=await mssql.connect(sqlConfig);
        const products=await pool.request()
        .input('id', mssql.VarChar,id)
        .execute('getProduct')
        const {recordset}=products;
        if(!products.recordset[0]) {
            res.json({message:'Product Not Found'})
            
        } else {
            await pool.request()
            .input('id', mssql.VarChar,id)
            .execute("deleteProduct")
            res.json({message:'Product Deleted Successfully'})
        }
        
    } catch (error:any) {
        res.json({ error });
        
    }
 }