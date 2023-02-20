const { Jobs, Companies, JobApplications } = require("../../models");
const responseData = require("../../helpers/responseData");
const checkToken = require("../../helpers/checkToken");
const passwordHashing = require("../../helpers/passwordHashing");
const passwordCompare = require("../../helpers/passwordCompare");

const getDetailCompany = async (req, res) => {
  try {
    const id = checkToken(req);

    const result = await Companies.findOne({
      where: { id },
    });

    if (!result) {
      return res
        .status(404)
        .send(responseData(404, "Perusahaan tidak ditemukan", null, null));
    }

    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const deleteCompany = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Companies.findOne({
      where: { id: id },
    });
    if (!result) {
      return res
        .status(404)
        .send(responseData(404, "Akun perusahaan tidak ditemukan", null, null));
    }
    await Companies.destroy({
      where: { id: id },
    });
    return res
      .status(200)
      .send(
        responseData(200, "Berhasil menghapus akun perusahaan", null, null)
      );
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updateCompany = async (req, res) => {
  const id = checkToken(req);
  const { name, location, phone, photo } = req.body;

  try {
    const checkId = await Companies.findOne({
      where: { id },
    });

    if (!checkId) {
      return res
        .status(404)
        .send(responseData(404, "Akun perusahaan tidak ditemukan", null, null));
    }

    if (!name || !location || !phone || !photo) {
      return res
        .status(201)
        .send(responseData(201, "Data tidak boleh kosong", null, null));
    }

    const values = {
      name,
      location,
      phone,
      photo,
    };
    const selector = {
      where: {
        id: id,
      },
    };
    await Companies.update(values, selector);

    return res
      .status(201)
      .send(
        responseData(201, "Akun perusahaan berhasil di update", null, null)
      );
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updateEmailCompany = async (req, res) => {
  const id = checkToken(req);
  const { email, currentPassword } = req.body;

  try {
    if (!email && !currentPassword) {
      return res
        .status(500)
        .send(responseData(500, "Data tidak boleh kosong", null, null));
    }

    const checkId = await Companies.findOne({
      where: { id },
    });

    if (!checkId) {
      return res
        .status(404)
        .send(responseData(404, "Akun perusahaan tidak ditemukan", null, null));
    }

    const checkPassword = await passwordCompare(
      currentPassword,
      checkId.password
    );

    if (!checkPassword) {
      return res
        .status(500)
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
    await Companies.update(values, selector);

    return res
      .status(201)
      .send(
        responseData(201, "Email perusahaan berhasil di update", null, null)
      );
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updatePasswordCompany = async (req, res) => {
  const id = checkToken(req);
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    if (!newPassword && !confirmPassword) {
      return res
        .status(500)
        .send(responseData(500, "Data tidak boleh kosong", null, null));
    }

    const checkId = await Companies.findOne({
      where: { id },
    });

    if (!checkId) {
      return res
        .status(404)
        .send(responseData(404, "Akun perusahaan tidak ditemukan", null, null));
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
    await Companies.update(values, selector);

    return res
      .status(201)
      .send(responseData(201, "Password berhasil di update", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getAllJob = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Jobs.findAll({
      where: { companyId: id },
      order: [["id", "DESC"]],
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getOneJob = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Jobs.findOne({
      where: { id },
      include: [
        {
          model: Companies,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const createJob = async (req, res) => {
  try {
    const id = checkToken(req);
    const {
      name,
      type,
      tenure,
      status,
      salaryMin,
      salaryMax,
      jobDescription,
      jobQualification,
    } = req.body;

    if (
      (!name,
      !type,
      !tenure,
      !status,
      !salaryMin,
      !salaryMax,
      !jobDescription,
      !jobQualification)
    ) {
      return res
        .status(500)
        .send(responseData(500, "Data tidak boleh kosong", null, null));
    }

    const result = await Jobs.create({
      companyId: id,
      name,
      type,
      tenure,
      status,
      salaryMin,
      salaryMax,
      jobDescription,
      jobQualification,
    });

    return res
      .status(201)
      .send(responseData(201, "Berhasil membuat lowongan kerja", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Jobs.findOne({
      where: { id: id },
    });
    if (!result) {
      return res
        .status(404)
        .send(responseData(404, "Lowongan kerja tidak ditemukan", null, null));
    }
    await Jobs.destroy({
      where: { id: id },
    });
    return res
      .status(200)
      .send(responseData(200, "Berhasil menghapus lowongan kerja", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    type,
    tenure,
    status,
    salaryMin,
    salaryMax,
    jobDescription,
    jobQualification,
  } = req.body;
  try {
    const result = await Jobs.findOne({
      where: { id: id },
    });
    if (!result) {
      return res
        .status(404)
        .send(responseData(404, "Lowongan kerja tidak ditemukan", null, null));
    }

    if (
      name === "" ||
      type === "" ||
      tenure === "" ||
      status === "" ||
      salaryMin === "" ||
      salaryMax === "" ||
      jobDescription === "" ||
      jobQualification === ""
    ) {
      return res
        .status(500)
        .send(responseData(500, "Data tidak boleh kosong", null, null));
    }
    const values = {
      name,
      type,
      tenure,
      status,
      salaryMin,
      salaryMax,
      jobDescription,
      jobQualification,
    };
    const selector = {
      where: {
        id: id,
      },
    };
    await Jobs.update(values, selector);
    return res
      .status(201)
      .send(responseData(201, "Lowongan kerja berhasil di update", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getUserApply = async (req, res) => {
  try {
    const id = checkToken(req);
    const result = await Jobs.findAll({
      where: { companyId: id },
      include: [JobApplications],
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const updateApplyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const values = {
      status,
    };
    const selector = {
      where: {
        id: id,
      },
    };
    await JobApplications.update(values, selector);

    return res
      .status(201)
      .send(responseData(200, "Berhasil update status pelamar", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

module.exports = {
  getDetailCompany,
  deleteCompany,
  updateCompany,
  updateEmailCompany,
  updatePasswordCompany,
  createJob,
  getAllJob,
  getOneJob,
  deleteJob,
  updateJob,
  getUserApply,
  updateApplyStatus,
};
