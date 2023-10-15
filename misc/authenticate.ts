import * as LocalAuthentication from 'expo-local-authentication';
import {startActivityAsync, ActivityAction} from 'expo-intent-launcher';
import {Alert, Platform} from 'react-native';

const authenticate = async (onSuccess: () => void) => {
  try {
    const result = await LocalAuthentication.authenticateAsync();
    if (result.success) {
      onSuccess();
    } else if (Platform.OS === 'android' && result.error === 'not_enrolled') {
      Alert.alert(
        'Security Settings',
        'Please set up your device screen lock for authentication',
        [
          {
            text: 'Go to Settings',
            onPress: () => startActivityAsync(ActivityAction.SECURITY_SETTINGS),
          },
        ],
      );
    }
  } catch (err: any) {
    console.log(err);
  }
};

export default authenticate;
