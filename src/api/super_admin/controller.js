const { Users, Applicants } = require("../../models");
const responseData = require("../../helpers/responseData");

const getAllUser = async (_, res) => {
  try {
    const result = await Users.findAll({
      include: [
        {
          model: Applicants,
        },
      ],
    });
    console.log("result", result);
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

module.exports = { getAllUser };
