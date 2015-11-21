var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    expires: {
        type: Date
    }
})

offerSchema.methods = {}

offerSchema.statics = {
    getByTitle: function(offerTitle, isLean, next) {
        this.findOne({
            title: offerTitle
        })
            .lean(isLean)
            .exec(next)
    }
}

module.exports = mongoose.model('Offer', offerSchema)
