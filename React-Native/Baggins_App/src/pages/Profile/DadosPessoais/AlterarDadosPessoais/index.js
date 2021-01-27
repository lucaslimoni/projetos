import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Input, Button, Card, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { classes } from "./style.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment";
import api from "../../../../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import reactotron from "reactotron-react-native";
import Toast from "react-native-tiny-toast";

const STORAGE_KEY_TOKEN = "@token";

export default function AlterarDadosPessoais({ navigation }) {
  const [date, setDate] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState(null);
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");

  function onUpdateUser() {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };
          api
            .put(`/pessoa/${json.pessoa.id}`, {
              nome: nome,
              email: email,
              datanasc: date,
            })
            .then(async (resp) => {
              setNome(resp.data.nome);
              setEmail(resp.data.email);
              setDate(resp.data.datanasc);
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
          api
            .get(`/enderecopessoa/${json.pessoa.id}`, { headers: headerParams })
            .then(async (resp) => {
              if (resp.data === "") {
                api
                  .post(
                    `/enderecopessoa`,
                    {
                      idPessoa: json.pessoa.id,
                      cidade: cidade,
                      estado: estado,
                      pais: pais,
                      endereco: endereco,
                      complemento: complemento,
                      cep: cep,
                    },
                    { headers: headerParams }
                  )
                  .then(async (resp) => {
                    setCidade(resp.data.cidade);
                    setEstado(resp.data.estado);
                    setPais(resp.data.pais);
                    setEndereco(resp.data.endereco);
                    setComplemento(resp.data.complemento);
                    setCep(resp.data.cep);
                    Toast.showSuccess("Cadastrado com sucesso");
                  })
                  .catch((err) => {
                    reactotron.log("Err: ", err);
                  });
              } else {
                api
                  .put(
                    `/enderecopessoa/${json.pessoa.id}`,
                    {
                      cidade: cidade,
                      estado: estado,
                      pais: pais,
                      endereco: endereco,
                      complemento: complemento,
                      cep: cep,
                    },
                    { headers: headerParams }
                  )
                  .then(async (resp) => {
                    setCidade(resp.data.cidade);
                    setEstado(resp.data.estado);
                    setPais(resp.data.pais);
                    setEndereco(resp.data.endereco);
                    setComplemento(resp.data.complemento);
                    setCep(JSON.stringify(resp.data.cep));
                    Toast.showSuccess("Alterado com sucesso");
                  })
                  .catch((err) => {
                    Toast.show("Erro ao alterar");
                  });
              }
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });

          api
            .get(`/contato/${json.pessoa.id}`, { headers: headerParams })
            .then(async (resp) => {
              if (resp.data === "") {
                api
                  .post(
                    `/contato`,
                    { idPessoa: json.pessoa.id, numero: telefone },
                    {
                      headers: headerParams,
                    }
                  )
                  .then(async (resp) => {
                    setTelefone(resp.data.numero);
                  })
                  .catch((err) => {
                    reactotron.log("Err: ", err);
                  });
              } else {
                api
                  .put(
                    `/contato/${json.pessoa.id}`,
                    { numero: telefone },
                    {
                      headers: headerParams,
                    }
                  )
                  .then(async (resp) => {
                    setTelefone(resp.data.numero);
                  })
                  .catch((err) => {
                    reactotron.log("Err: ", err);
                  });
              }
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
          navigation.navigate("Profile", {
            recarregar: true,
          });
        }, 500);
      }
    });
  }

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        reactotron.log("pessoa", JSON.parse(response));
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };
          api
            .get(`/enderecopessoa/${json.pessoa.id}`, { headers: headerParams })
            .then(async (resp) => {
              setCidade(resp.data.cidade);
              setEstado(resp.data.estado);
              setPais(resp.data.pais);
              setEndereco(resp.data.endereco);
              setComplemento(resp.data.complemento);
              setCep(resp.data.cep);
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
          api
            .get(`/contato/${json.pessoa.id}`, { headers: headerParams })
            .then(async (resp) => {
              setTelefone(resp.data.numero);
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
          api
            .get(`/pessoa/${json.pessoa.id}`)
            .then(async (resp) => {
              setNome(resp.data.nome);
              setEmail(resp.data.email);
              setDate(resp.data.datanasc);
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
        }, 100);
      }
    });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(moment(currentDate).format("DD/MM/YYYY"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

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
          textContent={"Salvando..."}
          textStyle={{ color: "#CCC" }}
        />
      </View>
      <Card
        containerStyle={{
          height: "80%",
          width: "95%",
          borderRadius: 10,
          opacity: 0.7,
        }}
      >
        <ScrollView>
          <Input
            label={"Nome"}
            placeholder="Nome"
            leftIcon={{ type: "font-awesome", name: "address-card" }}
            leftIconContainerStyle={classes.inputIcon}
            value={nome ? nome : ""}
            onChangeText={(event) => {
              setNome(event);
            }}
          />
          <Input
            label={"Data Nascimento"}
            // editable={false}
            placeholder="Data Nascimento"
            value={date}
            keyboardAppearance={"dark"}
            leftIcon={{ type: "font-awesome", name: "calendar" }}
            leftIconContainerStyle={classes.inputIcon}
            onTouchStart={showDatepicker}
          />
          <Input
            label={"Email"}
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            leftIconContainerStyle={classes.inputIcon}
            keyboardType={"email-address"}
            value={email ? email : ""}
            onChangeText={(event) => {
              setEmail(event);
            }}
          />
          <Input
            label={"Telefone"}
            placeholder="Telefone"
            leftIcon={{ type: "font-awesome", name: "mobile" }}
            leftIconContainerStyle={classes.inputIcon}
            value={telefone ? telefone : ""}
            keyboardType={"numeric"}
            onChangeText={(event) => {
              setTelefone(event);
            }}
          />
          <Input
            label={"País"}
            placeholder="País"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={pais ? pais : ""}
            onChangeText={(event) => {
              setPais(event);
            }}
          />
          <Input
            label={"Estado"}
            placeholder="Estado"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={estado ? estado : ""}
            onChangeText={(event) => {
              setEstado(event);
            }}
          />
          <Input
            label={"Cidade"}
            placeholder="Cidade"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={cidade ? cidade : ""}
            onChangeText={(event) => {
              setCidade(event);
            }}
          />
          <Input
            label={"Endereço"}
            placeholder="Endereço"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={endereco ? endereco : ""}
            onChangeText={(event) => {
              setEndereco(event);
            }}
          />
          <Input
            label={"Complemento"}
            placeholder="Complemento"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={complemento ? complemento : ""}
            onChangeText={(event) => {
              setComplemento(event);
            }}
          />
        </ScrollView>
      </Card>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          // timeZoneOffsetInMinutes={0}
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          locale={"pt-BR"}
        />
      )}
      <View style={{ width: "95%" }}>
        <Button
          title="&nbsp;&nbsp;SALVAR"
          icon={<Icon name="md-create" color="#ffffff" size={28} />}
          containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
          // iconRight={true}
          buttonStyle={{
            borderRadius: 5,
            width: "100%",
          }}
          onPress={() => onUpdateUser()}
        />
      </View>
    </View>
  );
}
