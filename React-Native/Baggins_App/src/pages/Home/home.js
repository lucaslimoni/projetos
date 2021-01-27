import React, {
  useState,
  useEffect,
  createRef,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import {
  Animated,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

import {
  ParallaxSwiper,
  ParallaxSwiperPage,
} from "react-native-parallax-swiper";

import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPeopleArrows,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";
import reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api, { apiRecSys } from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const STORAGE_KEY_TOKEN = "@token";
const console = reactotron;

// ,  {
//   id: 1,
//   title: "Anarquista Júnior",
//   uri: "https://goo.gl/wtHtxG",
//   descricao:
//     "Vaga para Anarquista Júnior em Brasília. Ira trabalhar em todas as manifestações contra o groverno brasileiro.",
// },
// {
//   id: 2,
//   title: "Designer Abstrato",
//   uri: "https://goo.gl/gt4rWa",
//   descricao:
//     "Vaga para Designer Abstrato em Curitiba. Ira trabalhar em todas as manifestações artisticas do hotel Baulhaus.",
// },
// {
//   id: 3,
//   title: "Messias",
//   uri: "https://goo.gl/KAaVXt",
//   descricao:
//     "Vaga para Messias em São Paulo. Ira trabalhar em todas as manifestações como o novo messias, espalhando a palavra de Sharabadaias.",
// },
// {
//   id: 4,
//   title: "Desenvolvedor",
//   uri: "http://getwallpapers.com/wallpaper/full/b/f/9/489755.jpg",
//   src: "../../assets/img/developerImage.jpeg",
//   descricao:
//     "Vaga para Desenvolvedor React em Portugal. Ira trabalhar em todas as frentes de desenvolvimento da linguagem React.",
// },

export default function Home({ navigation }) {
  console.log("HomeNavigation: ", navigation);
  const myCustomAnimatedValue = new Animated.Value(0);
  const dados = [
    {
      id: 1,
      titulo: "Sem recomendações",
      uri: "https://images.unsplash.com/photo-1534540378968-85a7b8fde19f",
      descricao:
        "Ainda não há vagas recomendadas para você, busque a sua primeira vaga e veja a mágica acontecer.",
      type: "100Vagas",
      score: false,
    },
  ];
  const [lista, setLista] = useState(
    navigation.state.params.homeProps[0]
      ? navigation.state.params.homeProps[0]
      : dados
  );
  const [paralaxIndex] = useState(0);
  function getApi() {
    AsyncStorage.getItem(STORAGE_KEY_TOKEN).then(async (response) => {
      if (response) {
        const json = JSON.parse(response);
        const headerParams = {
          Authorization: `Bearer ${json.token.token}`,
        };
        apiRecSys.get(`/recommender/${json.pessoa.id}`).then(async (resp) => {
          console.log("RecommenderLength: ", resp.data.length);
          console.log("RecommenderData: ", resp.data);
          if (resp.data.length === 0) {
            setLista(dados);
          } else {
            await setLista(resp.data);
          }
        });
      }
    });
  }

  useEffect(() => {
    getApi();
  }, [navigation]);

  console.log("ListaRecsys: ", lista);

  const parallax = () => {
    return (
      <ParallaxSwiper
        speed={0.5}
        dividerWidth={8}
        dividerColor="black"
        backgroundColor="black"
        scrollToIndex={paralaxIndex}
        onMomentumScrollEnd={(activePageIndex) => {
          console.log(activePageIndex);
        }}
        showProgressBar={true}
        showsHorizontalScrollIndicator={true}
        progressBarBackgroundColor="rgba(255,255,255,0.25)"
        progressBarValueBackgroundColor="white"
        vertical={true}
      >
        {lista.map((item, index) => {
          let score = item.score * 100;
          return (
            <ParallaxSwiperPage
              key={item.id}
              BackgroundComponent={<Image style={styles.backgroundImage} />}
              ForegroundComponent={
                <View
                  style={
                    (styles.foregroundTextContainer,
                    { height: "85%", marginBottom: "50%" })
                  }
                >
                  <Card
                    title={
                      item.score === false ? (
                        item.titulo
                      ) : (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "stretch",
                            // flexWrap: "wrap",
                            // width: "100%",
                          }}
                        >
                          {item.score && (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 5,
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faPeopleArrows}
                                color="#f2ac33"
                                size={20}
                                style={{
                                  // marginLeft: 20,
                                  marginBottom: 2,
                                  marginTop: 10,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 8,
                                  fontWeight: "bold",
                                  color: "#f2ac33",
                                  paddingBottom: 5,
                                }}
                              >
                                {score.toFixed()}% compativel
                              </Text>
                            </View>
                          )}
                          <Text
                            style={{
                              // fontSize: 20,
                              fontWeight: "bold",
                              marginTop: 10,
                              textAlign: "center",
                            }}
                          >
                            {item.titulo.length > 30
                              ? item.titulo.substr(0, 30) + "..."
                              : item.titulo}
                          </Text>

                          {item.score && (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 5,
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faHandsHelping}
                                color="#f2ac33"
                                size={20}
                                style={{
                                  marginBottom: 2,
                                  marginTop: 10,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 8,
                                  fontWeight: "bold",
                                  color: "#f2ac33",
                                  width: 70,
                                  paddingBottom: 5,
                                }}
                              >
                                {item.userSkills} de {item.optSkills}{" "}
                                habilidades.
                              </Text>
                            </View>
                          )}
                        </View>
                      )
                    }
                    image={{
                      uri:
                        item.type === "100Vagas"
                          ? item.uri
                          : "https://images.unsplash.com/photo-1519315868-60d544c31ece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
                    }}
                    imageStyle={{
                      height: height * 0.6,
                    }}
                    containerStyle={{
                      borderRadius: 10,
                    }}
                  >
                    <View>
                      <Text
                        numberOfLines={2}
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        {item.descricao}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        position: "relative",
                        marginTop: "3%",
                      }}
                    >
                      {item.type !== "100Vagas" && (
                        <Button
                          title="&nbsp;&nbsp;SABER MAIS"
                          icon={
                            <Icon name="md-reorder" color="#ffffff" size={28} />
                          }
                          containerStyle={{ bottom: 0 }}
                          // iconRight={true}
                          buttonStyle={{
                            borderRadius: 5,
                            width: "100%",
                          }}
                          onPress={() => {
                            navigation.navigate("Oportunidade", {
                              oportunidade: {
                                id: item.id,
                              },
                            });
                          }}
                        />
                      )}
                    </View>
                  </Card>
                </View>
              }
            />
          );
        })}
      </ParallaxSwiper>
    );
  };
  return <FlatList scrollEnabled={false} ListHeaderComponent={parallax} />;
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height,
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white",
  },
});
