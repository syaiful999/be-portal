const transactChatSubscription = {
  subscribe_transact_chat:{
    subscribe:(_parent, { roomCode }, { pubSub }) => {
      return pubSub.asyncIterator(roomCode)
    }
  },
  subscribe_transact_chat_room: {
    subscribe:(_parent, { user_nik }, { pubSub }) => {
      return pubSub.asyncIterator(user_nik)
    }
  }
}
export default transactChatSubscription