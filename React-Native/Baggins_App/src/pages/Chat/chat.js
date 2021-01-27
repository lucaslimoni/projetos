import React, { useState, useEffect } from "react";

import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import reactotron from "reactotron-react-native";
import { AppString } from "../Login/Const";
import { ListItem } from "react-native-elements";
import api from "../../services/api";
import Spinner from "react-native-loading-spinner-overlay";
import firebase from "firebase";
import "firebase/firestore";
import config from "../../firebase-config";
import { ScrollView } from "react-native-gesture-handler";
const STORAGE_KEY_TOKEN = "@token";
const console = reactotron;
export default function chat({ navigation }) {
  const navigationOptions = {
    title: "Chat",
  };
  const [finalList, setFinalList] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listChat, setListchat] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [idAnfitriao, setIdAnfitriao] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  async function getListUser() {
    await firebase
      .firestore()
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        const tempList = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // reactotron.log(doc.id, " => ", doc.data());
          tempList.push(doc.data());
        });
        // reactotron.log(tempList);
        setListUser(tempList);
      });
  }
  function checkLogin() {
    if (!AsyncStorage.getItem(AppString.ID)) {
      reactotron.log("usuário nao existe");
    } else {
      getListUser();
    }
  }
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      // console.log("firebase apps already running...");
    }
  }, [navigation]);

  useEffect(() => {
    setSpinner(true);
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };
        api
          .get(`/getuserschat/${json.pessoa.id}`, {
            headers: headerParams,
          })
          .then(async (resp) => {
            setListchat(resp.data);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        api
          .get(`/gethostschat/${json.pessoa.id}`, {
            headers: headerParams,
          })
          .then(async (resp) => {
            reactotron.log(resp);
            setHosts(resp.data);
          })
          .catch((err) => {
            reactotron.log("Err: ", err);
          });
        api
          .get(`/pessoa/${json.pessoa.id}`, { headers: headerParams })
          .then(async (resp) => {
            if (resp.data !== "") {
              setIdAnfitriao(resp.data.anfitriao);
            }
          })
          .catch((err) => {});
      }
    });
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.getItem(AppString.ID).then((response) => {
        setId(response);
      });
      AsyncStorage.getItem(AppString.NICKNAME).then((response) => {});
      AsyncStorage.getItem(AppString.PHOTO_URL).then((response) => {});
    } catch (error) {
      reactotron.log(error);
    }
    checkLogin();
  }, []);

  useEffect(() => {
    list();
  }, [idAnfitriao, listUser, listChat]);

  function list() {
    let temp = [];
    if (idAnfitriao === 1) {
      listChat.forEach((candidato) => {
        listUser.forEach((item, index) => {
          if (candidato.email === item.email) {
            reactotron.log(item);
            if (item.id !== id) {
              temp.push(item);
            }
          }
        });
      });
    } else {
      hosts &&
        hosts.forEach((anfitriao) => {
          listUser.forEach((item, index) => {
            if (anfitriao.email === item.email) {
              if (item.id !== id) {
                temp.push(item);
              }
            }
          });
        });
    }
    console.log(temp.length);
    setFinalList(temp);
    setTimeout(() => {
      setSpinner(false);
    }, 2200);
  }

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={"Carregando..."}
        textStyle={{ color: "#CCC" }}
      />
      <ScrollView>
        {finalList.length > 0 ? (
          finalList.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.photoUrl } }}
              title={l.nickname}
              // subtitle={l.subtitle}
              // bottomDivider
              // chevron
              onPress={() => {
                navigation.navigate("ChatScreen", { user: { l } });
              }}
            />
          ))
        ) : (
          <View
            style={{
              // width: "80%",
              width: "100%",
              height: "100%",
              marginTop: "40%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/img/background/no_chat.png")}
              style={{
                width: 300,
                height: 300,
                marginBottom: 100,
                alignSelf: "center",
              }}
            />
            <View style={{ position: "absolute", marginTop: 350 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#f2ac33" }}
              >
                Oh no, você ainda não possui conversas!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}
