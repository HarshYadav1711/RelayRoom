import { CometChatUIKit, UIKitSettingsBuilder } from '@cometchat/chat-uikit-react'
import { COMETCHAT_CONSTANTS } from './constants'

export async function setupCometChat(): Promise<void> {
  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(COMETCHAT_CONSTANTS.APP_ID)
    .setRegion(COMETCHAT_CONSTANTS.REGION)
    .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
    .subscribePresenceForAllUsers()
    .build()

  await CometChatUIKit.init(UIKitSettings)

  const existingUser = await CometChatUIKit.getLoggedinUser()
  if (!existingUser) {
    await CometChatUIKit.login(COMETCHAT_CONSTANTS.UID)
  }
}
