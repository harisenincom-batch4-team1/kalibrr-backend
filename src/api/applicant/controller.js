const { Applicant } = require("../../models");
const responseData = require("../../helpers/responseData");
const checkToken = require("../../helpers/checkToken");

const getAllApplicant = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Applicant.findAll({
      where: { userId: id },
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getOneApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Applicant.findOne({
      where: { id },
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const createApplicant = async (req, res) => {
  const id = checkToken(req);
  const { cv } = req.body;
  try {
    if (!cv) {
      return res
        .status(500)
        .send(responseData(500, "Mohon isi data dengan benar", null, null));
    }
    const result = await Applicant.create({
      userId: id,
      cv,
    });
    return res
      .status(201)
      .send(responseData(201, "Berhasil membuat CV", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Applicant.findOne({
      where: { id },
    });
    if (!check) {
      return res
        .status(200)
        .send(responseData(404, "CV Tidak ditemukan", null, null));
    }
    await Applicant.destroy({
      where: { id },
    });
    return res.status(200).send(responseData(200, "OK", null, null));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

module.exports = { getAllApplicant, getOneApplicant, createApplicant, deleteApplicant };
