import { mongoDBConnect } from '../../../utils/database-connector'
import { chatRoomModel, messageModel, messageStatusModel } from '../../../no-sql-database-model'
import { shorterString } from '../../../utils/shorter-string'

const transactChatQueries = {
  transact_chat_rooms: async (_parent, { user_nik }) => {
    try {
      const { connection } = await mongoDBConnect()
      const d = await chatRoomModel.aggregate([
        {
          $lookup:{
            from:'chatroomusers',
            localField:'room_code',
            foreignField:'room_code',
            as:'chatroomUsers',
                
          }
        },
         
        { $match:{ 'chatroomUsers.user_nik':user_nik } },
         
        {
          $project:{
            id:'$id',
            room_code:'$room_code',
            room_name:'$room_name',
            is_private:'$is_private',
            members:'$chatroomUsers.user_nik'
          }
        }
      ]).exec()
      const queries = d.map(async item => {
        const latestChat = await messageModel.findOne({ room_code:item.room_code }).sort({ date_sent:-1 })
        if(latestChat !== null) {
          return {
            ...item,
            latest_sender:latestChat.sender_user_nik,
            latest_message:shorterString(20, latestChat.message),
            date_sent:latestChat.date_sent
          }
        }
        return {
          ...item,
          latest_sender:null,
          latest_message:null,
          date_sent:null
        } 
      })
      const foo = d.map(async item => {
        const unreadMessage = await messageStatusModel.find({ room_code:item.room_code, user_nik, is_read:false }).countDocuments()
        return {
          ...item,
          unread_message:unreadMessage
        }
      })
      const messages = await Promise.all(queries)
      const dataWithUnreadMessage = await Promise.all(foo)
      const data = dataWithUnreadMessage.map(item => {
        const latestMessage = messages.find(x => x.room_code === item.room_code)
        return {
          ...item,
          latest_sender:latestMessage.latest_sender,
          latest_message:latestMessage.latest_message,
          date_sent:latestMessage.date_sent
        }
      })
      connection.close()
      return data
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  },
  transact_chat_messages: async (_parent, { room_code }) => {
    try {
      const { connection } = await mongoDBConnect()
      const data = await messageModel.find({ room_code }).sort({ date_sent:-1 }).limit(200)
      const total = await messageModel.find({ room_code }).countDocuments()
      connection.close()
      return {
        total,
        data
      }
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  }
}
export default transactChatQueries