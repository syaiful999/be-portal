import mongoose from 'mongoose'

const chatRoomUser = mongoose.model('ChatRoomUser', {
  id:mongoose.Types.ObjectId,
  room_code:String,
  user_nik:String
})
export default chatRoomUser