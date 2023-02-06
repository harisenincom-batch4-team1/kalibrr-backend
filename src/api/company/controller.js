const { Jobs, Companies } = require("../../models");
const responseData = require("../../helpers/responseData");
const checkToken = require("../../helpers/checkToken");

const getCompanyDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const checkCompany = await Companies.findOne({
      where: { id },
    });

    if (!checkCompany) {
      return res
        .status(404)
        .send(responseData(404, "Perusahaan tidak ditemukan", null, null));
    }

    const result = await Companies.findAll({
      where: { id },
      include: [
        {
          model: Jobs,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getAllJob = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Jobs.findAll({
      where: { companyId: id },
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
        .send(responseData(500, "Mohon isi data dengan benar", null, null));
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
  const { id } = req.params;
  try {
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

module.exports = {
  getCompanyDetail,
  createJob,
  getAllJob,
  getOneJob,
  deleteJob,
};
