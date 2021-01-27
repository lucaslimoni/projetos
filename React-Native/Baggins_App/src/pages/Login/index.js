import reactotron from "reactotron-react-native";
import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../services/api";
import config from "../../firebase-config";
import firebase from "firebase";
import { AppString } from "./Const";

// import * as firebase from "firebase";
// import "firebase/firestore";
// const firebase = require("firebase");

// import firebase from "@firebase/app";
import "firebase/firestore";
// import firebase from "react-native-firebase";

import AsyncStorage from "@react-native-community/async-storage";
const STORAGE_KEY_TOKEN = "@token";

export default function Login({ navigation }) {
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      AsyncStorage.getItem(STORAGE_KEY_TOKEN).then((response) => {
        if (response) {
          navigation.navigate("App", {
            dados: response.data,
          });
        }
      });
    } catch (error) {
      reactotron.log(error);
    }
  });
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      // console.log("firebase apps already running...");
    }
  }, []);

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
      <View style={{ width: "80%" }}>
        <ImageBackground
          source={require("../../assets/img/background/bagginsLogo_1.png")}
          style={{ width: 300, height: 120 }}
        />
      </View>
      <View
        style={{
          width: "95%",
          top: "5%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Input
          label={"Usuário"}
          placeholder={"Usuário"}
          leftIcon={{ type: "font-awesome", name: "user" }}
          leftIconContainerStyle={{ marginLeft: -2 }}
          onChangeText={(event) => {
            setEmail(event);
          }}
        />
        <Input
          label={"Senha"}
          placeholder={"Senha"}
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          leftIconContainerStyle={{ marginLeft: -2 }}
          onChangeText={(event) => {
            setSenha(event);
          }}
          errorMessage={errorMessage}
        />
        <Button
          title="&nbsp;&nbsp;LOGIN"
          //   icon={<Icon name="md-create" color="#ffffff" size={28} />}
          containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
          // iconRight={true}
          buttonStyle={{
            borderRadius: 5,
            width: "100%",
            backgroundColor: "#3A397B",
          }}
          onPress={async () => {
            setSpinner(true);
            let usuario = { email, senha };
            try {
              api
                .post("/authenticate", usuario)
                .then(async (resp) => {
                  reactotron.log("usuario", resp);
                  setErrorMessage("");
                  await AsyncStorage.setItem(
                    STORAGE_KEY_TOKEN,
                    JSON.stringify(resp.data)
                  );

                  await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, senha)
                    .then(async (result) => {
                      const { user } = result;
                      reactotron.log(user);
                      reactotron.log(user.email);
                      await AsyncStorage.setItem(AppString.ID, user.uid);
                      await AsyncStorage.setItem(
                        AppString.EMAIL_CHAT,
                        user.email
                      );
                      await AsyncStorage.setItem(
                        AppString.NICKNAME,
                        resp.data.pessoa.nome
                      );
                      await AsyncStorage.setItem(
                        AppString.PHOTO_URL,

                        `http://api.baggins.ml/avatar/${resp.data.pessoa.id}`
                      );

                      const fb = await firebase
                        .firestore()
                        .collection(AppString.NODE_USERS)
                        .where(AppString.ID, "==", user.uid)
                        .get();
                      if (fb.docs.length === 0) {
                        await firebase
                          .firestore()
                          .collection("users")
                          .doc(user.uid)
                          .set({
                            id: user.uid,
                            nickname: resp.data.pessoa.nome,
                            email: user.email,
                            aboutMe: "",
                            photoUrl: `http://api.baggins.ml/avatar/${
                              resp.data.pessoa.id
                            }`,
                          })
                          .then((data) => {
                            reactotron.log("USER FIREBASE", data);
                          })
                          .catch((err) => {
                            reactotron.log(err.message);
                          });
                      }
                    })
                    .catch((err) => {
                      reactotron.log(err.message);

                      // this.props.showToast(0, err.message)
                      // this.setState({ isLoading: false });
                    });

                  setTimeout(() => {
                    setSpinner(false);
                    navigation.navigate("App", {
                      dados: resp.data,
                    });
                  }, 500);
                })
                .catch((err) => {
                  reactotron.log("Err: ", err);
                  setErrorMessage("Usuário ou senha incorretos!");
                  setSpinner(false);
                });
            } catch (error) {
              reactotron.log(error);
            }
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                "Cadastro"
                // , {
                //   source: num,
                // }
              );
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#3A397B",
              }}
            >
              Criar uma conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                "RecuperarSenha"
                // , {
                //   source: num,
                // }
              );
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#3A397B",
              }}
            >
              Esqueci minha senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          top: 0,
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3A397B",
        }}
      >
        <Spinner
          visible={spinner}
          textContent={"Autenticando..."}
          textStyle={{ color: "#CCC" }}
        />
      </View>
      {/* <View style={{ width: "95%" }}>
        
        
      </View> */}
    </View>
  );
}
