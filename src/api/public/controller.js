const { Op } = require("sequelize");
const { Users, Applicants, Jobs, Companies } = require("../../models");
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
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getAllJob = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const offset = limit * page;
    const totalRows = await Jobs.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);

    const result = await Jobs.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: Companies,
          attributes: { exclude: ["password"] },
        },
      ],
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });
    const datas = {
      result: result,
      page: page,
      limit: limit,
      totalRows: totalPage,
      totalPage: totalPage,
    };
    return res.status(200).send(responseData(200, "OK", null, datas));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getOneJob = async (req, res) => {
  try {
    const { id } = req.params;

    const check = await Jobs.findOne({
      where: { id },
      include: [
        {
          model: Companies,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!check) {
      return res
        .status(404)
        .send(responseData(404, "Lowongan kerja tidak ditemukan", null, null));
    }

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

const getCompanyDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const checkCompany = await Companies.findOne({
      where: { id },
      include: [
        {
          attributes: { exclude: ["password"] },
        },
      ],
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

module.exports = { getAllUser, getCompanyDetail, getAllJob, getOneJob };
