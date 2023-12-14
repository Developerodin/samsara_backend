import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [20, 'Username must be less than or equal to 10 characters.']
    },
    company_name: {
        type: String,
    },
    corporate_id:{
        type:String
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    mobile: {
        type: String,
        required: [true, 'Please provide a mobile number'],
        minlength: 10
    },
    dob: {
        type: String,
        required: [true, 'Please provide  data of birth'],
        
    },
    image: {
        type: String,
        default: 'default_image.jpg'
    },
    city: {
        type: String,
        required: [true, 'A user must have a city'],
        
    },
    pincode: {
        type: String,
        required: [true, 'A user must have a pincode'],
        
    },
    country: {
        type: String,
        required: [true, 'A user must have a country'],
        
    },
    height: {
        type: String,
        required: [true, 'user height is required'],
        
    },
    weight: {
        type: String,
        required: [true, 'user weight is required'],
        
    },
    health_issues:{
       type:Object
    },
    description: {
        type: String,
        
        
    },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    achievements: [String],
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    classFeedback: [
        {
          classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
          formData: { type: mongoose.Schema.Types.Mixed },
        },
      ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    status: {
        type: Boolean,
        default: true,
      },
    active: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: {
        }
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
/**
 * Reset Password
 */
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime());
        return JWTTimestamp < changedTimestamp;
    }
    // False means Not Changed
    return false;
}



export const User = mongoose.model('Users', userSchema);