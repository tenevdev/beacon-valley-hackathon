var mongoose = require('mongoose'),
    // validation = require('../helpers/validation'),
    // encryption = require('bcrypt-schema').setEncryption,
    ObjectId = mongoose.Schema.Types.ObjectId

var placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    menu: [{
        type: ObjectId,
        ref: 'MenuSection'
    }],
    offers: [{
        type: ObjectId,
        ref: 'Offer'
    }],
    accent: {
        type: ObjectId,
        ref: 'Offer'
    }
    // hashedPassword: {
    //     type: String,
    //     //select: false
    // }
})

// placeSchema.path('name').validate(validation.uniqueFieldInsensitive('Place', 'name'),
//     'A place with the same name already exists')


// placeSchema.virtual('password')
//     .get(function() {
//         return this._password
//     })
//     .set(function(password) {
//         this._password = password
//     })

// placeSchema.pre('save', function(next) {

//     // Password has not changed
//     if (!this.isModified('password') && !this.isNew) {
//         return next()
//     }

//     //Password has changed or this is a new place
//     this.setPassword(this.password, next)
// })

// placeSchema.plugin(encryption, {
//     field: 'hashedPassword',
//     verify: 'verifyPassword',
//     set: 'setPassword'
// })

placeSchema.methods = {}
placeSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .populate('offers')
            .populate('menu')
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.model('Place', placeSchema)
