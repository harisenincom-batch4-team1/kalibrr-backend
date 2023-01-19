const { Users } = require("../../models");
const responseData = require("../../helpers/responseData");
const checkToken = require("../../helpers/checkToken");
const passwordCompare = require("../../helpers/passwordCompare");
const passwordHashing = require("../../helpers/passwordHashing");

const getDetailUser = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Users.findOne({
      where: { id },
      attributes: ["id", "name", "email", "location", "phone", "role", "linkedinUrl", "photo", "skill", "createdAt", "updatedAt"]
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const deleteUser = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Users.findOne({
      where: { id: id },
    });
    if (!result) {
      return res
        .status(404)
        .send(responseData(404, "Akun tidak ditemukan", null, null));
    }
    await Users.destroy({
      where: { id: id },
    });
    return res
      .status(200)
      .send(responseData(200, "Berhasil menghapus akun", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updateUser = async (req, res) => {
  const id = checkToken(req);
  const { name, location, role, phone, linkedinUrl, skill } = req.body;

  try {
    const checkId = await Users.findOne({
      where: { id },
    });

    if (!checkId) {
      return res
        .status(404)
        .send(responseData(404, "Akun tidak ditemukan", null, null));
    }

    const values = {
      name,
      location,
      role,
      phone,
      linkedinUrl,
      skill,
    };
    const selector = {
      where: {
        id: id,
      },
    };
    await Users.update(values, selector);

    return res
      .status(201)
      .send(responseData(201, "Akun berhasil di update", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updateEmailUser = async (req, res) => {
  const id = checkToken(req);
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      return res
        .status(500)
        .send(responseData(500, "Mohon isi data dengan benar", null, null));
    }

    const checkId = await Users.findOne({
      where: { id },
    });

    if (!checkId) {
      return res
        .status(404)
        .send(responseData(404, "Akun tidak ditemukan", null, null));
    }

    const checkPassword = await passwordCompare(password, checkId.password);

    if (!checkPassword) {
      return res
        .status(404)
        .send(responseData(500, "Password salah", null, null));
    }

    const values = {
      email,
    };
    const selector = {
      where: {
        id: id,
      },
    };
    await Users.update(values, selector);

    return res
      .status(201)
      .send(responseData(201, "Email berhasil di update", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updatePasswordUser = async (req, res) => {
  const id = checkToken(req);
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    if (!newPassword && !confirmPassword) {
      return res
        .status(500)
        .send(responseData(500, "Mohon isi data dengan benar", null, null));
    }

    const checkId = await Users.findOne({
      where: { id },
    });

    if (!checkId) {
      return res
        .status(404)
        .send(responseData(404, "Akun tidak ditemukan", null, null));
    }

    const checkPassword = await passwordCompare(
      currentPassword,
      checkId.password
    );

    if (!checkPassword) {
      return res
        .status(404)
        .send(responseData(500, "Password salah", null, null));
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(404)
        .send(
          responseData(
            500,
            "Password dan konfirmasi password tidak cocok",
            null,
            null
          )
        );
    }

    const passwordHash = await passwordHashing(newPassword);

    const values = {
      password: passwordHash,
    };
    const selector = {
      where: {
        id: id,
      },
    };
    await Users.update(values, selector);

    return res
      .status(201)
      .send(responseData(201, "Password berhasil di update", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

module.exports = {
  getDetailUser,
  deleteUser,
  updateUser,
  updateEmailUser,
  updatePasswordUser,
};
