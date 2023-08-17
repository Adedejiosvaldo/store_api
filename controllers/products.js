const Products = require("../models/Products");
// const Product = require("../models/Products");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({ featured: true });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Product ROute" });
};

module.exports = { getAllProducts, getAllProductsStatic };
