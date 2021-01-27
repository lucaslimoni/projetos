import Reactotron from "reactotron-react-native";
import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Input, Button, Card, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { classes } from "./style.js";
import Spinner from "react-native-loading-spinner-overlay";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../../../services/api";
import { CheckBox } from "react-native-elements";
import Toast from "react-native-tiny-toast";

import reactotron from "reactotron-react-native";

const STORAGE_KEY_TOKEN = "@token";

export default function AlterarDadosPessoais({ navigation }) {
  const [spinner, setSpinner] = useState(false);
  const [checked1, setChecked1] = useState();
  const [checked2, setChecked2] = useState();
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [tipooportunidade, setTipoOportunidade] = useState([]);

  function onSave() {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };
          api
            .post(
              `/anfitriao`,
              {
                idPessoa: json.pessoa.id,
                tipoEmpresa: tipooportunidade,
                nomeEmpresa: nomeEmpresa,
              },
              { headers: headerParams }
            )
            .then(async (resp) => {
              api
                .post(
                  `/enderecoanfitriao`,
                  {
                    idAnfitriao: resp.data.id,
                    cidade: cidade,
                    estado: estado,
                    pais: pais,
                    endereco: endereco,
                    complemento: complemento,
                  },
                  { headers: headerParams }
                )
                .then(async (resp) => {
                  Toast.showSuccess("Dados enviados para análise!", {
                    mask: true,
                    maskStyle: {
                      backgroundColor: "#FF0000",
                      opacity: 0.6,
                    },
                  });
                  navigation.navigate("DadosPessoais");
                })
                .catch((err) => {
                  reactotron.log("Err: ", err);
                });
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
        }, 100);
      }
    });
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
          <Text
            style={{
              marginBottom: "1%",
              marginTop: "1%",

              alignSelf: "center",
            }}
          >
            Selecione o Tipo de Empresa
          </Text>
          <RNPickerSelect
            onValueChange={(value) => setTipoOportunidade(value)}
            placeholder={{ label: "Selecione uma opção", value: null }}
            items={[{ label: "ONG", value: 2 }, { label: "Empresa", value: 3 }]}
          />
          <Text
            style={{
              marginBottom: "1%",
              marginTop: "1%",

              alignSelf: "center",
            }}
          >
            Informe o Endereço da Empresa
          </Text>
          <Input
            label={"País"}
            placeholder="País"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={pais}
            onChangeText={(event) => {
              setPais(event);
            }}
          />
          <Input
            label={"Estado"}
            placeholder="Estado"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={estado}
            onChangeText={(event) => {
              setEstado(event);
            }}
          />
          <Input
            label={"Cidade"}
            placeholder="Cidade"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={cidade}
            onChangeText={(event) => {
              setCidade(event);
            }}
          />
          <Input
            label={"Endereço"}
            placeholder="Endereço"
            leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={endereco}
            onChangeText={(event) => {
              setEndereco(event);
            }}
          />
          <Input
            label={"Complemento"}
            placeholder="Complemento"
            // leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={complemento}
            onChangeText={(event) => {
              setComplemento(event);
            }}
          />
          <Input
            label={"Nome Empresa"}
            placeholder="Nome Empresa"
            // leftIcon={{ type: "font-awesome", name: "map-marker" }}
            leftIconContainerStyle={classes.inputIcon}
            value={nomeEmpresa}
            onChangeText={(event) => {
              setNomeEmpresa(event);
            }}
          />
          <Text
            style={{
              marginBottom: "1%",
              marginTop: "1%",
              alignSelf: "center",
            }}
          >
            Selecione o plano
          </Text>
          <CheckBox
            containerStyle={{ backgroundColor: "transparent" }}
            title="Escolhendo o plano mensal o valor será de R$59,90/mês"
            checked={checked1}
            onPress={() => {
              setChecked1(!checked1);
              if (checked2 === true) {
                setChecked2(false);
              }
            }}
          />
          <CheckBox
            containerStyle={{ backgroundColor: "transparent" }}
            title="Escolhendo o plano anual o valor será de R$600,90/ano"
            checked={checked2}
            onPress={() => {
              setChecked2(!checked2);
              if (checked1 === true) {
                setChecked1(false);
              }
            }}
          />
        </ScrollView>
      </Card>
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
          onPress={() => onSave()}
        />
      </View>
    </View>
  );
}
