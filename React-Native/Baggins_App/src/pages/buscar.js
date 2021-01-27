import React, { useEffect, useState, useCallback } from "react";
import { SearchBar, Card, Button, Divider } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { List } from "react-native-paper";
import { View, Text, FlatList, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { set } from "react-native-reanimated";
import DatePicker from "react-native-date-ranges";
import AsyncStorage from "@react-native-community/async-storage";
import reactotron from "reactotron-react-native";
import api, { apiRecSys } from "../services/api";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment";

const STORAGE_KEY_TOKEN = "@token";
const console = reactotron;

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const tipoAnfitriaoList = [
  {
    label: "ONG",
    value: 2,
  },
  {
    label: "Empresa",
    value: 3,
  },
];

export default function search({ navigation }) {
  const [search, setSearch] = useState("");
  const [searchCidade, setSearchCidade] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [selectedTipoAnfitriao, setSelectedTipoAnfitriao] = useState("");
  const [headerParams_, setHeaderParams_] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [allOportunities, setAllOportunities] = useState([]);
  const [allOportunities_, setAllOportunities_] = useState([]);
  const [allOportunities_3, setAllOportunities_3] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function getApi() {
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
            .get("/alloportunidades")
            .then(async (resp) => {
              console.log("Oportunidades: ", resp);
              setAllOportunities(resp.data);
            })
            .catch(async (err) => {
              console.log("Err Oportunidades: ", err);
            });
          setSpinner(false);
        }, 500);
      }
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => {
      getApi();
      setExpanded(false);
      setRefreshing(false);
    });
  }, [refreshing]);

  useEffect(() => {
    getApi();
  }, []);

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

  const navigationOptions = {
    title: "Buscar",
  };
  async function updateSearch(e, key) {
    setSelectedTipoAnfitriao(e);
    if (allOportunities_3.length === 0) {
      setAllOportunities_3(allOportunities);
    }
    if (e === "" || e === 0) {
      return setAllOportunities(allOportunities_3);
    }
    setAllOportunities_(allOportunities_3);

    switch (key) {
      case "pc": {
        setSearch(e);
        // setAllOportunities_(allOportunities_3);
        let newList = allOportunities_.filter((item, index) => {
          return item.titulo.toLowerCase().includes(e.toLowerCase());
        });
        setAllOportunities(newList);

        break;
      }
      case "ta": {
        let newList = allOportunities_.filter((item) => {
          console.log("Item: ", item);
          return item.idTipoOportunidade === e;
        });
        setAllOportunities(newList);
        break;
      }
      case "di": {
        console.log(
          "disponibilidadeInicio: ",
          moment(e, "DD-MM-YYYY").format("DD-MM-YYYY")
        );

        let newList = allOportunities_.filter((item) => {
          return (
            item.disponibilidadeInicio ===
            moment(e, "DD-MM-YYYY").format("DD-MM-YYYY")
          );
        });
        console.log("disponibilidadeInicioList: ", newList);
        setAllOportunities(newList);
        break;
      }
      case "lo": {
        setSearchCidade(e);
        // setAllOportunities_(allOportunities_3);
        let newList = allOportunities_.filter((item, index) => {
          return item.cidade.toLowerCase().includes(e.toLowerCase());
        });
        setAllOportunities(newList);

        break;
      }

      default:
        break;
    }
  }

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item, index }) => (
    <List.Accordion
      title={item.titulo}
      id={index}
      theme={{
        colors: {
          primary: "#3a397b",
        },
      }}
      left={(props) => <List.Icon {...props} icon="briefcase-outline" />}
    >
      <Text style={{ maxWidth: "90%", textAlign: "justify" }}>
        {item.descricao}
      </Text>
      <Button
        title="&nbsp;&nbsp;SABER MAIS"
        icon={<Icon name="md-reorder" color="#ffffff" size={28} />}
        containerStyle={{ padding: 10 }}
        buttonStyle={{
          borderRadius: 5,
          width: "78%",
          alignSelf: "flex-end",
          marginRight: 30,
        }}
        onPress={() => {
          apiRecSys
            .get(`/generatehistoric/${item.id}/${idUsuario}`)
            .then(async (resp) => {
              console.log("generateHistoric: ", resp);
            });
          navigation.navigate("Oportunidade", {
            oportunidade: {
              id: item.id,
            },
          });
        }}
      />
    </List.Accordion>
  );

  function header() {
    return (
      <>
        <View
          style={{
            position: "absolute",
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
        <List.Accordion
          title="PESQUISAR"
          theme={{
            colors: {
              primary: "#3a397b",
            },
          }}
          left={(props) => (
            <List.Icon {...props} icon="folder-search-outline" />
          )}
          expanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <Card
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ alignSelf: "center", paddingBottom: 10 }}>
              Palavra Chave
            </Text>
            <SearchBar
              containerStyle={{
                // width: "100%",
                backgroundColor: "transparent",
                borderTopColor: "#fff",
                borderBottomColor: "#fff",
              }}
              inputContainerStyle={{ backgroundColor: "#f7f7f7" }}
              placeholder="PESQUISAR"
              onChangeText={(e) => updateSearch(e, "pc")}
              value={search}
              lightTheme
              showCancel={true}
            />
            {/* <Text style={{ alignSelf: "center", padding: 10 }}>Cidade</Text>
            <SearchBar
              containerStyle={{
                // width: "100%",
                backgroundColor: "transparent",
                borderTopColor: "#fff",
                borderBottomColor: "#fff",
              }}
              inputContainerStyle={{ backgroundColor: "#f7f7f7" }}
              placeholder="PESQUISAR"
              onChangeText={(e) => updateSearch(e, "lo")}
              value={searchCidade}
              lightTheme
              showCancel={true}
            /> */}
            <Text style={{ alignSelf: "center", padding: 10 }}>
              Tipo Anfitrião
            </Text>
            <RNPickerSelect
              onValueChange={(value) => {
                updateSearch(value, "ta");
              }}
              value={selectedTipoAnfitriao}
              placeholder={{ label: "Selecione o tipo anfitrião", value: 0 }}
              items={tipoAnfitriaoList}
            />
            {/* 
            <Text style={{ alignSelf: "center", padding: 10 }}>
              Data Inicial
            </Text>
            <DatePicker
              customStyles={{
                placeholderText: { fontSize: 20 }, // placeHolder style
                headerStyle: "Data Inicial", // title container style
                headerMarkTitle: { display: "none" }, // title mark style
                headerDateTitle: {}, // title Date style
                contentInput: {}, //content text container style
                contentText: {}, //after selected text Style
              }} // optional
              centerAlign // optional text will align center or not
              selectedBgColor="#3a397b"
              placeholder={"Data Inicial"}
              outFormat={"DD/MM/YYYY"}
              returnFormat={"DD-MM-YYYY"}
              customButton={customButton}
              onConfirm={(value) => {
                updateSearch(value.currentDate, "di");
              }}
            />
            <Text style={{ alignSelf: "center", padding: 10 }}>Data Final</Text>
            <DatePicker
              customStyles={{
                placeholderText: { fontSize: 20 }, // placeHolder style
                headerStyle: "Data Final", // title container style
                headerMarkTitle: { display: "none" }, // title mark style
                headerDateTitle: "algumacoisa", // title Date style
                contentInput: {}, //content text container style
                contentText: {}, //after selected text Style
              }} // optional
              centerAlign // optional text will align center or not
              selectedBgColor="#3a397b"
              placeholder={"Data Final"}
              outFormat={"DD/MM/YYYY"}
              returnFormat={"DD-MM-YYYY"}
              customButton={customButton}
              onConfirm={(value) => {
                console.log("value");
              }}
            />
            <Text style={{ alignSelf: "center", padding: 10 }}>Local</Text>
            <SearchBar
              containerStyle={{
                // width: "100%",
                backgroundColor: "transparent",
                borderTopColor: "#fff",
                borderBottomColor: "#fff",
              }}
              inputContainerStyle={{ backgroundColor: "#f7f7f7" }}
              placeholder="PESQUISAR"
              onChangeText={(e) => updateSearch(e, "lo")}
              value={search}
              lightTheme
              showCancel={true}
            /> */}
          </Card>
        </List.Accordion>
        {!expanded && <Divider />}
      </>
    );
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={header()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        scrollEnabled={true}
        scrollsToTop={true}
        keyExtractor={keyExtractor}
        data={allOportunities}
        renderItem={renderItem}
      />
    </View>
  );
}
