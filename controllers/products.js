const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "Product Testing" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "Product ROute" });
};

module.exports = { getAllProducts, getAllProductsStatic };
