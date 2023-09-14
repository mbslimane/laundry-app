import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeScreen from './screens/HomeScreen';
import {Provider} from 'react-redux'
import store from './store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
       <StackNavigator/>
       <StatusBar style="auto" />
    </Provider>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
