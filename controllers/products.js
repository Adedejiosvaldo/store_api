const Products = require("../models/Products");
// const Product = require("../models/Products");

const getAllProductsStatic = async (req, res) => {
  const products = await Products.find({}).sort("name price");
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|<=|=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [select, operator, value] = item.split("-");
      if (options.includes(select)) {
        queryOBject[select] = { [operator]: Number(value) };
      }
    });
    console.log(filters);
    console.log(queryOBject);
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
  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) | 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //   if (limit) {
  //     result = result.limit(limit);
  //   }

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
