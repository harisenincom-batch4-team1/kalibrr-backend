const { Users, JobApplications, Jobs } = require("../../models");
const responseData = require("../../helpers/responseData");
const checkToken = require("../../helpers/checkToken");
const passwordCompare = require("../../helpers/passwordCompare");
const passwordHashing = require("../../helpers/passwordHashing");

const getDetailUser = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Users.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "email",
        "location",
        "phone",
        "role",
        "linkedinUrl",
        "photo",
        "skill",
        "createdAt",
        "updatedAt",
      ],
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
  const { email, currentPassword } = req.body;

  try {
    if (!email && !currentPassword) {
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

// check resume is already have or not
const getAllResume = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Users.findOne({
      where: { id: id },
      attributes: ['resume'],
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

// const getOneResume = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await JobApplications.findOne({
//       where: { id },
//     });
//     return res.status(200).send(responseData(200, "OK", null, result));
//   } catch (error) {
//     return res.status(500).send(responseData(500, null, error?.message, null));
//   }
// };

const createResume = async (req, res) => {
  const id = checkToken(req);
  const resume = req.file.filename; /* fungsi path dari multer, agar yg diinput adalah path directory nya (string) */
  try {
    const checkId = await Users.findOne({
      where: {
        id: id
      }
    });

    if (!checkId) {
      return res
        .status(500)
        .send(responseData(500, "Akun tidak ditemukan", null, null));
    }

    if (!resume) {
      return res
        .status(500)
        .send(responseData(500, "CV belum diinput", null, null));
    }

    const values = {
      resume,
    };

    const selector = {
      where: {
        id: id,
      },
    };

    const result = await Users.update(values, selector);

    return res
      .status(201)
      .send(responseData(201, "CV telah diinput", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

// const deleteResume = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const check = await JobApplications.findOne({
//       where: { id },
//     });
//     if (!check) {
//       return res
//         .status(200)
//         .send(responseData(404, "CV Tidak ditemukan", null, null));
//     }
//     await Applicants.destroy({
//       where: { id },
//     });
//     return res.status(200).send(responseData(200, "OK", null, null));
//   } catch (error) {
//     return res.status(500).send(responseData(500, null, error?.message, null));
//   }
// };

const putPhoto = async (req, res) => {
  const id = checkToken(req);
  const photo = req.file.filename;
  try {
    const checkId = await Users.findOne({
      where: {
        id: id
      }
    });

    if (!checkId) {
      return res
        .status(500)
        .send(responseData(500, "Akun tidak ditemukan", null, null));
    }

    if (!photo) {
      return res
        .status(500)
        .send(responseData(500, "Foto Profile belum diinput", null, null));
    }

    const values = {
      photo,
    };

    const selector = {
      where: {
        id: id,
      },
    };

    const result = await Users.update(values, selector);

    res
      .status(201)
      .send(responseData(201, "Foto Profile telah diinput", null, result));

    return result;
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getAllPhoto = async (req, res) => {
  const id = checkToken(req);
  try {
    const result = await Users.findOne({
      where: { id: id },
      attributes: ['photo'],
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const getApply = async (req, res) => {
  const id = checkToken(req);
  try {
    const checkResume = await JobApplications.findOne({ where: { userId: id } });
    if (!checkResume) {
      return res.status(200).send(responseData(200, "OK", null, []));
    }
    const result = await JobApplications.findAll({
      where: { applicantId: checkResume.userId },
    });
    return res.status(200).send(responseData(200, "OK", null, result));
  } catch (error) {
    return res.status(500).send(responseData(500, null, error?.message, null));
  }
};

const apply = async (req, res) => {
  const { jobId, userId } = req.body;
  try {
    const checkResume = await Users.findOne({
      where: { id: userId },
    });
    if (!checkResume) {
      return res
        .status(404)
        .send(responseData(404, "Resume tidak ditemukan", null, null));
    }

    const checkJob = await Jobs.findOne({
      where: { id: jobId },
    });
    // console.log("job id: ", checkJob?.id);
    if (!checkJob) {
      return res
        .status(404)
        .send(responseData(404, "Pekerjaan tidak ditemukan", null, null));
    }

    const checkMultiApplyJob = await JobApplications.findOne({
      where: { jobId: jobId, userId: userId },
    });
    if (
      checkMultiApplyJob?.jobId !== jobId ||
      checkMultiApplyJob?.userId !== userId
    ) {
      await JobApplications.create({
        userId: checkResume.id,
        jobId: checkJob.id,
      });
      return res
        .status(201)
        .send(responseData(201, "Berhasil melamar pekerjaan", null, null));
    }

    if (
      checkMultiApplyJob?.jobId === jobId ||
      checkMultiApplyJob?.userId === userId
    ) {
      return res
        .status(500)
        .send(
          responseData(
            500,
            "Kamu sudah melamar pekerjaan yang sama",
            null,
            null
          )
        );
    }

    return res
      .status(200)
      .send(responseData(200, "Missing out of controller", null, null));
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
  getAllResume,
  // getOneResume,
  createResume,
  // deleteResume,
  putPhoto,
  getAllPhoto,
  apply,
  getApply,
};
