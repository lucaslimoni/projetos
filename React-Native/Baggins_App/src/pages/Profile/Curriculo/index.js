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
import Toast from "react-native-tiny-toast";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import Textarea from "react-native-textarea";
import Swipeout from "react-native-swipeout";
import { classes } from "./style";
import StarRating from "react-native-star-rating";

const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;

const component1 = () => <Text>Idiomas</Text>;
const component2 = () => <Text>Habilidades</Text>;
const component3 = () => <Text>Quem sou eu</Text>;

export default function Curriculo({ navigation }) {
  const [curriculo, setCurriculo] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [idiomas, setIdiomas] = useState([]);
  const [idiomasProficiencia, setIdiomasProficiencia] = useState([]);
  const [selectedIdioma, setSelectedIdioma] = useState("");
  const [selectedProficiencia, setSelectedProficiencia] = useState("");
  const [selectedIdiomaToDelete, setSelectedIdiomaToDelete] = useState("");
  const [headerParams_, setHeaderParams_] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [quemSouEu, setQuemSouEu] = useState("");
  const [putOrPost, setPutOrPost] = useState("post");
  const [habilidadesList, setHabilidadesList] = useState([]);
  const buttons = [
    { element: component1 },
    { element: component2 },
    { element: component3 },
  ];

  function updateIndex(selectedIndex) {
    setSelectedIndex(selectedIndex);
  }

  useEffect(() => {
    setSpinner(true);
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };
          setHeaderParams_(headerParams);
          setIdUsuario(json.pessoa.id);
          api
            .get(`/curriculo/${json.pessoa.id}`, { headers: headerParams })
            .then(async (resp) => {
              if (resp.data === "") {
                console.log("Sem curriculo cadastrado");
                setPutOrPost("post");
              } else {
                setPutOrPost("put");
              }
              setQuemSouEu(resp.data);
            })
            .catch((err) => {
              console.log("Curriculo err:", err);
            });
          api
            .get(`/pessoaidioma/${json.pessoa.id}`, { headers: headerParams })
            .then(async (resp) => {
              if (resp.status !== 200) {
                setSpinner(false);
                Toast.show("Sem idioma cadastrado");
              }
              setCurriculo(resp.data);
            })
            .catch((err) => {
              Toast.show("Erro ao ler lista de idiomas", {
                mask: true,
                maskStyle: {
                  backgroundColor: "#FF0000",
                  opacity: 0.6,
                },
              });
            });
          api
            .get("/idiomas", { headers: headerParams })
            .then(async (resp) => {
              const idiomas_ = resp.data;
              let arrIdiomas = [];
              idiomas_.forEach((el) => {
                arrIdiomas.push({ label: el.idioma, value: el.id });
              });
              setIdiomas(arrIdiomas);
            })
            .catch((err) => {
              setIdiomas([{ label: "Nenhum idioma encontrado", value: null }]);
            });
          api
            .get("/idiomaproficiencia", { headers: headerParams })
            .then(async (resp) => {
              const idiomas_ = resp.data;
              let arrIdiomas = [];
              idiomas_.forEach((el) => {
                arrIdiomas.push({ label: el.proficiencia, value: el.id });
              });
              setIdiomasProficiencia(arrIdiomas);
            })
            .catch((err) => {
              setIdiomas([{ label: "Nenhum dado encontrado", value: null }]);
            });
          api
            .get("/habilidades", { headers: headerParams })
            .then(async (resp) => {
              let listHabilidades = resp.data;
              setHabilidadesList(resp.data);

              api
                .get(`/habilidadePessoa/${json.pessoa.id}`, {
                  headers: headerParams,
                })
                .then(async (resp) => {
                  if (resp.data.length > 0) {
                    let newArr_ = resp.data;
                    let newArr2 = [];
                    listHabilidades.forEach((el) => {
                      newArr2.push({
                        id: el.id,
                        habilidade: el.habilidade,
                        icon: el.icon,
                        rating: 0,
                      });
                    });
                    newArr_.forEach((el) => {
                      newArr2[el.idHabilidade - 1].rating = el.rateStar;
                    });
                    setHabilidadesList(newArr2);
                  }
                });
            });
          setSpinner(false);
        }, 500);
      }
    });
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <Swipeout
      right={swipeBtns}
      autoClose={true}
      backgroundColor="transparent"
      style={{ borderRadius: 10, padding: 5 }}
      onOpen={() => {
        setSelectedIdiomaToDelete(item.idIdioma);
        setIdUsuario(item.idPessoa);
      }}
      onClose={() => {
        setSelectedIdiomaToDelete("");
        setIdUsuario("");
      }}
    >
      <TouchableHighlight>
        <ListItem
          containerStyle={{ backgroundColor: "transparent" }}
          key={keyExtractor}
          title={item.idioma}
          subtitle={item.proficiencia}
          bottomDivider
          chevron
        />
      </TouchableHighlight>
    </Swipeout>
  );

  const swipeBtns = [
    {
      component: (
        <>
          <Button
            title="DELETAR"
            titleStyle={{ fontSize: 10, position: "absolute", bottom: -10 }}
            icon={<Icon name="md-trash" color="#ffffff" size={28} />}
            containerStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              backgroundColor: "#FF0000",
              borderRadius: 10,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
            }}
            onPress={() => {
              try {
                api
                  .delete(
                    `pessoaidioma/${selectedIdiomaToDelete}/${idUsuario}`,
                    {
                      headers: headerParams_,
                    }
                  )
                  .then(async (resp) => {
                    Toast.showSuccess("Deletado com sucesso!");
                    api
                      .get(`/pessoaidioma/${idUsuario}`, {
                        headers: headerParams_,
                      })
                      .then(async (resp) => {
                        setCurriculo(resp.data);
                      })
                      .catch((err) => {
                        console.log("Curriculo err:", err);
                      });
                  })
                  .catch((err) => {
                    Toast.show("Erro ao deletar idioma", {
                      mask: true,
                      maskStyle: {
                        backgroundColor: "#FF0000",
                        opacity: 0.6,
                      },
                    });
                  });
              } catch (error) {}
            }}
          />
        </>
      ),
      backgroundColor: "transparent",
    },
  ];

  function ratingCompleted(rating, index, item) {
    let habilidadePessoa = {
      idHabilidade: item.id,
      idPessoa: idUsuario,
      rateStar: rating,
    };

    let newArr = habilidadesList;
    let newArr2 = [];
    newArr.forEach((el) => {
      newArr2.push({
        id: el.id,
        habilidade: el.habilidade,
        icon: el.icon,
        rating: el.rating ? el.rating : 0,
      });
    });
    newArr2[index].rating = rating;
    setHabilidadesList(newArr2);

    api
      .get(`/habilidadePessoa/${idUsuario}`, { headers: headerParams_ })
      .then(async (resp) => {
        const habilidadePessoaListBanco = resp.data;
        if (resp.data.length === 0) {
          api
            .post(`/habilidadePessoa/`, habilidadePessoa, {
              headers: headerParams_,
            })
            .then(async (resp) => {
              Toast.showSuccess("Adicionado!");
            })
            .catch((err) => {
              Toast.show("Erro ao adicionar habilidade");
            });
        } else {
          let retorno = "0";
          habilidadePessoaListBanco.forEach((el) => {
            if (el.idHabilidade === habilidadePessoa.idHabilidade) {
              retorno = "1";
            }
          });

          switch (retorno) {
            case "0":
              api
                .post(`/habilidadePessoa/`, habilidadePessoa, {
                  headers: headerParams_,
                })
                .then(async (resp) => {
                  Toast.showSuccess("Adicionado!");
                })
                .catch((err) => {
                  Toast.show("Erro ao adicionar habilidade");
                });
              break;
            case "1":
              api
                .put(
                  `/habilidadepessoa/${
                    habilidadePessoa.idHabilidade
                  }/${idUsuario}`,
                  habilidadePessoa.rateStar,
                  {
                    headers: headerParams_,
                  }
                )
                .then(async (resp) => {
                  Toast.showSuccess("Alterado!");
                })
                .catch((err) => {
                  Toast.show("Erro ao alterar habilidade");
                });
              break;
            default:
              break;
          }
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
          marginBottom: "10%",
          borderRadius: 10,
        }}
      >
        {selectedIndex === 0 && (
          <>
            <Text>Idioma</Text>
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedIdioma(value);
              }}
              value={selectedIdioma}
              placeholder={{ label: "Selecione um idioma", value: null }}
              items={idiomas}
            />
            <Text>Proficiência</Text>
            <RNPickerSelect
              onValueChange={(value) => {
                setSelectedProficiencia(value);
              }}
              value={selectedProficiencia}
              placeholder={{
                label: "Selecione seu nível de proficiência",
                value: null,
              }}
              items={idiomasProficiencia}
            />
            <Button
              disabled={!selectedIdioma || !selectedProficiencia ? true : false}
              title="&nbsp;&nbsp;ADICIONAR"
              icon={<Icon name="md-add" color="#ffffff" size={28} />}
              containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
              buttonStyle={{
                borderRadius: 5,
                width: "100%",
              }}
              onPress={() => {
                console.log({
                  idPessoa: idUsuario,
                  idIdioma: selectedIdioma,
                  idProficiencia: selectedProficiencia,
                });
                try {
                  api
                    .post(
                      `/pessoaidioma`,
                      {
                        idPessoa: idUsuario,
                        idIdioma: selectedIdioma,
                        idProficiencia: selectedProficiencia,
                      },
                      {
                        headers: headerParams_,
                      }
                    )
                    .then(async (resp) => {
                      Toast.showSuccess("Adicionado com sucesso");
                      api
                        .get(`/pessoaidioma/${idUsuario}`, {
                          headers: headerParams_,
                        })
                        .then(async (resp) => {
                          setCurriculo(resp.data);
                        })
                        .catch((err) => {
                          console.log("Curriculo err:", err);
                        });
                    })
                    .catch((err) => {
                      Toast.show("Erro ao deletar idioma", {
                        mask: true,
                        maskStyle: {
                          backgroundColor: "#FF0000",
                          opacity: 0.6,
                        },
                      });
                    });
                } catch (error) {}
                setSelectedIdioma(""), setSelectedProficiencia("");
              }}
            />
            <SafeAreaView style={{ height: "50%" }}>
              <FlatList
                scrollsToTop={true}
                keyExtractor={keyExtractor}
                data={curriculo}
                renderItem={renderItem}
              />
            </SafeAreaView>
          </>
        )}
        {selectedIndex === 1 && (
          <>
            <ScrollView scrollEnabled={true} style={{ height: "99%" }}>
              {habilidadesList.map((item, index) => {
                return (
                  <View key={index}>
                    <Text
                      key={item.habilidade}
                      style={{
                        marginBottom: "1%",
                        marginTop: "3%",
                        alignSelf: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {item.habilidade}
                    </Text>
                    <View
                      style={{
                        width: "50%",
                        marginBottom: "5%",
                        alignSelf: "center",
                      }}
                    >
                      <StarRating
                        key={item.id}
                        starSize={25}
                        disabled={false}
                        emptyStar={"ios-star-outline"}
                        animation={"jello"}
                        fullStar={"ios-star"}
                        halfStar={"ios-star-half"}
                        iconSet={"Ionicons"}
                        maxStars={5}
                        rating={item.rating}
                        selectedStar={(rating) => {
                          ratingCompleted(rating, index, item);
                        }}
                        fullStarColor={"#f2ac33"}
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </>
        )}
        {selectedIndex === 2 && (
          <>
            <Text>Quem sou eu</Text>

            <ScrollView scrollEnabled={true} style={{ height: "95%" }}>
              <Textarea
                containerStyle={{
                  backgroundColor: "#fafafa",
                  borderRadius: 10,
                }}
                onChangeText={(value) => {
                  setQuemSouEu({
                    descricao: value,
                    instagram: quemSouEu.instagram,
                    facebook: quemSouEu.facebook,
                    twitter: quemSouEu.twitter,
                    id: quemSouEu.id,
                  });
                }}
                defaultValue={quemSouEu.descricao}
                maxLength={800}
                placeholder={"Conte-nos um pouco sobre você!"}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
              <Input
                label={"Intagram"}
                placeholder="Instagram"
                leftIcon={{ type: "font-awesome", name: "instagram" }}
                leftIconContainerStyle={classes.inputIcon}
                value={quemSouEu ? quemSouEu.instagram : ""}
                onChangeText={(event) => {
                  setQuemSouEu({
                    descricao: quemSouEu.descricao,
                    instagram: event,
                    facebook: quemSouEu.facebook,
                    twitter: quemSouEu.twitter,
                    id: quemSouEu.id,
                  });
                }}
              />
              <Input
                label={"Facebook"}
                // editable={false}
                placeholder="Facebook"
                value={quemSouEu ? quemSouEu.facebook : ""}
                // keyboardAppearance={"dark"}
                leftIcon={{ type: "font-awesome", name: "facebook-square" }}
                leftIconContainerStyle={classes.inputIcon}
                onChangeText={(event) => {
                  setQuemSouEu({
                    descricao: quemSouEu.descricao,
                    instagram: quemSouEu.instagram,
                    facebook: event,
                    twitter: quemSouEu.twitter,
                    id: quemSouEu.id,
                  });
                }}
              />
              <Input
                label={"Twitter"}
                placeholder="Twitter"
                leftIcon={{ type: "font-awesome", name: "twitter-square" }}
                leftIconContainerStyle={classes.inputIcon}
                value={quemSouEu ? quemSouEu.twitter : ""}
                onChangeText={(event) => {
                  setQuemSouEu({
                    descricao: quemSouEu.descricao,
                    instagram: quemSouEu.instagram,
                    facebook: quemSouEu.facebook,
                    twitter: event,
                    id: quemSouEu.id,
                  });
                }}
              />
              <Button
                title="&nbsp;&nbsp;SALVAR"
                icon={<Icon name="md-create" color="#ffffff" size={28} />}
                containerStyle={{ marginTop: "10%", marginBottom: "10%" }}
                buttonStyle={{
                  borderRadius: 5,
                  width: "100%",
                }}
                onPress={() => {
                  switch (putOrPost) {
                    case "post":
                      api
                        .post(
                          "/curriculo",
                          {
                            idPessoa: idUsuario,
                            descricao: quemSouEu.descricao,
                            instagram: quemSouEu.instagram,
                            facebook: quemSouEu.facebook,
                            twitter: quemSouEu.twitter,
                          },
                          { headers: headerParams_ }
                        )
                        .then(async (resp) => {
                          Toast.showSuccess("Salvo com sucesso");
                        })
                        .catch((err) => {
                          Toast.show("Erro, não é possivel salvar");
                        });

                      break;
                    case "put":
                      api
                        .put(
                          `/curriculo/${quemSouEu.id}`,
                          {
                            idPessoa: idUsuario,
                            descricao: quemSouEu.descricao,
                            instagram: quemSouEu.instagram,
                            facebook: quemSouEu.facebook,
                            twitter: quemSouEu.twitter,
                          },
                          { headers: headerParams_ }
                        )
                        .then(async (resp) => {
                          Toast.showSuccess("Salvo com sucesso");
                        })
                        .catch((err) => {
                          Toast.show("Erro, não é possivel salvar");
                        });
                      break;

                    default:
                      break;
                  }
                }}
              />
            </ScrollView>
          </>
        )}
      </Card>
    </View>
  );
}
