const uuid = require('uuid');
import models from '../models';
import { QueryTypes } from'sequelize';

const now = new Date();

export default class Doctor {
  constructor() {

  }

  static async saveDoctorsDepartment(req, res) {
    try {
      if (!req.body) {
        console.error('POST .../department/add failed: no body provided');
        return res.status(400).send({
          message: 'New Doctors Department failed. no body provided'
        });
      }
      if (!req.body.departments) {
        console.error('POST .../department/add failed: no departments data provided');
        return res.status(400).send({
          message: 'New Doctors Department failed. no departments data provided'
        });
      }

      let returnSavedResponse = [];
      for (let i = 0; i < req.body.departments.length; i++) {
        let department = req.body.departments[i];
        //find already saved departments
        const departmentDetails = await models.doctorDepartments.findOne({
          where: {
            name: department.name
          },
          raw: true
        });
        if (departmentDetails && departmentDetails.name) {
          console.error(`POST .../department/add failed: ${departmentDetails.name} already exists`);
          return res.status(400).send({
            message: `New Doctors Department failed. ${departmentDetails.name} already exists`
          });
        }
        let creationDocument = {
          uid: uuid.v4(),
          name: department.name,
          createdOn: now,
          updatedOn: now
        }
        // Save new user records in one transaction
        await models.sequelize.transaction(async t => {
          // now save the document
          let creation = await models.doctorDepartments.create(creationDocument, { transaction: t });
          const sanitisedResults = creation.get({ plain: true });
          returnSavedResponse.push({
            id: sanitisedResults.ID,
            createdOn: sanitisedResults.createdOn,
            updatedOn: sanitisedResults.updatedOn
          });
        });
      }
      return res.status(200).json(returnSavedResponse);

    } catch (error) {
      console.error(`Error on POST .../department/add failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to save doctors department details'
      });
    }
  }

  static async allDoctorsDepartment(req, res) {
    try {
      const departmentLists = await models.doctorDepartments.findAll({
        order: [['name', 'ASC']],
        raw: true
      });
      return res.status(200).send(departmentLists);
    } catch (error) {
      console.error(`Error on GET /appointment failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to get all appointments'
      });
    }
  }

  static async updateDoctorProfile(req, res) {
    try {
      if (!req.body) {
        console.error('POST .../doctor failed: no body provided');
        return res.status(400).send({
          message: 'Update Doctor profile failed. no body provided'
        });
      }
      await models.sequelize.transaction(async t => {
        const updateDocDetails = await models.doctors.update({
          clinicName: req.body.clinicName,
          aadharNo: req.body.aadharNo,
          consultationFee: req.body.consultationFee,
          departments: JSON.stringify(req.body.department),
          specialization: req.body.specialization,
          experience: req.body.experience,
          qualification: req.body.qualification,
          state: req.body.state,
          city: req.body.city,
          address: req.body.address,
          aboutYourself: req.body.aboutYourself,
          updatedOn: now
        },
          {
            returning: true,
            where: {
              userId: req.user.id
            },
            attributes: ['id', 'updated'],
            transaction: t,
          }
        );

        if (updateDocDetails) {debugger;

          const updateUserDetails = await models.users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            updatedOn: now
          },
            {
              returning: true,
              where: {
                uid: req.params.uid
              },
              attributes: ['id', 'updated'],
              transaction: t,
            }
          );
          if (updateUserDetails) {
            return res.status(200).json({ message: 'Profile details updated successfully.' });
          }
        }
      });
    } catch (error) {
      console.error(`Error on POST .../doctor failed: ${error}`);
      return res.status(503).json({
        message: 'Failed to update doctors profile details'
      });
    }
  }

  static async getAllFilteredDoctors(req, res){
    try{
      const doctorsQuery = `
        SELECT *
        FROM videoApp."doctors" a
        JOIN videoApp."users" b
        ON a."UserID" = b."ID"
        WHERE a."State" = :state
        AND a."CIty" = :city
      `
      const doctorsList = await models.sequelize.query(doctorsQuery,
        {
          replacements: {
            state: req.body.state,
            city: req.body.city
          },
          type: QueryTypes.SELECT
        });

      if(doctorsList && doctorsList.length > 0){

      }
      return res.status(200).json(doctorsList);
    }catch(error){

    }
  }
}
