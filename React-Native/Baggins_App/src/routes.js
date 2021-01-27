import React from "react";
import "react-native-gesture-handler";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { View, TouchableOpacity, Alert } from "react-native";
import Home from "./pages/Home/home";
import Profile from "./pages/Profile";
import Buscar from "./pages/buscar";
import Chat from "./pages/Chat/chat";
import ChatScreen from "./pages/Chat/chatScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Oportunidade from "./pages/Oportunidade";
import DadosPessoais from "./pages/Profile/DadosPessoais";
import MeusAnuncios from "./pages/Profile/MeusAnuncios";
import EditarAnuncio from "./pages/Profile/MeusAnuncios/EditarAnuncio";
import CurriculoDetail from "./pages/Profile/CurriculoDetail";
import Curriculo from "./pages/Profile/Curriculo";
import AlterarDadosPessoais from "./pages/Profile/DadosPessoais/AlterarDadosPessoais";
import TornarAnfitriao from "./pages/Profile/DadosPessoais/TornarAnfitriao";
import Login from "./pages/Login";
import Cadastro from "./pages/Login/Cadastro";
import RecuperarSenha from "./pages/Login/RecuperarSenha";
import Aprovar from "./pages/Profile/Aprovar";
import AsyncStorage from "@react-native-community/async-storage";
import reactotron from "reactotron-react-native";
import api, { apiRecSys } from "./services/api";

const console = reactotron;
const STORAGE_KEY_TOKEN = "@token";
let homeProps = [];

function getApi() {
  AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
    if (response) {
      const json = JSON.parse(response);
      const headerParams = {
        Authorization: `Bearer ${json.token.token}`,
      };
      apiRecSys.get(`/recommender/${json.pessoa.id}`).then(async (resp) => {
        console.log("Recommender: ", resp.data.length);
        console.log("Recommender: ", resp.data);
        if (resp.data.length === 0) {
          homeProps = false;
        } else {
          await homeProps.push(resp.data);
        }
      });
    }
  });
}
const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Cadastro: {
      screen: Cadastro,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    RecuperarSenha: {
      screen: RecuperarSenha,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Recuperar Senha",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert("Info.", "Página para recuperar senha.");
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
      headerStyle: {
        backgroundColor: "#f2ac33",
      },
    },
  },

  {
    mode: "card",
    headerMode: "float",
  }
);

const SearchStack = createStackNavigator({
  Buscar: {
    screen: Buscar,
    navigationOptions: {
      headerShown: true,
      headerTitleAlign: "center",
      headerTitle: "Buscar Vagas",
      headerTintColor: "#fff",
      headerRight: ({ tintColor, navigation }) => (
        <View>
          <Icon
            onPress={() => {
              Alert.alert(
                "Info.",
                "Esta página tem como objetivo apresentar ao usuário todas as vagas ativas no sistema, possibilitando que seja possível que o usuário realize os filtros desejados."
              );
            }}
            style={[{ color: tintColor, paddingRight: 20 }]}
            size={25}
            name={"md-alert"}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f2ac33",
      },
    },
  },
  Oportunidade: {
    screen: Oportunidade,
    navigationOptions: {
      headerTitleAlign: "center",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#f2ac33",
      },
    },
  },
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      params: {
        homeProps,
      },
      navigationOptions: {
        headerShown: true,
        headerTitleAlign: "center",
        headerTitle: "Vagas Recomendadas",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página tem como objetivo apresentar ao usuário as vagas recomendadas pelo sistema de recomendação Baggins."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    Oportunidade: {
      screen: Oportunidade,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
  },

  {
    mode: "card",
    headerMode: "float",
  }
);

const ChatStack = createStackNavigator(
  {
    Chat: {
      screen: Chat,
      params: {
        homeProps,
      },
      navigationOptions: {
        headerShown: true,
        headerTitleAlign: "center",
        headerTitle: "Chat",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página tem como objetivo apresentar ao usuário todos os chats disponíveis para o mesmo."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("Chat");
        },
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Chat",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
  },

  {
    mode: "card",
    headerMode: "float",
  }
);
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Profile",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário ter acesso as funcionalidades de Dados pessoais."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    DadosPessoais: {
      screen: DadosPessoais,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Dados Pessoais",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página tem como objetivo apresentar ao usuário todos opções para acesso a tela de cadastrar e alterar seus dados pessoais, acesso a tela de tornar-se um anfitrião e realizar o logout do sistema ."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    AlterarDadosPessoais: {
      screen: AlterarDadosPessoais,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Alterar Dados Pessoais",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário cadastrar e alterar seus Dados pessoais."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    TornarAnfitriao: {
      screen: TornarAnfitriao,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Tornar-se Anfitrião",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário realizar o cadastro para tornar-se um anfitrião."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    Curriculo: {
      screen: Curriculo,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário realizar o cadastro referente ao seu currículo, adicionando ou removendo idíomas, habilidades e falando mais sobre ele mesmo."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    MeusAnuncios: {
      screen: MeusAnuncios,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Meus Anuncios",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário publicar, alterar e deletar um anúncio, aprovar, recusar e verificar o currículo dos candidatos."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    EditarAnuncio: {
      screen: EditarAnuncio,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Editar Anuncio",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário editar um anúncio."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    Oportunidade: {
      screen: Oportunidade,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário verificar e candidatar-se a oportunidade caso o mesmo não seja o anfitrião responsável por ela."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    Aprovar: {
      screen: Aprovar,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário aprovar, recusar e verificar o currículo dos candidatos."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
    CurriculoDetail: {
      screen: CurriculoDetail,
      navigationOptions: {
        headerTitleAlign: "center",
        headerTitle: "Detalhes do Currículo",
        headerTintColor: "#fff",
        headerRight: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                Alert.alert(
                  "Info.",
                  "Esta página possibilita ao usuário verificar o currículo do candidatos."
                );
              }}
              style={[{ color: tintColor, paddingRight: 20 }]}
              size={25}
              name={"md-alert"}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: "#f2ac33",
        },
      },
    },
  },
  {
    mode: "card",
    headerMode: "float",
  }
);

const Tab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor, navigation }) => (
          <View>
            <Icon
              onPress={() => {
                getApi();
                navigation.navigate("Home", { homeProps });
              }}
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-home"}
            />
          </View>
        ),
        tabBarOnPress: ({ navigation }) => {
          getApi();
          navigation.navigate("Home", { homeProps });
        },
      },
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: "Buscar",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-search"}
            />
          </View>
        ),
      },
    },
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"md-chatbubbles"}
            />
          </View>
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="ios-person" />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: "Profile",
    activeColor: "#3a397b",
    inactiveColor: "#fff",
    barStyle: {
      backgroundColor: "#f2ac33",
    },
  }
);

export const Switch = createSwitchNavigator(
  {
    Login: LoginStack,
    App: Tab,
    Logout: LoginStack,
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(Switch);
