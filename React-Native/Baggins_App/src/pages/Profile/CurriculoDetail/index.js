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
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  Card,
  Button,
  Input,
  ButtonGroup,
  ListItem,
  Avatar,
} from "react-native-elements";
import reactotron from "reactotron-react-native";

const STORAGE_KEY_TOKEN = "@token";
const console = Reactotron;

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
  faSun,
} from "@fortawesome/free-solid-svg-icons";
export default function Tab3({ navigation }) {
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
  const [lista, setLista] = useState([]);
  const [curriculo, setCurriculo] = useState([]);
  const [listaIdiomas, setListaIdiomas] = useState([]);
  const [habilidades, setHabilidade] = useState([]);
  const [idPessoa, setId] = useState(navigation.state.params.pessoa.id);

  const list = [
    {
      title: "Appointments",
      icon: "av-timer",
    },
    {
      title: "Trips",
      icon: "flight-takeoff",
    },
  ];
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };

        api
          .get(`/curriculo/${idPessoa}`, { headers: headerParams })
          .then(async (resp) => {
            reactotron.log(resp);
            setCurriculo(resp.data);
            api
              .get(`/pessoaidioma/${idPessoa}`, { headers: headerParams })
              .then(async (resp) => {
                reactotron.log(resp);
                setListaIdiomas(resp.data);
              })
              .catch((err) => {
                reactotron.log("Err: ", err);
              });
            api
              .get(`/habilidadepessoa/${idPessoa}`, { headers: headerParams })
              .then(async (resp) => {
                reactotron.log(resp);
                setHabilidade(resp.data);
              })
              .catch((err) => {
                reactotron.log("Err: ", err);
              });
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
      }
    });
  }, []);

  useEffect(() => {
    reactotron.log(listaIdiomas);
  }, [listaIdiomas]);
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
            height: "100%",
            alignItems: "center",
          }}
        >
          <Card
            containerStyle={{
              minWidth: "95%",
              marginTop: "5%",
              marginBottom: 10,
              borderRadius: 10,
              // backgroundColor: "transparent",
            }}
          >
            <Avatar
              size="xlarge"
              containerStyle={{ alignSelf: "center" }}
              rounded
              source={{
                uri: `http://api.baggins.ml/avatar/${idPessoa}`,
              }}
            />
            <Text
              style={{
                marginTop: "5%",
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              {curriculo.nome}
            </Text>
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              <Icon name="map-marker" color="#f2ac33" size={20} />{" "}
              {curriculo.pais}, {curriculo.estado} - {curriculo.cidade}
            </Text>
            {curriculo.facebook !== null && (
              <Text
                style={{
                  color: "#3a397b",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: "5%",
                }}
              >
                <Icon name="instagram" color="#f2ac33" size={20} />{" "}
                {curriculo.instagram}
              </Text>
            )}

            {curriculo.facebook !== null && (
              <Text
                style={{
                  color: "#3a397b",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: "5%",
                }}
              >
                <Icon name="facebook" color="#f2ac33" size={20} />{" "}
                {curriculo.facebook}
              </Text>
            )}

            {curriculo.twitter !== null && (
              <Text
                style={{
                  color: "#3a397b",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: "5%",
                }}
              >
                <Icon name="twitter" color="#f2ac33" size={20} />

                {curriculo.twitter}
              </Text>
            )}
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              <Icon name="clipboard" color="#f2ac33" size={20} /> Quem sou eu
            </Text>
            <Text>{curriculo.descricao}</Text>
            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              Idiomas:
            </Text>
            {listaIdiomas.map((l, i) => (
              <Text
                style={{
                  marginTop: "1%",
                }}
              >
                {l.idioma} - {l.proficiencia}
              </Text>
            ))}

            <Text
              style={{
                color: "#3a397b",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              Habilidades:
            </Text>

            {habilidades &&
              habilidades.map((m, i) => (
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
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
