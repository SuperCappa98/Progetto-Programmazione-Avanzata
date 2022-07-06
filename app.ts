// Import libraries
'use strict';
import express from "express";
import * as controller from './controller/controller';
import * as CoR from './middleware/CoR';
import {SuccessMsgEnum, getSuccessMsg} from "./factory/successMsg";



// Creating express object (in this case, the app)
const app = express();

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Parse data into request body
app.use(express.json());

// Token Validation
app.use(CoR.jwt);

// Check token payload
app.use(CoR.jwtPayload);

// Route to check service
app.get('/', (req:any,res:any) => {
    const res_msg = getSuccessMsg(SuccessMsgEnum.AppStarted).getMsg();   
    res.status(res_msg.status).json({Message:res_msg.msg})
});

// Route to add vaccine
app.post('/addVax', CoR.checkAdmin, CoR.checkVaxData, (req:any,res:any) => {
    controller.addVax(req.body.vaxName, req.body.coverage, res);
});

// Route to add N doses of a vaccine
app.post('/addDoses', CoR.checkAdmin, CoR.checkDosesData, (req:any,res:any) => {
    controller.addVaxDoses(req.body.doses, req.body.batch, req.body.delivery_date, req.body.expiration_date, req.body.vaccine_id, res);
});



/*
 *  routes
 */


 
// Server Setup
app.listen(PORT, HOST);
console.log(`Server started on port ${PORT}`);