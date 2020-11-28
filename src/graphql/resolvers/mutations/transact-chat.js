import mongoose from 'mongoose'
import moment from 'moment'
import { messageModel, chatRoomModel, chatRoomUserModel, messageStatusModel } from '../../../no-sql-database-model'
import { mongoDBConnect } from '../../../utils/database-connector'
import { shorterString } from '../../../utils/shorter-string'

const uniqNameGenerator = () => Math.random().toString(36).substr(2, 9) + '-' + moment().format('X')

const transactChatMutation = {
  post_chat: async (_parent, { room_code, sender, message }, { pubSub }) => {
    try {
      const { connection } = await mongoDBConnect()
      const date_sent = new Date()
      const id = mongoose.Types.ObjectId()
      const subscriptionData = {
        subscribe_transact_chat:{
          id,
          message,
          room_code,
          sender,
          date_sent,
          is_generated:false
        }
      }
      pubSub.publish(room_code, subscriptionData)
      const input = new messageModel({
        id,
        sender_user_nik:sender,
        room_code:room_code,
        message,
        is_generated:false,
        date_sent:date_sent
      })
      await input.save()
      const dataMembers = await chatRoomUserModel.find({ room_code })
      const createManyData = dataMembers.filter(e => e.user_nik !== sender).map(async item => {
        const messageStatusData = new messageStatusModel({ 
          id: mongoose.Types.ObjectId(),  
          room_code,
          user_nik:item.user_nik,
          is_read:false
        })
        await messageStatusData.save()
        return null
      })
      await Promise.all(createManyData)
      connection.close()
      return subscriptionData.subscribe_transact_chat
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  },
  create_room: async (_parent, { members, room_name }, { pubSub }) => {
    try {
      const { connection } = await mongoDBConnect()
      const id = mongoose.Types.ObjectId()
      const roomName = room_name ? room_name: null
      const room_code = uniqNameGenerator()
      const is_private = members.length > 2 ? false: true
      const inputChatRoom = new chatRoomModel({ room_name:roomName, room_code, is_private, id })
      const inputChatRoomUser = members.map(async ({ user_nik }) => {
        const dataInput = new chatRoomUserModel({ room_code, user_nik, id })
        const d = await dataInput.save()
        return d
      })
      await inputChatRoom.save()
      await Promise.all(inputChatRoomUser)
      const inputInitialMessage = new messageModel({
        id:mongoose.Types.ObjectId(),
        sender_user_nik:members[0].user_nik,
        room_code,
        message:'Create Room chat',
        date_sent:new Date(),
        is_generated:true
      })
      await inputInitialMessage.save()
      const dataReturn = {
        id,
        room_code,
        room_name:roomName,
        is_private,
        members:members.map(item => item.user_nik)
      }
      const latestChat = await messageModel.findOne({ room_code }).sort({ date_sent:-1 })
      const subscriptionData = {
        subscribe_transact_chat_room:{
          ...dataReturn,
          latest_sender:latestChat.sender_user_nik,
          latest_message:shorterString(20, latestChat.message),
          date_sent:new Date(),
          unread_message:0
        }
      }
      members.map(item => item.user_nik).forEach(item => {
        pubSub.publish(item, subscriptionData)
      })
      connection.close()
      return dataReturn
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  },
  update_message_status: async (_parent, { user_nik, room_code }) => {
    try {
      const { connection } = await mongoDBConnect()
      await messageStatusModel.updateMany({ room_code, user_nik }, { $set:{ is_read:true } })
      connection.close()
      return `message in room ${room_code} for ${user_nik} was updated`
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  }
}
export default transactChatMutation
