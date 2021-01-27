import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableHighlight, Text } from "react-native";
import reactotrom from "reactotron-react-native";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import reactotron from "reactotron-react-native";
import Swipeout from "react-native-swipeout";
import Toast from "react-native-tiny-toast";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../../services/api";
import { Button, ListItem } from "react-native-elements";
const STORAGE_KEY_TOKEN = "@token";
const console = reactotron;
export default function Aprovar({ navigation }) {
  const [lista, setLista] = useState(navigation.state.params.candidatura.list);

  const [idPessoa, setSelectedCandidato] = useState("");
  const [idOportunidade, setIdOportunidade] = useState("");
  const [headerParams_, setHeaderParams_] = useState("");
  const [isAprovado, setIsAprovado] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        setTimeout(() => {
          const headerParams = {
            Authorization: `Bearer ${json.token.token}`,
          };

          setHeaderParams_(headerParams);
        }, 500);
      }
    });
  }, []);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <Swipeout
      right={swipeBtns(item)}
      autoClose={true}
      // close={item.pivot.aprovado === 1}
      backgroundColor="transparent"
      style={{ borderRadius: 10, disabled: { color: "#ffff" } }}
      onOpen={() => {
        console.log("Abriu");
        setSelectedCandidato(item.pivot.idPessoa);
        reactotron.log(item);
        setIdOportunidade(item.pivot.idOportunidade);
        if (item.pivot.aprovado === 1) {
          Toast.showSuccess("Esse candidato já está aprovado", {
            mask: true,
            maskStyle: {
              backgroundColor: "#FF0000",
              opacity: 0.6,
            },
          });
        }
      }}
      onClose={() => {
        console.log("Fechou");
        setSelectedCandidato("");
        setIdOportunidade("");
      }}
    >
      <TouchableHighlight>
        <ListItem
          // containerStyle={{ backgroundColor: "transparent" }}
          key={keyExtractor}
          title={item.nome}
          // subtitle={isAprovado === true ? "(Aprovado)" : ""}
          rightIcon={
            <FontAwesomeIcon
              icon={faCheck}
              color={item.pivot.aprovado === 1 ? "#7FFF00" : "#C2C2C2"}
              size={20}
            />
          }
          bottomDivider
          chevron
          onPress={() => {
            navigation.navigate("CurriculoDetail", {
              pessoa: { id: item.pivot.idPessoa },
            });
          }}
        />
      </TouchableHighlight>
    </Swipeout>
  );

  const swipeBtns = (item) => [
    {
      component: (
        <>
          <Button
            icon={<FontAwesomeIcon icon={faCheck} color="#fff" size={20} />}
            disabled={item.pivot.aprovado === 1}
            containerStyle={{
              backgroundColor: "#7FFF00",
              borderRadius: 10,
              marginTop: 10,
              marginRight: 10,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
            }}
            onPress={() => {
              console.log(idPessoa, idOportunidade);
              try {
                api
                  .put(
                    `/candidatura/${item.pivot.idPessoa}/${
                      item.pivot.idOportunidade
                    }`,
                    { aprovado: 1 },
                    {
                      headers: headerParams_,
                    }
                  )
                  .then(async (resp) => {
                    Toast.showSuccess("Candidatura aprovada!");
                    if (resp.data !== "") {
                      setIsAprovado(true);
                    }
                  })
                  .catch((err) => {
                    Toast.show("Não foi possível aprovar ", {
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
    {
      component: (
        <>
          <Button
            icon={<FontAwesomeIcon icon={faTimes} color="#fff" size={20} />}
            disabled={item.pivot.aprovado === 1}
            containerStyle={{
              backgroundColor: "#FF0000",
              borderRadius: 10,
              marginTop: 10,
              marginRight: 10,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
            }}
            onPress={() => {
              try {
                api
                  .delete(
                    `candidatura/${item.pivot.idPessoa}/${
                      item.pivot.idOportunidade
                    }`,
                    {
                      headers: headerParams_,
                    }
                  )
                  .then(async (resp) => {
                    Toast.showSuccess("Candidatura Cancelada!");
                    let newList = [];
                    lista.forEach((element) => {
                      if (element.pivot.idPessoa !== idPessoa) {
                        newList.push(element);
                      }
                    });
                    setLista(newList);
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
  return (
    <View>
      {lista.length === 0 ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Esta vaga não possui candidatos ainda.
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            scrollsToTop={true}
            keyExtractor={keyExtractor}
            data={lista}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}
