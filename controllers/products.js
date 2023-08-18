const Products = require("../models/Products");
// const Product = require("../models/Products");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({}).sort("name price");
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
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

  let result = Products.find(queryOBject, null, {
    strict: false,
  });

  if (sort) {
    const sortList = sort.split(",").join(" ");
    console.log(sortList);

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
