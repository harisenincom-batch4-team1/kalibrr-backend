const { Users, Companies } = require("../../models");
const responseData = require("../../helpers/responseData");
const passwordHashing = require("../../helpers/passwordHashing");
const passwordCompare = require("../../helpers/passwordCompare");
const generateToken = require("../../helpers/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !password || !email) {
      return res
        .status(500)
        .send(responseData(500, "Mohon Lengkapi Data Diri", null, null));
    }

    const checkEmail = await Users.findOne({
      where: { email },
    });

    if (checkEmail) {
      return res
        .status(500)
        .send(responseData(500, "Email sudah digunakan", null, null));
    }

    const passwordHash = await passwordHashing(password);
    await Users.create({
      name,
      email,
      password: passwordHash,
    });
    return res
      .status(201)
      .send(responseData(201, "Register Berhasil", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(500)
        .send(responseData(500, "Form tidak boleh kosong", null, null));
    }

    const checkData = await Users.findOne({
      where: { email: email },
    });

    if (!checkData) {
      return res
        .status(401)
        .send(responseData(401, "Email salah", null, null));
    }

    const checkPassword = await passwordCompare(password, checkData.password);

    if (!checkPassword) {
      return res
        .status(401)
        .send(responseData(401, "Password salah", null, null));
    }

    const userData = {
      id: checkData.id,
      name: checkData.name,
      email: checkData.email,
    };

    const token = generateToken(userData);

    return res
      .status(200)
      .send(responseData(200, "Login berhasil", null, token));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const registerCompany = async (req, res) => {
  try {
    const { name, email, password, location, photo, phone } = req.body;
    if (!name && !password && !email && !location && !phone) {
      return res
        .status(500)
        .send(responseData(500, "Data tidak boleh kosong", null, null));
    }

    const checkEmail = await Companies.findOne({
      where: { email },
    });

    if (checkEmail) {
      return res
        .status(500)
        .send(responseData(500, "Email sudah digunakan", null, null));
    }

    const passwordHash = await passwordHashing(password);
    await Companies.create({
      name,
      email,
      password: passwordHash,
      location,
      phone
    });
    return res
      .status(201)
      .send(responseData(201, "Register Berhasil", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res
        .status(500)
        .send(responseData(500, "Form tidak boleh kosong", null, null));
    }

    const checkData = await Companies.findOne({
      where: { email: email },
    });

    if (!checkData) {
      return res
        .status(401)
        .send(responseData(401, "Email atau password salah", null, null));
    }

    const checkPassword = await passwordCompare(password, checkData.password);

    if (!checkPassword) {
      return res
        .status(401)
        .send(responseData(401, "Email atau password salah", null, null));
    }

    const companyData = {
      id: checkData.id,
      name: checkData.name,
      email: checkData.email,
    };

    const token = generateToken(companyData);

    return res
      .status(200)
      .send(responseData(200, "Login berhasil", null, token));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
}

module.exports = { registerUser, loginUser, registerCompany, loginCompany };
