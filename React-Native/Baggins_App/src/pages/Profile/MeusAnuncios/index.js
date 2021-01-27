import Reactotron from "reactotron-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../../services/api";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Card,
  Button,
  Input,
  ButtonGroup,
  ListItem,
} from "react-native-elements";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;

const component1 = () => <Text>Meus Anuncios</Text>;
const component2 = () => <Text>Publicar</Text>;
const component3 = () => <Text>Aprovar</Text>;

export default function MeusAnuncios({ navigation }) {
  const [curriculo, setCurriculo] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = [
    { element: component1 },
    { element: component2 },
    { element: component3 },
  ];

  function updateIndex(selectedIndex) {
    setSelectedIndex(selectedIndex);
  }

  return (
    <View
      style={{
        top: 0,
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          top: 0,
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5FCFF",
        }}
      >
        <Spinner
          visible={spinner}
          textContent={"Verificando..."}
          textStyle={{ color: "#CCC" }}
        />
      </View>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        selectedButtonStyle={{ backgroundColor: "#f2ac33" }}
        selectedTextStyle={{ color: "#3a397b" }}
        containerStyle={{
          height: 50,
          borderRadius: 15,
          backgroundColor: "transparent",
        }}
      />

      <Card
        containerStyle={{
          height: "80%",
          width: "95%",
          // marginTop: "50%",
          marginBottom: "10%",
          borderRadius: 10,
        }}
      >
        {selectedIndex === 0 && <Tab1 navigation={navigation} />}
        {selectedIndex === 1 && <Tab2 navigation={navigation} />}
        {selectedIndex === 2 && <Tab3 navigation={navigation} />}
      </Card>
    </View>
  );
}
