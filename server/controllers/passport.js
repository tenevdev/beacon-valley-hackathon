// var passport = require('passport'),
//     BasicStrategy = require('passport-http').BasicStrategy,
//     Place = require('../models').Resources.Place

// // Basic authentication for users
// // Requests should include Auhtorization: Basic <encoded username:password> header
// passport.use(new BasicStrategy(
//     function(username, password, next) {
//         Place.findOne({
//             name: username
//         }, 'hashedPassword', function(err, user) {
//             if (err) {
//                 return next(err)
//             }

//             // No user found with that username
//             if (!user) {
//                 return next(null, false)
//             }

//             // Make sure the password is correct
//             user.verifyPassword(password, function(err, isMatch) {
//                 if (err) {
//                     return next(err)
//                 }

//                 // Password did not match
//                 if (!isMatch) {
//                     return next(null, false)
//                 }

//                 // Success
//                 return next(null, user)
//             })
//         })
//     }
// ))

// // Authenticate access to user resources
// // Basic user authentication or
// // Bearer authentication of a client using an access token
// exports.isAuthenticated = passport.authenticate(['basic'], {
//     session: false
// })
