import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button, Input } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../../services/api";
import reactotron from "reactotron-react-native";
import Toast from "react-native-tiny-toast";

const console = reactotron;
export default function RecuperarSenha({ navigation }) {
  const [spinner, setSpinner] = useState(false);
  const [securityText, setSecurityText] = useState(true);
  const [securityTextConfirm, setSecurityTextConfirm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [enviado, setEnviado] = useState(false);
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
        {enviado && (
          <Input
            label={"Código"}
            placeholder={"Codigo"}
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={{ marginLeft: -2 }}
            onChangeText={(event) => {
              setToken(event);
            }}
          />
        )}
        {!enviado && (
          <Input
            label={"Email"}
            placeholder={"Email"}
            leftIcon={{ type: "font-awesome", name: "at" }}
            leftIconContainerStyle={{ marginLeft: -2 }}
            onChangeText={(event) => {
              setEmail(event);
            }}
          />
        )}

        {enviado && (
          <>
            <Input
              label={"Nova Senha"}
              placeholder={"Nova Senha"}
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
              label={"Confirmar nova senha"}
              placeholder={"Confirmar nova senha"}
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
          </>
        )}
        <Button
          title={enviado ? "SALVAR" : "ENVIAR"}
          //   icon={<Icon name="md-create" color="#ffffff" size={28} />}
          containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
          // iconRight={true}
          buttonStyle={{
            borderRadius: 5,
            width: "100%",
            backgroundColor: "#3A397B",
          }}
          onPress={async () => {
            if (enviado === false) {
              api
                .post("/recuperarsenha", { email: email })
                .then(async (resp) => {
                  console.log(resp);
                })
                .catch(async (err) => {
                  console.log("Err: ", err);
                });
            }
            setEnviado(true);
            if (senha === confirmSenha && senha.length >= 6) {
              api
                .put("/recuperarsenha", { token: token, senha: senha })
                .then(async (resp) => {
                  setSpinner(false);
                  Toast.showSuccess("Senha alterada");
                  navigation.navigate("Login");
                })
                .catch(async (err) => {
                  console.log("Err: ", err);
                });
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
          textContent={"Alterando senha..."}
          textStyle={{ color: "#CCC" }}
        />
      </View>
    </View>
  );
}
