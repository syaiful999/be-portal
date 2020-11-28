import mongoose from 'mongoose'

const chatRoom = mongoose.model('ChatRoom', {
  id:mongoose.Types.ObjectId,
  room_name:String,
  room_code:String,
  is_private:Boolean
})
export default chatRoom