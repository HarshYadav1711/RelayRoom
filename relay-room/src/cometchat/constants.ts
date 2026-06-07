export const COMETCHAT_CONSTANTS = {
  APP_ID: import.meta.env.VITE_COMETCHAT_APP_ID ?? '',
  REGION: import.meta.env.VITE_COMETCHAT_REGION ?? '',
  AUTH_KEY: import.meta.env.VITE_COMETCHAT_AUTH_KEY ?? '',
  UID: import.meta.env.VITE_COMETCHAT_UID ?? 'cometchat-uid-1',
}

export function hasCometChatCredentials(): boolean {
  return Boolean(
    COMETCHAT_CONSTANTS.APP_ID &&
      COMETCHAT_CONSTANTS.REGION &&
      COMETCHAT_CONSTANTS.AUTH_KEY,
  )
}
