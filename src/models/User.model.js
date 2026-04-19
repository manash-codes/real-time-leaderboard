const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
        toJson: {
            transform(doc, ret) {
                delete ret.password
                delete ret.__v
                return ret
            }
        }
    });

module.exports = model('User', userSchema);
