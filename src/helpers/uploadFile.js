const { Users, Companies } = require("../../models");
const path = require("path");
const fs = require("fs")
const { v4: uuidv4 } = require("uuid");

// get the file name from database
const resultFileNameUser = async (req, res) => {
    const id = req.UserId.id
    await Users.findOne({
        where: { id: id },
        attributes: ['resume', 'photo'],
      });
}

// const resultFileNameCompany = async (req, res) => {
//     const id = req.UserId.id
//     await Companies.findOne({
//         where: { id: id },
//         attributes: ['resume', 'photo'],
//       });
// }
