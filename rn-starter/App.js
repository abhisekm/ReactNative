import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import FirstExercise from './src/screens/FirstExercise';
import ListScreen from './src/screens/ListScreen';
import ExerciseFlatListScreen from './src/screens/ExerciseFlatListScreen';
import ImageScreen from './src/screens/ImageScreen';
import CounterScreen from './src/screens/CounterScreen';
import ColorScreen from './src/screens/ColorScreen';
import SquareScreen from './src/screens/SquareScreen';
import ReducerScreen from './src/screens/ReducerScreen';
import CounterReducerScreen from './src/screens/CounterReducerScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    Ex1: FirstExercise,
    Ex2: ExerciseFlatListScreen,
    List: ListScreen,
    ImageScreen: ImageScreen,
    Counter: CounterScreen,
    Colors: ColorScreen,
    Square: SquareScreen,
    Reducer: ReducerScreen,
    Ex3: CounterReducerScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
