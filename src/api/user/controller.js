const { User } = require("../../models");
const responseData = require("../../helpers/responseData");
const checkToken = require("../../helpers/checkToken");

const deleteUser = async (req, res) => {
  const id = checkToken(req)
  try {
    const result = await User.findOne({
      where: { id: id }
    })
    if (!result) {
      return res.status(404).send(responseData(404, "Akun tidak ditemukan", null, null));
    }
    await User.destroy({
      where: { id: id }
    })
    return res.status(200).send(responseData(200, "Berhasil menghapus akun", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
}

module.exports = { deleteUser };
