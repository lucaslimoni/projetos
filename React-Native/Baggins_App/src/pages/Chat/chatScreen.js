import React, { useState, useEffect } from "react";
import moment from "moment";

import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import reactotron from "reactotron-react-native";
import { AppString } from "../../pages/Login/Const";
import { IconButton } from "react-native-paper";

import { GiftedChat, Bubble, Send } from "react-native-gifted-chat"; // 0.3.0

import firebase from "firebase";
import "firebase/firestore";
import config from "../../firebase-config";

const STORAGE_KEY_TOKEN = "@token";
const console = reactotron;
const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default function chatScreen({ navigation }) {
  const navigationOptions = {
    title: "Chat",
  };
  const [userToChat, setUserToChat] = useState(navigation.state.params.user);

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [email, setEmail] = useState();
  const [isTyping, setIsTyping] = useState();
  const [user, setUser] = useState({ _id: id, name: name });
  const [groupChatId, setGroupChatId] = useState(`${id}-${userToChat.l.id}`);
  const [spinner, setSpinner] = useState(false);
  const [messages, setMessages] = useState([]);
  const [reloadChat, setReloadChat] = useState(0);

  function hashString(str) {
    if (str !== undefined) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
  }
  useEffect(() => {
    if (hashString(id) <= hashString(userToChat.l.id)) {
      setGroupChatId(`${id}-${userToChat.l.id}`);
    } else {
      setGroupChatId(`${userToChat.l.id}-${id}`);
    }
  }, [id, userToChat]);

  useEffect(() => {
    getListMessages();
  }, [groupChatId, reloadChat]);

  async function getListMessages() {
    // reactotron.log("groupchat", groupChatId);

    const messagesListener = await firebase
      .firestore()
      .collection("messages")
      .doc(groupChatId)
      .collection(groupChatId)
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        let tempList = [];
        const mensagens = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          tempList.push(firebaseData);
        });
        let msgs = [];
        tempList.forEach((element) => {
          let msgData = {
            _id: element.idFrom,
            text: element.content,
            // createdAt: new Date(),
            user: {
              _id: element.idFrom,
              // name: name,
              name:
                userToChat.l.id !== element.idFrom ? email : userToChat.l.email,
            },
          };
          msgs.push(msgData);
        });
        setMessages(msgs);
      });
    // return () => messagesListener();
  }

  useEffect(() => {
    // reactotron.log(userToChat);
    try {
      AsyncStorage.getItem(AppString.EMAIL_CHAT).then((response) => {
        setEmail(response);
      });
      AsyncStorage.getItem(AppString.ID).then((response) => {
        setId(response);
      });
      AsyncStorage.getItem(AppString.NICKNAME).then((response) => {
        setName(response);
      });
      AsyncStorage.getItem(AppString.PHOTO_URL).then((response) => {
        setAvatar(response);
      });
    } catch (error) {
      reactotron.log(error);
    }
  }, []);

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: "#3a397b",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }

  async function handleSend(msgs) {
    const text = msgs[0].text;

    const timestamp = moment()
      .valueOf()
      .toString();

    if (text.trim() === "") {
      return;
    }
    const itemMessage = {
      idFrom: id,
      idTo: userToChat.l.id,
      timestamp: timestamp,
      content: text.trim(),
      type: 0,
    };
    await firebase
      .firestore()
      .collection("messages")
      .doc(groupChatId)
      .collection(groupChatId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        reactotron.log("deu boa");
        setReloadChat(reloadChat + 1);
      })
      .catch((err) => {
        reactotron.log("nao deu boa");
      });
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#f2ac33" />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#f2ac33" />
      </View>
    );
  }

  function renderFooter() {
    if (isTyping) {
      return <Text>typing</Text>;
    }
    return null;
  }

  return (
    <GiftedChat
      messages={messages}
      loadEarlier
      // onSend={(newMessage) => handleSend(newMessage)}
      onSend={handleSend}
      //   user={user.l}
      user={{
        _id: id,
        name: name,
      }}
      renderBubble={renderBubble}
      placeholder="Digite sua mensagem aqui..."
      renderSend={renderSend}
      showUserAvatar
      scrollToBottomComponent={scrollToBottomComponent}
      scrollToBottom={true}
      inverted={true}
      isTyping={true}
      renderFooter={renderFooter}
    />
  );
}
