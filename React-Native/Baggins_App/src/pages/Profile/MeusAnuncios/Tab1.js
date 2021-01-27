import Reactotron from "reactotron-react-native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import api from "../../../services/api";
import { Card, Button, Icon } from "react-native-elements";

import reactotron from "reactotron-react-native";
import Toast from "react-native-tiny-toast";

const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;

const users = [
  {
    name: "brynn",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
  },
];
export default function Tab1({ navigation }) {
  const [lista, setLista] = useState([]);

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
              .get(`/oportunidades/${resp.data.id}`, {
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

  function onDelete(id) {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };
          api
            .delete(`/oportunidade/${id}`, { headers: headerParams })
            .then(async (resp) => {
              Toast.showSuccess("Vaga deletada");
              api
                .get(`/tipoempresa/${json.pessoa.id}`, {
                  headers: headerParams,
                })
                .then(async (resp) => {
                  api
                    .get(`/oportunidades/${resp.data.id}`, {
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
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
        }, 500);
      }
    });
  }

  console.log("ListaMeusAnuncios: ", lista);
  return (
    <ScrollView>
      {lista.length > 0 ? (
        lista.map((u, i) => {
          return (
            <View key={i}>
              <Card
                containerStyle={{ borderRadius: 5 }}
                title={u.titulo}
                image={require("../../../assets/img/background/travel/1.jpg")}
              >
                <Text
                  style={{
                    marginBottom: 10,
                  }}
                  numberOfLines={3}
                >
                  {u.descricao}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Button
                    // title={"Detalhes da Vaga"}
                    icon={
                      <Icon name="bars" type="font-awesome" color="#ffffff" />
                    }
                    buttonStyle={{
                      borderRadius: 5,
                      width: "60%",
                      backgroundColor: "#3a397b",
                      marginRight: "3%",
                    }}
                    containerStyle={{
                      marginTop: "1%",
                      marginBottom: "1%",
                    }}
                    onPress={() => {
                      navigation.navigate("Oportunidade", {
                        oportunidade: {
                          id: u.id,
                        },
                      });
                    }}
                  />

                  <Button
                    // title={"Deletar da Vaga"}
                    icon={
                      <Icon name="trash" type="font-awesome" color="#ffffff" />
                    }
                    buttonStyle={{
                      borderRadius: 5,
                      width: "60%",
                      backgroundColor: "#8B0000",
                    }}
                    containerStyle={{
                      marginTop: "1%",
                      marginBottom: "1%",
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Aviso",
                        "Esta ação não podera ser desfeita.",
                        [
                          {
                            text: "Cancelar",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              onDelete(u.id);
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                  />
                  <Button
                    // title={"Deletar da Vaga"}
                    icon={
                      <Icon name="edit" type="font-awesome" color="#ffffff" />
                    }
                    buttonStyle={{
                      borderRadius: 5,
                      width: "60%",
                      backgroundColor: "#006400",
                    }}
                    containerStyle={{
                      marginTop: "1%",
                      marginBottom: "1%",
                    }}
                    onPress={() => {
                      navigation.navigate("EditarAnuncio", {
                        oportunidade: { id: u.id },
                      });
                    }}
                  />
                </View>
              </Card>
            </View>
          );
        })
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Você ainda não possuí anuncios.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
