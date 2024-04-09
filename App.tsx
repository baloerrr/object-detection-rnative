import { NavigationContainer } from '@react-navigation/native';
import Stack from './navigations/Stack';
import "@tensorflow/tfjs-react-native";


export default function App() {

  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
}


