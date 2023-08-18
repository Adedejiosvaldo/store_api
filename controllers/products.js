const Products = require("../models/Products");
// const Product = require("../models/Products");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({ featured: true });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryOBject = {};

  if (featured) {
    queryOBject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryOBject.company = company;
  }
  if (name) {
    queryOBject.name = { $regex: name, $options: "i" };
  }
  console.log(queryOBject);
  const products = await Products.find(queryOBject, null, { strict: false });
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
