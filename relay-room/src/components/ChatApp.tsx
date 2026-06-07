import { useState } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import {
  CometChatConversations,
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
} from '@cometchat/chat-uikit-react'
import './ChatApp.css'

export function ChatApp() {
  const [selectedUser, setSelectedUser] = useState<CometChat.User>()
  const [selectedGroup, setSelectedGroup] = useState<CometChat.Group>()

  const handleItemClick = (conversation: CometChat.Conversation) => {
    const entity = conversation.getConversationWith()

    if (entity instanceof CometChat.User) {
      setSelectedUser(entity)
      setSelectedGroup(undefined)
    } else if (entity instanceof CometChat.Group) {
      setSelectedGroup(entity)
      setSelectedUser(undefined)
    }
  }

  return (
    <div className="chat-app">
      <aside className="chat-sidebar">
        <CometChatConversations onItemClick={handleItemClick} />
      </aside>
      <main className="chat-main">
        {selectedUser || selectedGroup ? (
          <>
            <CometChatMessageHeader user={selectedUser} group={selectedGroup} />
            <CometChatMessageList user={selectedUser} group={selectedGroup} />
            <CometChatMessageComposer
              user={selectedUser}
              group={selectedGroup}
            />
          </>
        ) : (
          <div className="chat-empty">
            Select a conversation to start chatting
          </div>
        )}
      </main>
    </div>
  )
}
