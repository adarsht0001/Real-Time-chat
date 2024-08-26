import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

const GroupModel = model('groups', groupSchema);
export default GroupModel;
