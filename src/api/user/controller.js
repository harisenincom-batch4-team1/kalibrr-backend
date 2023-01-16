const { Users } = require("../../models");

const getAllUsers = async (_, res) => {
  try {
    const result = await Users.findAll();

    return res.status(200).send({
      status: 200,
      message: "OK",
      datas: result,
      error: null,
    });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).send({
      message: error?.message ?? "Internal Server Error",
    });
  }
};

module.exports = { getAllUsers };
