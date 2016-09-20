"use strict";

import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import {User} from "../models/user";
//mailgun = require('../config/mailgun'),
//mailchimp = require('../config/mailchimp'),
import config from "../config/config";
import { Router, Request, Response } from "express";

export class AuthenticationRouter {
    private router: Router = Router();
    constructor(){
    }
    getRouter(): Router {

        this.router.post("/authentication/login",(request: Request, response: Response) => {
            let userInfo = this.setUserInfo(request.user);

            response.status(200).json({
                token: 'JWT ' + this.generateToken(userInfo),
                user: userInfo
            });
        });

        this.router.post("/authentication/register",(request: Request, response: Response, next:Function) => {
            // Check for registration errors
            const email = request.body.email;
            const firstName = request.body.firstName;
            const lastName = request.body.lastName;
            const password = request.body.password;

            // Return error if no email provided
            if (!email) {
                return response.status(422).send({ error: 'You must enter an email address.'});
            }

            // Return error if full name not provided
            if (!firstName || !lastName) {
                return response.status(422).send({ error: 'You must enter your full name.'});
            }

            // Return error if no password provided
            if (!password) {
                return response.status(422).send({ error: 'You must enter a password.' });
            }

            User.findOne({ email: email }, function(err, existingUser) {
                if (err) { return next(err); }

                // If user is not unique, return error
                if (existingUser) {
                    return response.status(422).send({ error: 'That email address is already in use.' });
                }

                // If email is unique and password was provided, create account
                let user = new User({
                    email: email,
                    password: password,
                    profile: { firstName: firstName, lastName: lastName }
                });

                user.save(function(err, user) {
                    if (err) { return next(err); }

                    // Subscribe member to Mailchimp list
                    // mailchimp.subscribeToNewsletter(user.email);

                    // Respond with JWT if user was created
                    let userInfo = this.setUserInfo(user);

                    response.status(201).json({
                    token: 'JWT ' + this.generateToken(userInfo),
                    user: userInfo
                    });
                });
            });
        });

        return this.router;
    }
    private generateToken(user:any) {
        return jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
        });
    }
    private setUserInfo(request:any) {
    let getUserInfo = {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
    };
    return getUserInfo;
    }
}


// //========================================
// // Registration Route
// //========================================
// exports.register = function(req, res, next) {
//   // Check for registration errors
//   const email = req.body.email;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const password = req.body.password;

//   // Return error if no email provided
//   if (!email) {
//     return res.status(422).send({ error: 'You must enter an email address.'});
//   }

//   // Return error if full name not provided
//   if (!firstName || !lastName) {
//     return res.status(422).send({ error: 'You must enter your full name.'});
//   }

//   // Return error if no password provided
//   if (!password) {
//     return res.status(422).send({ error: 'You must enter a password.' });
//   }

//   User.findOne({ email: email }, function(err, existingUser) {
//       if (err) { return next(err); }

//       // If user is not unique, return error
//       if (existingUser) {
//         return res.status(422).send({ error: 'That email address is already in use.' });
//       }

//       // If email is unique and password was provided, create account
//       let user = new User({
//         email: email,
//         password: password,
//         profile: { firstName: firstName, lastName: lastName }
//       });

//       user.save(function(err, user) {
//         if (err) { return next(err); }

//         // Subscribe member to Mailchimp list
//         // mailchimp.subscribeToNewsletter(user.email);

//         // Respond with JWT if user was created

//         let userInfo = setUserInfo(user);

//         res.status(201).json({
//           token: 'JWT ' + generateToken(userInfo),
//           user: userInfo
//         });
//       });
//   });
// }

// //========================================
// // Authorization Middleware
// //========================================

// // Role authorization check
export function roleAuthorization(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
}

// //========================================
// // Forgot Password Route
// //========================================

// exports.forgotPassword = function(req, res, next) {
//   const email = req.body.email;

//   User.findOne({ email: email }, function(err, existingUser) {
//     // If user is not found, return error
//     if (err || existingUser == null) {
//       res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
//       return next(err);
//     }

//       // If user is found, generate and save resetToken

//       // Generate a token with Crypto
//       crypto.randomBytes(48, function(err, buffer) {
//         const resetToken = buffer.toString('hex');
//         if (err) { return next(err); }

//         existingUser.resetPasswordToken = resetToken;
//         existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         existingUser.save(function(err) {
//           // If error in saving token, return it
//           if (err) { return next(err); }

//           const message = {
//             subject: 'Reset Password',
//             text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//             'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//             'http://' + req.headers.host + '/reset-password/' + resetToken + '\n\n' +
//             'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//           }

//           // Otherwise, send user email via Mailgun
//           mailgun.sendEmail(existingUser.email, message);

//           res.status(200).json({ message: 'Please check your email for the link to reset your password.'});
//           next();
//         });
//       });
//   });
// }

// //========================================
// // Reset Password Route
// //========================================

// exports.verifyToken = function(req, res, next) {
//   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, resetUser) {

//     // If query returned no results, token expired or was invalid. Return error.
//       if(!resetUser) {
//         res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
//       }

//       // Otherwise, save new password and clear resetToken from database
//       resetUser.password = req.body.password;
//       resetUser.resetPasswordToken = undefined;
//       resetUser.resetPasswordExpires = undefined;

//       resetUser.save(function(err) {
//         if (err) { return next(err); }

//         // If password change saved successfully, alert user via email
//         const message = {
//           subject: 'Password Changed',
//           text: 'You are receiving this email because you changed your password. \n\n' +
//           'If you did not request this change, please contact us immediately.'
//         }

//         // Otherwise, send user email confirmation of password change via Mailgun
//         mailgun.sendEmail(resetUser.email, message);

//         res.status(200).json({ message: 'Password changed successfully. Please login with your new password.'});
//         next();
//       });
//   });
// }