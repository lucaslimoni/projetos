import Reactotron from "reactotron-react-native";
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../../../services/api";
import SelectMultiple from "react-native-select-multiple";
import Icon from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-date-ranges";
import { Input, Button, Card } from "react-native-elements";
import { list1, list2 } from "../Lists";
import reactotron from "reactotron-react-native";
import Toast from "react-native-tiny-toast";

const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;

export default function EditarAnuncio({ navigation }) {
  const [id] = useState(navigation.state.params.oportunidade.id);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [salario, setSalario] = useState("");
  const [horasSemanais, setHoras] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(0);
  const [listaRequisitos, setListaReq] = useState([]);
  const [listaOfertas, setListaOferta] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [tipoEmpresa, setTipoEmpresa] = useState(0);

  function customButton(onConfirm) {
    return (
      <View style={{ width: "95%" }}>
        <Button
          title="&nbsp;&nbsp;SALVAR"
          containerStyle={{ marginBottom: "10%" }}
          buttonStyle={{
            borderRadius: 5,
            width: "100%",
            // backgroundColor: "#3a397b",
          }}
          onPress={onConfirm}
        />
      </View>
    );
  }
  function onSelectionsChangeOferta(lista) {
    setListaOferta(lista);
  }
  function onSelectionsChangeRequisito(lista) {
    setListaReq(lista);
  }
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
            setTipoEmpresa(resp.data.tipoEmpresa);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        api
          .get(`/oroportunidade/${id}`, { headers: headerParams })
          .then(async (resp) => {
            reactotron.log(resp);
            setTitulo(resp.data[0].titulo);
            setDescricao(resp.data[0].descricao);
            setSalario(resp.data[0].salario);
            setHoras(resp.data[0].horasSemanais);
            setRequisitos(resp.data[0].requisitos);
            setStartDate(resp.data[0].disponibilidadeInicio);
            setEndDate(resp.data[0].disponibilidadeFinal);
            setHabilidades(resp.data[0].habilidades);
            setOfertas(resp.data[0].ofertas);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
      }
    });
  }, []);
  useEffect(() => {
    reactotron.log(listaOfertas);
    reactotron.log(listaRequisitos);
  }, [listaOfertas]);

  useEffect(() => {
    let tempOfertas = [];
    ofertas.forEach((element) => {
      const o = { value: element.id };
      tempOfertas.push(o);
    });
    setListaOferta(tempOfertas);

    let tempHabilidades = [];
    habilidades.forEach((element) => {
      const h = { value: element.id };
      tempHabilidades.push(h);
    });
    setListaReq(tempHabilidades);
  }, [ofertas, habilidades]);

  function onSave() {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };
        api
          .get(`/tipoempresa/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            console.log(resp);
            api
              .put(
                `/oportunidade/${id}`,
                {
                  idAnfitriao: resp.data.id,
                  titulo: titulo,
                  descricao: descricao,
                  horasSemanais: horasSemanais,
                  requisitos: requisitos,
                  salario: salario,
                  disponibilidadeInicio: startDate,
                  disponibilidadeFinal: endDate,
                },
                { headers: headerParams }
              )
              .then(async (resp) => {
                ofertas.forEach((element) => {
                  api
                    .delete(`/oportunidadeoferta/${id}/${element.id}`, {
                      headers: headerParams,
                    })
                    .then(async (resp) => {
                      listaOfertas.forEach((element) => {
                        api
                          .post(
                            `/oportunidadeoferta`,
                            {
                              idOportunidade: id,
                              idOferta: element.value,
                            },
                            { headers: headerParams }
                          )
                          .then(async (resp) => {
                            reactotron.log(resp);
                          });
                      });
                      habilidades.forEach((element) => {
                        api
                          .delete(`/requisito/${id}/${element.id}`, {
                            headers: headerParams,
                          })
                          .then(async (resp) => {
                            listaRequisitos.forEach((element) => {
                              api
                                .post(
                                  `/requisito`,
                                  {
                                    idOportunidade: id,
                                    idHabilidade: element.value,
                                  },
                                  { headers: headerParams }
                                )
                                .then(async (resp) => {
                                  Toast.showSuccess(
                                    "Vaga atualizada com sucesso"
                                  );
                                });
                            });
                          });
                      });
                    });
                });
              })
              .catch((err) => {
                Toast.show("Erro ao cadastrar vaga");
              });
          })
          .catch((err) => {
            Toast.show("Erro ao cadastrar vaga");
          });
      }
    });
  }

  function header() {
    return (
      <>
        <Card
          containerStyle={{
            borderRadius: 5,
            marginBottom: "-6%",
          }}
        >
          <Input
            label={"Titulo"}
            placeholder="Titulo"
            value={titulo}
            onChangeText={(event) => {
              setTitulo(event);
            }}
          />
          <Input
            label={"Descrição da Vaga"}
            placeholder="Descrição"
            multiline={true}
            numberOfLines={4}
            value={descricao}
            onChangeText={(event) => {
              setDescricao(event);
            }}
          />
          <Text
            style={{
              marginBottom: "1%",
              marginTop: "3%",

              alignSelf: "center",
            }}
          >
            O que você irá oferecer?
          </Text>
          <SelectMultiple
            items={list1}
            selectedItems={listaOfertas}
            onSelectionsChange={onSelectionsChangeOferta}
          />
        </Card>
      </>
    );
  }

  function footer() {
    return (
      <Card
        containerStyle={{
          borderBottomEndRadius: 5,
          borderBottomLeftRadius: 5,
          marginBottom: "5%",
        }}
      >
        <Text
          style={{
            marginBottom: "1%",
            alignSelf: "center",
          }}
        >
          Como o voluntário irá ajudar?
        </Text>
        <View>
          <SelectMultiple
            items={list2}
            selectedItems={listaRequisitos}
            onSelectionsChange={onSelectionsChangeRequisito}
          />
          <Input
            label={"Quais são os requisitos para essa vaga?"}
            placeholder="Requisitos"
            multiline={true}
            numberOfLines={4}
            value={requisitos}
            onChangeText={(event) => {
              setRequisitos(event);
            }}
          />
          <Input
            label={"Salário"}
            disabled={tipoEmpresa === 2 || salario === 0}
            placeholder={
              tipoEmpresa === 2 || salario === 0
                ? "ONG não precisa informar salário"
                : "Salário"
            }
            keyboardType="numeric"
            value={salario}
            onChangeText={(event) => {
              setSalario(event);
            }}
          />
          <Input
            label={"Horas Semanais"}
            placeholder="Horas Semanais"
            keyboardType="numeric"
            value={horasSemanais}
            onChangeText={(event) => {
              setHoras(event);
            }}
          />
          <Text
            style={{
              marginBottom: "1%",
              marginTop: "3%",

              alignSelf: "center",
            }}
          >
            Disponibilidade
          </Text>
          <DatePicker
            blockBefore={true}
            customStyles={{
              placeholderText: { fontSize: 20 }, // placeHolder style
              headerStyle: "Disponibilidade", // title container style
              headerMarkTitle: { display: "none" }, // title mark style
              headerDateTitle: {}, // title Date style
              contentInput: {}, //content text container style
              contentText: {}, //after selected text Style
            }} // optional
            centerAlign // optional text will align center or not
            selectedBgColor="#3a397b"
            // allowFontScaling={false} // optional
            placeholder={startDate + " até " + endDate}
            mode={"range"}
            outFormat={"DD/MM/YYYY"}
            returnFormat={"DD-MM-YYYY"}
            dateSplitter={"até"}
            customButton={customButton}
            onConfirm={(value) => {
              setStartDate(value.startDate);
              setEndDate(value.endDate);
            }}
          />
          <View>
            <Button
              title="&nbsp;&nbsp;SALVAR"
              icon={<Icon name="md-create" color="#ffffff" size={28} />}
              containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
              // iconRight={true}
              buttonStyle={{
                borderRadius: 5,
                width: "100%",
              }}
              onPress={() => {
                onSave();
                navigation.navigate("MeusAnuncios");
              }}
            />
          </View>
        </View>
      </Card>
    );
  }

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <FlatList
        ListHeaderComponent={header()}
        ListFooterComponent={footer()}
        scrollEnabled={true}
        scrollsToTop={true}
      />
    </View>
  );
}
