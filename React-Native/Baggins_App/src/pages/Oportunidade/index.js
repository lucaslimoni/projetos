import Reactotron from "reactotron-react-native";
import React, { useState, useEffect } from "react";
import { Text, Card, Button } from "react-native-elements";
import { View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import SwiperFlatList from "react-native-swiper-flatlist";
import Icon from "react-native-vector-icons/FontAwesome";
import reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Toast from "react-native-tiny-toast";
import {
  faBroom,
  faBed,
  faMoon,
  faConciergeBell,
  faHandsHelping,
  faLanguage,
  faRunning,
  faLaptopCode,
  faUsersCog,
  faPaw,
  faBaby,
  faCocktail,
  faUtensils,
  faSeedling,
  faTractor,
  faTools,
  faMusic,
  faPaintRoller,
  faCalendar,
  faCameraRetro,
  faAd,
  faMap,
  faVideo,
  faHamburger,
  faUsers,
  faLock,
  faCampground,
  faCoffee,
  faBicycle,
  faPercent,
  faCertificate,
  faCar,
  faDrumstickBite,
  faGlassCheers,
  faMapMarked,
  faHotdog,
  faUmbrellaBeach,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;
const { width, height } = Dimensions.get("window");

export default function Oportunidade({ navigation }) {
  function switchIcon(icon) {
    switch (icon) {
      case "Dormitório Privado":
        return faLock;
      case "Quarto Compartilhado":
        return faUsers;
      case "Camping":
        return faCampground;
      case "Café da manhã":
        return faCoffee;
      case "Cozinha equipada":
        return faUtensils;
      case "Descontos em tours/hospedagem":
        return faPercent;
      case "Desconto com restaurantes":
        return faPercent;
      case "Passeios de graça":
        return faMapMarked;
      case "Carona na chegada":
        return faCar;
      case "Bicicletas a vontade":
        return faBicycle;
      case "Desconto em pubs e/ou festas":
        return faGlassCheers;
      case "Certificado":
        return faCertificate;
      case "Almoço":
        return faDrumstickBite;
      case "Jantar":
        return faHotdog;
      case "Aulas de Idiomas":
        return faLanguage;
      case "Jardinagem":
        return faSeedling;
      case "Ajuda em Cultivos e Colheitas":
        return faTractor;
      case "Bartender":
        return faCocktail;
      case "Consertos Gerais":
        return faTools;
      case "Recepção":
        return faConciergeBell;
      case "Administração":
        return faUsersCog;
      case "Desenvolvimento Web":
        return faLaptopCode;
      case "Mídias Sociais":
        return faAd;
      case "Ensinar Idiomas":
        return faLanguage;
      case "Pintura e Decoração":
        return faPaintRoller;
      case "Tarefas Domésticas":
        return faBed;
      case "Ajuda na Limpeza":
        return faBroom;
      case "Organizar eventos e festas":
        return faCalendar;
      case "Guia Local":
        return faMap;
      case "Trabalho Social":
        return faHandsHelping;
      case "Fotografia":
        return faCameraRetro;
      case "Música":
        return faMusic;
      case "Preparar Refeições":
        return faUtensils;
      case "Ajudante de Cozinha":
        return faHamburger;
      case "Produção de vídeo":
        return faVideo;
      case "Ensinar Esportes":
        return faRunning;
      case "Turno da Noite":
        return faMoon;
      case "Cuidado de Crianças":
        return faBaby;
      case "Cuidado de Animais":
        return faPaw;
      case "1 dia livre por semana":
        return faUmbrellaBeach;
      case "2 dias livres por semana":
        return faUmbrellaBeach;
      case "3 dias livres por semana":
        return faUmbrellaBeach;

      default:
        return null;
    }
  }

  reactotron.log(navigation);
  // const [index] = useState(navigation.state.params.oportunidade.index);
  const [visible, setVisible] = useState(true);
  const [id] = useState(navigation.state.params.oportunidade.id);
  // const [uri] = useState(navigation.state.params.oportunidade.uri);
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [idPessoa, setIdPessoa] = useState("");
  const [label, setLabel] = useState("Candidatar-se");

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setIdPessoa(json.pessoa.id);
        // setTimeout(() => {
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };
        api
          .get(`/oroportunidade/${id}`, { headers: headerParams })
          .then(async (resp) => {
            reactotron.log("vaga", resp.data[0]);
            setData(resp.data[0]);
            api
              .get(`/usercandidature/${json.pessoa.id}/${resp.data[0].id}`, {
                headers: headerParams,
              })
              .then(async (resp) => {
                if (resp.data !== "") {
                  setLabel("Candidatado");
                } else {
                  setLabel("Candidatar-se");
                }
              })
              .catch((err) => {
                reactotron.log("Err: ", err);
              });
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        // }, 500);
      }
    });
  }, []);
  function Candidature() {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };
          api
            .post(
              `/candidatura`,
              { idPessoa: json.pessoa.id, idOportunidade: data.id },
              { headers: headerParams }
            )
            .then(async (resp) => {
              reactotron.log(resp);
              Toast.showSuccess("Candidatura realizada!");
              if (resp.data.id !== null) {
                setLabel("Candidatado");
              }
            })
            .catch((err) => {
              reactotron.log("Err: ", err);
            });
        }, 500);
      }
    });
  }
  // useEffect(() => {
  //   reactotron.log("id", idPessoa);
  // }, [data]);
  return (
    <ScrollView>
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
            backgroundColor: "transparent",
          }}
        >
          {/* <Spinner
          visible={spinner}
          textContent={"Salvando..."}
          textStyle={{ color: "#CCC" }}
        /> */}
        </View>
        <Card
          // title={title}
          containerStyle={{
            height: "100%",
            width: "100%",
            // marginTop: "50%",
            marginBottom: 15,
            // borderRadius: 10,
            // opacity: 0.7,
            // backgroundColor: "transparent",
          }}
        >
          <Text
            h3
            style={{
              color: "#3a397b",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: "5%",
              textAlign: "center",
            }}
          >
            {data.titulo}
          </Text>

          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
            // showPagination
            paginationDefaultColor={"#f2ac33"}
            paginationActiveColor={"#3a397b"}
            // paginationStyle={{ top: "27%" }}
          >
            <View style={[styles.child]}>
              <Image
                style={{ height: height * 0.2, width }}
                source={require("../../assets/img/background/travel/17.jpg")}
              />
            </View>
            <View style={[styles.child]}>
              <Image
                style={{ height: height * 0.2, width }}
                source={require("../../assets/img/background/travel/12.jpg")}
              />
            </View>
            <View style={[styles.child]}>
              <Image
                style={{ height: height * 0.2, width }}
                source={require("../../assets/img/background/travel/5.jpg")}
              />
            </View>
            <View style={[styles.child]}>
              <Image
                style={{ height: height * 0.2, width }}
                source={require("../../assets/img/background/travel/20.jpg")}
              />
            </View>
          </SwiperFlatList>
          <View style={{ marginTop: "10%" }}>
            <Button
              title={label}
              disabled={
                label === "Candidatado" ||
                data.ativa === 0 ||
                data.idPessoa === idPessoa
              }
              // icon={<Icon name="delete" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 5,
                width: "100%",
                backgroundColor: "#3a397b",
              }}
              containerStyle={{
                marginTop: "1%",
                marginBottom: "1%",
              }}
              onPress={() => Candidature()}
            />
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              <Icon name="map-marker" color="#f2ac33" size={20} />{" "}
              {data && data.cidade}
            </Text>
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              <Icon name="briefcase" color="#f2ac33" size={20} />{" "}
              Disponibilidade
            </Text>
            <Text>De:{data && data.disponibilidadeInicio}</Text>
            <Text>Até:{data && data.disponibilidadeFinal}</Text>
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              <Icon name="clipboard" color="#f2ac33" size={20} /> Descrição
            </Text>
            <Text>{data && data.descricao}</Text>

            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              <Icon name="clipboard" color="#f2ac33" size={20} /> Salário
            </Text>
            <Text>{data && data.salario}</Text>

            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              O que você vai ganhar
            </Text>
            <View style={{ marginTop: "5%" }}>
              {data.ofertas &&
                data.ofertas.map((m, i) => (
                  <Text key={i} style={{ color: "#3a397b" }}>
                    <FontAwesomeIcon
                      icon={switchIcon(m.oferta)}
                      color="#f2ac33"
                      size={20}
                    />{" "}
                    {m.oferta}{" "}
                  </Text>
                ))}
            </View>
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              Como você irá ajudar
            </Text>
            <View
              style={{
                marginTop: "5%",
              }}
            >
              {data.habilidades &&
                data.habilidades.map((m, i) => (
                  <Text
                    key={i}
                    style={{
                      color: "#3a397b",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={switchIcon(m.habilidade)}
                      color="#f2ac33"
                      size={20}
                    />{" "}
                    {m.habilidade}{" "}
                  </Text>
                ))}
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  child: {
    height: height * 0.2,
    width: width,
    // justifyContent: "center",
  },
  text: {
    fontSize: width * 0.5,
    textAlign: "center",
  },
});
