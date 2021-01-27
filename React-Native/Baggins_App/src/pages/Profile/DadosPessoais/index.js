import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, NativeModules } from "react-native";
import { Card, Button, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";
import FileViewer from "react-native-file-viewer";
import DocumentPicker from "react-native-document-picker";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../../services/api";
import reactotron from "reactotron-react-native";
import Toast from "react-native-tiny-toast";

const STORAGE_KEY_TOKEN = "@token";
const imagem = [
  require("../../../assets/img/background/travel/0.jpg"),
  require("../../../assets/img/background/travel/1.jpg"),
  require("../../../assets/img/background/travel/2.jpg"),
  require("../../../assets/img/background/travel/3.jpg"),
  require("../../../assets/img/background/travel/4.jpg"),
  require("../../../assets/img/background/travel/5.jpg"),
  require("../../../assets/img/background/travel/6.jpg"),
  require("../../../assets/img/background/travel/7.jpg"),
  require("../../../assets/img/background/travel/8.jpg"),
  require("../../../assets/img/background/travel/9.jpg"),
  require("../../../assets/img/background/travel/10.jpg"),
  require("../../../assets/img/background/travel/11.jpg"),
  require("../../../assets/img/background/travel/12.jpg"),
  require("../../../assets/img/background/travel/13.jpg"),
  require("../../../assets/img/background/travel/14.jpg"),
  require("../../../assets/img/background/travel/15.jpg"),
  require("../../../assets/img/background/travel/16.jpg"),
  require("../../../assets/img/background/travel/17.jpg"),
  require("../../../assets/img/background/travel/18.jpg"),
  require("../../../assets/img/background/travel/19.jpg"),
  require("../../../assets/img/background/travel/20.jpg"),
];

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export default function dadosPessoais({ navigation }) {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [nome, setNome] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState(null);
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [idAnfitriao, setIdAnfitriao] = useState();
  const [idPessoa, setIdPessoa] = useState("");
  const [image, setImage] = useState("__");
  const [headerParams_, setHeaderParams_] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setIdPessoa(json.pessoa.id);
        setImage(`http://api.baggins.ml/avatar/${json.pessoa.id}`);
        // setTimeout(() => {
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };

        setHeaderParams_(headerParams);
        api
          .get(`/contato/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            setTelefone(resp.data.numero);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        api
          .get(`/enderecopessoa/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            setCidade(resp.data.cidade);
            setEstado(resp.data.estado);
            setPais(resp.data.pais);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        api
          .get(`/pessoa/${json.pessoa.id}`, json.token.token)
          .then(async (resp) => {
            setNome(resp.data.nome);
            setEmail(resp.data.email);
            setDataNasc(resp.data.datanasc);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        api
          .get(`/tipoempresa/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            if (resp.data !== "") {
              setIdAnfitriao(resp.data.id);
            }
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        // }, 500);
      }
    });
  }, []);

  useEffect(() => {
    reactotron.log(idAnfitriao);
  }, [idAnfitriao]);
  const userData = {
    nome: nome,
    dataNasc: dataNasc,
    email: email,
    telefone: telefone,
    pais: pais,
    estado: estado,
    cidade: cidade,
  };

  async function getImage() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      // const data = new FormData();
      // data.append("file", { size: res.size, name: res.name, type: res.type });
      // reactotron.log(data._parts[0]);
      // res.name = `photoUser-${idPessoa}.png`;

      // const headerParams = {
      //   Authorization: headerParams_.Authorization,
      //   Accept: "multipart/form-data",
      // };
      // api
      //   .post("/files", data._parts[0], {
      //     headers: headerParams,
      //   })
      //   .then(async (resp) => {
      //     api
      //       .put(
      //         `/pessoa/${idPessoa}`,
      //         { idFile: resp.data.id },
      //         {
      //           headers: headerParams,
      //         }
      //       )
      //       .then(async (resp) => {
      //         reactotron.log("PostImage: ", resp);
      //         Toast.showSuccess("Sucesso");
      //       })
      //       .catch(async (err) => {
      //         Toast.show("Erro ao salvar");
      //       });
      //   })
      //   .catch(async (err) => {
      //     Toast.show("Erro ao salvar");
      //   });

      setImage(res.uri);
      // return res.uri;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  return (
    <View>
      <ImageBackground
        source={imagem[getRandom(21)]}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
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
              textContent={"Carregando..."}
              textStyle={{ color: "#CCC" }}
            />
          </View>
          <Card
            containerStyle={{
              marginBottom: "50%",
              marginTop: "50%",
              borderRadius: 10,
              padding: "10%",
              opacity: 0.8,
              // backgroundColor: "transparent",
            }}
          >
            <View
              style={{
                // flex: 1,
                alignItems: "center",
                justifyContent: "center",
                opacity: 1,
                // backgroundColor: "transparent",
              }}
            >
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri: image,
                }}
                // showEditButton
                imageProps={{ resizeMode: "cover" }}
                editButton={{ style: { backgroundColor: "#4487D6" } }}
                onEditPress={() => {
                  getImage();
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  marginBottom: "1%",
                  alignSelf: "center",
                }}
              >
                {nome}
              </Text>
              <Text
                style={{
                  marginBottom: "1%",
                  alignSelf: "center",
                }}
              >
                {dataNasc}
              </Text>
              <Text
                style={{
                  marginBottom: "1%",
                  alignSelf: "center",
                }}
              >
                {email}
              </Text>
              <Text
                style={{
                  marginBottom: "1%",
                  alignSelf: "center",
                }}
              >
                {telefone}
              </Text>
              <Text
                style={{
                  marginBottom: "1%",
                  alignSelf: "center",
                }}
              >
                {pais + " - " + estado + " - " + cidade}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                position: "relative",
                bottom: 0,
              }}
            >
              <Button
                title="&nbsp;&nbsp;ALTERAR"
                icon={<Icon name="md-create" color="#ffffff" size={28} />}
                containerStyle={{ marginTop: "2%" }}
                // iconRight={true}
                buttonStyle={{
                  borderRadius: 5,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("AlterarDadosPessoais", {
                    dados: userData,
                  });
                }}
              />
              <Button
                title="&nbsp;&nbsp;TORNAR-SE ANFITRIÃO"
                // icon={<Icon name="md-create" color="#ffffff" size={28} />}
                containerStyle={{ marginTop: "2%" }}
                // iconRight={true}
                disabled={idAnfitriao !== undefined}
                buttonStyle={{
                  borderRadius: 5,
                  width: "100%",
                  backgroundColor: "#ff0000",
                }}
                onPress={() => {
                  navigation.navigate("TornarAnfitriao", {
                    dados: userData,
                  });
                }}
              />
              <Button
                title="&nbsp;&nbsp;SAIR"
                icon={<Icon name="md-exit" color="#ffffff" size={28} />}
                containerStyle={{ marginTop: "2%" }}
                // iconRight={true}
                buttonStyle={{
                  borderRadius: 5,
                  width: "100%",
                  backgroundColor: "#ff0000",
                }}
                onPress={async () => {
                  // await AsyncStorage.removeItem(STORAGE_KEY_TOKEN).then(
                  //   (resp) => {
                  AsyncStorage.clear();
                  // }
                  // );
                  navigation.navigate("Logout");
                }}
              />
            </View>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
}
