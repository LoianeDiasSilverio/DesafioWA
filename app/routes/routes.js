import { createStackNavigator } from "react-navigation";
import TelaInicial from '../home/tela_inicial';
import Alerts from '../utils/msgs';

const Routes = createStackNavigator(
  {
    Home: {
      screen: TelaInicial
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: Alerts.Mensagens.DESAFIOWA,
      headerStyle: {
        backgroundColor: "#0047BA"
      },
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "normal"
      }
    }
  }
);

export default Routes;
