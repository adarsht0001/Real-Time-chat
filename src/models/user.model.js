import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

const userModel = model('users', userSchema);
export default userModel;
