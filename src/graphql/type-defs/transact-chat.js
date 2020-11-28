const transactChat = `
  input transactRoomMember {
    user_nik:String!
  }

  type transactChatSubscriptionModel {
    id:ID
    room_code:String
    sender:String
    message:String
    date_sent:DateTime
    is_generated:Boolean
  }
  type transactChatRoomModel {
    id:ID
    room_code:String
    room_name:String
    is_private:Boolean
    members:[String]!
  }
  type transactChatMessageData {
    id:ID
    room_code:String
    sender_user_nik:String
    message:String
    date_sent:DateTime
    is_generated:Boolean
    is_read:Boolean
  }
  type transactChatMessageModel {
    total:Int!
    data:[transactChatMessageData!]!
  }
  type transactChatRoomQueryModel {
    id:ID
    room_code:String
    room_name:String
    is_private:Boolean
    members:[String]!
    latest_sender:String
    latest_message:String
    date_sent:DateTime
    unread_message:Int
  }
  extend type Query {
    transact_chat_rooms(user_nik:String!):[transactChatRoomQueryModel!]!
    transact_chat_messages(room_code:String!):transactChatMessageModel!
  }
  extend type Mutation {
    post_chat(room_code:String!, sender:String!, message:String!):transactChatSubscriptionModel!,
    create_room(members:[transactRoomMember!]!, room_name:String):transactChatRoomModel!
    update_message_status(user_nik:String!, room_code:String!):String!
  }
  extend type Subscription {
    subscribe_transact_chat(roomCode:String!):transactChatSubscriptionModel!
    subscribe_transact_chat_room(user_nik:String!):transactChatRoomQueryModel!
  }
`
export default transactChat