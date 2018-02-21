import mongoose from 'mongoose';
import { db } from '../../mongoose';
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');

export async function findInactives() {

}

export async function get(id) {

    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
        user = await db.app.users.findById(id).exec();
    }
    if (user) {
        return user;
    }
    throw new Error(JSON.stringify({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
    }));

}
