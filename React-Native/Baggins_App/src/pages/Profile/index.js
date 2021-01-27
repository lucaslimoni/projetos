import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../services/api";
import Toast from "react-native-tiny-toast";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Divider,
  Avatar,
} from "react-native-elements";
import {
  faUserCog,
  faLaptop,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { classes } from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY_TOKEN = "@token";
import reactotron from "reactotron-react-native";

const storage = async (storage_key) => {
  let userData;
  try {
    userData = await AsyncStorage.getItem(storage_key).then((response) => {
      return response;
    });
    // reactotron.log("item lido com sucesso");
  } catch (error) {
    // reactotron.log(error);
  }
  // reactotron.log(userData);
  return userData;
};

function getRandom(max) {
  return Math.floor(Math.random() * max + 1);
}

export default function Profile({ navigation }) {
  // reactotron.log("Profile: ", navigation);
  const [num, setNum] = useState([]);
  const [idAnfitriao, setIdAnfitriao] = useState();

  const [storeToken, setStoreToken] = useState("");

  useEffect(() => {
    storage(STORAGE_KEY_TOKEN).then((resp) => {
      setStoreToken(JSON.parse(resp));
    });
    setNum(getRandom(20));
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        // setTimeout(() => {
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };
        api
          .get(`/pessoa/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            // reactotron.log("anfitriao", resp);
            if (resp.data !== "") {
              setIdAnfitriao(resp.data.anfitriao);
            }
          })
          .catch((err) => {
            // reactotron.log("Err: ", err);
          });
        // }, 500);
      }
    });
  }, []);
  // reactotron.log("StoreToken: ", storeToken);
  // reactotron.log(num);
  return (
    <View style={classes.root}>
      <View style={classes.modulo}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DadosPessoais", {
              source: num,
            });
          }}
        >
          <Card
            title="DADOS PESSOAIS"
            titleStyle={{ color: "#3a397b" }}
            // image={require("../../assets/img/personData.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            containerStyle={{
              borderRadius: 5,
              backgroundColor: "#fff",
              elevation: 3,
              borderColor: "#f2ac33",
            }}
          >
            {/* <View>
              <Image
                style={{ width: "100%", height: "50%" }}
                resizeMode="cover"
                source={require("../../assets/img/personData.png")}
              /> */}
            <Text style={{ textAlign: "center" }}>
              <FontAwesomeIcon icon={faUserCog} color="#3a397b" size={100} />
            </Text>
            {/* </View> */}
            {/* <ImageBackground
              // source={require("../../assets/img/personData.png")}
              style={{ width: "100%", height: "100%" }}
              // onPress={() => {
              //   alert("You tapped the button!");
              // }}
            > */}
            {/* <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 26,
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: 20,
                }}
              >
                DADOS PESSOAIS
              </Text> */}
            {/* </View> */}
            {/* </ImageBackground> */}
          </Card>
        </TouchableOpacity>
      </View>
      <Divider style={{ backgroundColor: "#ffffff" }} />
      <View style={classes.modulo}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              "Curriculo"
              // , {
              //   oportunidade: {
              //     index: index,
              //     id: item.id,
              //     title: item.title,
              //     uri: item.uri,
              //     descricao: item.descricao,
              //   },
              // }
            );
          }}
        >
          <Card
            title="CURRÍCULO"
            // image={require("../../assets/img/personData.png")}
            style={{ width: "100%", height: "100%" }}
            containerStyle={{
              borderRadius: 5,
              backgroundColor: "#fff",
              elevation: 3,
              borderColor: "#f2ac33",
            }}
            titleStyle={{ color: "#3a397b" }}
          >
            <Text style={{ textAlign: "center" }}>
              <FontAwesomeIcon icon={faFileAlt} color="#3a397b" size={100} />
            </Text>
          </Card>
          {/* <ImageBackground
            source={require("../../assets/img/abilities.jpg")}
            style={{ width: "100%", height: "100%" }}
            // onPress={() => {
            //   alert("You tapped the button!");
            //   console.log("teste curriculo");
            // }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 26,
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: 20,
                }}
              >
                CURRICULO
              </Text>
            </View>
          </ImageBackground> */}
        </TouchableOpacity>
      </View>
      <Divider style={{ backgroundColor: "#ffffff" }} />

      <View style={classes.modulo}>
        <TouchableOpacity
          onPress={() => {
            if (idAnfitriao === undefined || idAnfitriao === 0) {
              Toast.show("Você ainda não é um anfitrião");
            }
            if (idAnfitriao !== 0) {
              navigation.navigate(
                "MeusAnuncios"
                // , {
                //   oportunidade: {
                //     index: index,
                //     id: item.id,
                //     title: item.title,
                //     uri: item.uri,
                //     descricao: item.descricao,
                //   },
                // }
              );
            }
          }}
        >
          <Card
            title="MEUS ANÚNCIOS"
            // image={require("../../assets/img/personData.png")}
            style={{ width: "100%", height: "100%" }}
            containerStyle={{
              borderRadius: 5,
              backgroundColor: "#fff",
              elevation: 3,

              borderColor: "#f2ac33",
            }}
            titleStyle={{ color: "#3a397b" }}
          >
            <Text style={{ textAlign: "center" }}>
              <FontAwesomeIcon icon={faLaptop} color="#3a397b" size={100} />
            </Text>
          </Card>
          {/* <ImageBackground
            source={require("../../assets/img/interest.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
            // onPress={() => {
            //   alert("You tapped the button!");
            // }}
          >
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 26,
                  fontWeight: "bold",
                  color: "#ffffff",
                  marginTop: 20,
                }}
              >
                MEUS ANUNCIOS
              </Text>
            </View>
          </ImageBackground> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}
