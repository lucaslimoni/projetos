import reactotron from "reactotron-react-native";
import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../../services/api";
import config from "../../../firebase-config";
import firebase from "firebase";

export default function Cadastro({ navigation }) {
  const [spinner, setSpinner] = useState(false);
  const [securityText, setSecurityText] = useState(true);
  const [securityTextConfirm, setSecurityTextConfirm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [myFirebase, setMyfirebase] = useState();
  const [myFireStore, setMyfirestore] = useState();

  useEffect(() => {
    reactotron.log(config);
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      // console.log("firebase apps already running...");
    }
    // if (!firebase.apps.length) {
    //   setMyfirebase(firebase.initializeApp(config));
    //   setMyfirestore(
    //     firebase.firestore().settings({
    //       timestampsInSnapshots: true,
    //     })
    //   );
    // } else {
    //   console.log("firebase apps already running...");
    // }
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
          source={require("../../../assets/img/background/bagginsLogo_1.png")}
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
          label={"Nome"}
          placeholder={"Nome"}
          leftIcon={{ type: "font-awesome", name: "user" }}
          leftIconContainerStyle={{ marginLeft: -2 }}
          onChangeText={(event) => {
            setNome(event);
          }}
        />
        <Input
          label={"Email"}
          placeholder={"Email"}
          leftIcon={{ type: "font-awesome", name: "at" }}
          leftIconContainerStyle={{ marginLeft: -2 }}
          onChangeText={(event) => {
            setEmail(event);
          }}
        />
        <Input
          label={"Senha"}
          placeholder={"Senha"}
          secureTextEntry={securityText}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          leftIconContainerStyle={{ marginLeft: -2 }}
          value={senha}
          errorMessage={errorMessage}
          onChangeText={(event) => {
            setSenha(event);
          }}
          rightIcon={{
            type: "font-awesome",
            name: securityText === true ? "eye" : "eye-slash",
            onPress: () => {
              if (securityText === true) {
                setSecurityText(false);
              } else {
                setSecurityText(true);
              }
            },
          }}
        />
        <Input
          label={"Confirmar senha"}
          placeholder={"Confirmar senha"}
          secureTextEntry={securityTextConfirm}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          leftIconContainerStyle={{ marginLeft: -2 }}
          valuer={confirmSenha}
          onChangeText={(event) => {
            setConfirmSenha(event);
          }}
          rightIcon={{
            type: "font-awesome",
            name: securityTextConfirm === true ? "eye" : "eye-slash",
            onPress: () => {
              if (securityTextConfirm === true) {
                setSecurityTextConfirm(false);
              } else {
                setSecurityTextConfirm(true);
              }
            },
          }}
          errorMessage={errorMessage}
        />
        <Button
          title="&nbsp;&nbsp;CADASTRAR"
          //   icon={<Icon name="md-create" color="#ffffff" size={28} />}
          containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
          // iconRight={true}
          buttonStyle={{
            borderRadius: 5,
            width: "100%",
            backgroundColor: "#3A397B",
          }}
          onPress={async () => {
            if (senha === confirmSenha && senha.length >= 6) {
              setErrorMessage(false);
              setSpinner(true);
              try {
                api
                  .post("/pessoa", { nome, email, senha })
                  .then(async function(resp) {
                    reactotron.log("Resp: ", resp);
                    await firebase
                      .auth()
                      .createUserWithEmailAndPassword(email, senha)
                      .then(async function(data) {
                        reactotron.log("usuario criado no firebase", data);
                        await firebase
                          .auth()
                          .signInWithEmailAndPassword(email, senha)
                          .then(async function(res) {
                            reactotron.log("Autenticado no chat");
                          });
                      })
                      .catch(function(error) {
                        reactotron.log(error.message);
                      });
                    setTimeout(() => {
                      setSpinner(false);
                      navigation.navigate(
                        "Login"
                        // , {
                        //   dados: userData,
                        // }
                      );
                    }, 1000);
                  })
                  .catch((err) => {
                    setSpinner(false);
                    reactotron.log("Erro: ", err);
                  });
              } catch (error) {
                setSpinner(false);
                reactotron.log(error);
              }
            } else {
              if (senha.length < 6) {
                setErrorMessage("Senha deve ter no minimo 6 digitos");
              } else {
                setErrorMessage("Senhas não coicidem");
              }
            }
          }}
        />
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
          textContent={"Cadastrando..."}
          textStyle={{ color: "#CCC" }}
        />
      </View>
    </View>
  );
}
