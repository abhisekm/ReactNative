import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import FirstExercise from './src/screens/FirstExercise';
import ListScreen from './src/screens/ListScreen';
import ExerciseFlatListScreen from './src/screens/ExerciseFlatListScreen';
import ImageScreen from './src/screens/ImageScreen';
import CounterScreen from './src/screens/CounterScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    Ex1: FirstExercise,
    Ex2: ExerciseFlatListScreen,
    List: ListScreen,
    ImageScreen: ImageScreen,
    Counter: CounterScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
