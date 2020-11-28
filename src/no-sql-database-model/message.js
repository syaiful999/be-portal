import mongoose from 'mongoose'

const message = mongoose.model('Message', {
  id:mongoose.Types.ObjectId,
  sender_user_nik:String,
  room_code:String,
  message:String,
  date_sent:Date,
  is_generated:Boolean
})
export default message