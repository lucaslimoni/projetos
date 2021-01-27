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
import reactotron from "reactotron-react-native";

const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;
export default function Tab3({ navigation }) {
  const [lista, setLista] = useState([]);

  const list = [
    {
      title: "Appointments",
      icon: "av-timer",
    },
    {
      title: "Trips",
      icon: "flight-takeoff",
    },
  ];
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        // setTimeout(() => {
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };
        api
          .get(`/tipoempresa/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            api
              .get(`/oportunidadeanfitriao/${resp.data.id}`, {
                headers: headerParams,
              })
              .then(async (resp) => {
                setLista(resp.data);
              })
              .catch((err) => {
                reactotron.log("Err: ", err);
              });
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        // }, 500);
      }
    });
  }, []);

  useEffect(() => {
    reactotron.log(lista);
  }, [lista]);

  return (
    <ScrollView>
      <View>
        {lista &&
          lista.map((item, i) => (
            <ListItem
              key={i}
              title={item.titulo}
              leftIcon={{ name: item.icon }}
              bottomDivider
              chevron
              onPress={() => {
                navigation.navigate("Aprovar", {
                  candidatura: {
                    list: item.candidaturas,
                  },
                });
              }}
            />
          ))}
      </View>
    </ScrollView>
  );
}
