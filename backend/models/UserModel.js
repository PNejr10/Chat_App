import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    User: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,

    },
    Password: {
        type: String,
        required: true,
        
      },
      friends:{
        type: Array,
        default: []
    },


  },
  {
    timestamps: true,
  }
);

export const UserDB = mongoose.model('Users', userSchema);