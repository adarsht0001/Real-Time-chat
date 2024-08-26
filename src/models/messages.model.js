import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'groups',
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = model('messages', messageSchema);
export default MessageModel;
