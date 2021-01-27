import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import reactotron from "reactotron-react-native";
const console = reactotron;
export function BtnDeletar({ props }) {
  console.log("BtnDeletarProps: ", props);
  return (
    <View>
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
        // iconRight={true}
        buttonStyle={{
          backgroundColor: "transparent",
        }}
      />
    </View>
  );
}
