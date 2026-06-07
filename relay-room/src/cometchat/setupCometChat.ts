import { CometChatUIKit, UIKitSettingsBuilder } from '@cometchat/chat-uikit-react'
import { COMETCHAT_CONSTANTS } from './constants'

let setupPromise: Promise<void> | null = null

async function connectCometChat(): Promise<void> {
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

export function setupCometChat(): Promise<void> {
  if (!setupPromise) {
    setupPromise = connectCometChat().catch((error) => {
      setupPromise = null
      throw error
    })
  }

  return setupPromise
}

export function getCometChatErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error === 'object' && error !== null) {
    const record = error as Record<string, unknown>
    if (typeof record.message === 'string' && record.message) {
      return record.code
        ? `${record.message} (${String(record.code)})`
        : record.message
    }
  }

  return 'Failed to connect to CometChat'
}
