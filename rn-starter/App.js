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
import TextScreen from './src/screens/TextScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import BoxScreen from './src/screens/BoxScreen';
import FlexBoxScreen from './src/screens/FlexBoxScreen';
import PrimitiveScreen from './src/screens/PrimitiveScreen';
import StateScreen from './src/screens/StateScreen';
import TextInputScreen from './src/screens/TextInputScreen';
import PositionScreen from './src/screens/PositionScreen';
import LayoutExerciseScreen from './src/screens/LayoutExerciseScreen';
import LayoutScreen from './src/screens/LayoutScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Primitive: PrimitiveScreen,
    State: StateScreen,
    Layout: LayoutScreen,
    TextInput: TextInputScreen,
    Components: ComponentsScreen,
    Ex1: FirstExercise,
    Ex2: ExerciseFlatListScreen,
    List: ListScreen,
    ImageScreen: ImageScreen,
    Counter: CounterScreen,
    Colors: ColorScreen,
    Square: SquareScreen,
    Reducer: ReducerScreen,
    Ex3: CounterReducerScreen,
    Text: TextScreen,
    Password: PasswordScreen,
    Box: BoxScreen,
    FlexBox: FlexBoxScreen,
    Position: PositionScreen,
    LayoutEx: LayoutExerciseScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App'
    }
  }
);

export default createAppContainer(navigator);
