import { useEffect } from "react";
// import { useStores } from "../../models/root-store"
import auth from '@react-native-firebase/auth';


export const ResolveAuthScreen = (props) => {
  // const { someStore } = useStores()

  useEffect(
    () => {
      const subscriber = auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          props.navigation.navigate("Dashboard")
        } else {
          props.navigation.navigate("LoginFlow")
        }
      })

      return subscriber;
    },
    []
  );

  return null;
}
