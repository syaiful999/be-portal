import mongoose from 'mongoose'

const messageStatus = mongoose.model('MessageStatus', {
  id:mongoose.Types.ObjectId,
  room_code:String,
  user_nik:String,
  is_read:Boolean
})
export default messageStatus