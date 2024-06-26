const candidateDetails = require('../models/candidateDetail');
const candidate = require('../models/candidate');
const requirement = require('../models/requirement');
const statusCode = require('../models/statusList');
const recruiter = require('../models/recruiter');
const client = require("../models/client");
const candidateStatus = require("../models/myCandidateStatus");
const chatUser = require("../models/chatUser");
const user = require("../models/user");
const recruiterSettings = require("../models/recruiterSettings");
const recruiterWallet=require("../models/recruiterWallets");
const moment = require('moment');
const Source = require('../models/source');
const { Op } = require("sequelize");
exports.reportData=async(req,Code)=>{
    if(req.body.page){
  var page = req.body.page;
  }
  else
  {
  var page = 1
  }
    var limit = 10;
    var mywhere = { mainId: req.mainId, statusCode: Code };
    var recruiterWhere = {};
    if (req.body.fromDate && req.body.toDate) {

        const fromDate = moment(req.body.fromDate).startOf('day').toISOString();
        const toDate = moment(req.body.toDate).endOf('day').toISOString();
        if(Code!=312){
        mywhere.createdAt = {
            [Op.between]: [fromDate, toDate]
        }
    }
    else if(Code==309){
         mywhere["$candidate.joinedDate$"] = {
            [Op.between]: [fromDate, toDate]
        }
    }
    else{
        mywhere["$candidate.invoicedDate$"] = {
            [Op.between]: [fromDate, toDate]
        }
    }
    }
    if (req.body.recruiterId) {
        recruiterWhere.recruiterId = req.body.recruiterId
    }


    var include = [
        {
            model: candidate,
            where: recruiterWhere,
            required:true,
            include: [{
                model: candidateDetails,
                attributes: [
                    'firstName',
                    'lastName',
                    'email',
                    'mobile',
                    'skills',
                    'currentLocation',
                    'preferredLocation',
                    'nativeLocation',
                    'experience',
                    'relevantExperience',
                    'alternateMobile',
                    'gender',
                    'educationalQualification',
                    'differentlyAbled',
                    'currentCtc',
                    'expectedCtc',
                    'dob',
                    'noticePeriod',
                    'reasonForJobChange',
                    'candidateProcessed',
                    'reason',
                    'isExternal'
                  ]
            },
                Source,
            {
                model: requirement,
                attributes: ["requirementName", "id", "uniqueId"],
                include: [
                    {
                        model: statusCode,
                        attributes: ['statusName']
                    }, {
                        model: client,
                        attributes: ["clientName", "id", "uniqueId"],
                        include: [{ model: statusCode, attributes: ['statusName'] },{ model: recruiter, as: 'recruiter', attributes: ['id', 'firstName', 'lastName'] },
                        { model: recruiter, as: 'handler', attributes: ['id', 'firstName', 'lastName'] }],
                    }, {
                        model: recruiter,
                        attributes: ["id", "mainId", "firstName", "lastName"]
                    }
                ]
            },
            {
                model: statusCode,
                attributes: ['statusName'],
            }, {
                model: recruiter,
                attributes: ['firstName', 'lastName', 'mobile'],
                
            },
            ],
        }
    ];
    const mydata=await candidateStatus.findAndCountAll({
        distinct: true,
        // attributes:[''],
        where: mywhere,
        include: include,
        limit: limit,
        offset: (page * limit) - limit,
        order: [['createdAt', 'DESC']]
    });
    return mydata;
}