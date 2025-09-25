import Keychain from 'react-native-keychain'

export async function saveRefreshToken(token: string){
    await Keychain.setGenericPassword(
        'refresh',                 // username placeholder (unused)
        token,                     // password = secret
        {
            service: 'glasses-for-good',
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET, // or .USER_PRESENCE
            authenticationPrompt: {
                title: 'Unlock session',
                subtitle: 'Authenticate to continue',
                description: 'Your session token is protected',
                cancel: 'Cancel',
            },
            securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE, // prefers Secure Enclave
        }
    )
}

export async function loadRefreshToken(): Promise<string | null> {
  const creds = await Keychain.getGenericPassword({
    service: 'glasses-for-good',
    authenticationPrompt: { title: 'Unlock session' },
  });
  return creds ? creds.password : null;
}

export async function deleteRefreshToken() {
  await Keychain.resetGenericPassword({ service: 'glasses-for-good' });
}