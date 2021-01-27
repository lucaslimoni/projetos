import React from "react";
import reactotron from "reactotron-react-native";
import { View, Text } from "react-native";

export default async function BackgroudDadosPessoais(props) {
  reactotron.log("props: ", props);

  //   const { uri } = props;

  return (
    <View>
      {/* <ImageBackground
        source={{
          uri: uri,
        }}
        style={{ width: "100%", height: "100%" }}
      > */}
      <View>
        <Text>Dados Pessoais</Text>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}
