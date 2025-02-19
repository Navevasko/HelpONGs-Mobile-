import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Text,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./style";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { api } from "../../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Menu({estado, idOng}) {

    const [modalVisible, setModalVisible] = useState(estado);
    const [modalNotificacoesVisible, setModalNotificacoesVisible] = useState(false);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [user, setUser] = useState()

    const handleLogout = () => {
        AsyncStorage.removeItem("UserLogin")
        navigation.navigate("SelecioneLoginOng")
    }

    useEffect(() => {
      AsyncStorage.getItem("UserLogin").then((data) => {
        setUser(JSON.parse(data))
      })
      console.log(user);
    }, [])

    const isONG = () => {
      console.log(user);
      if(user.idOng){
        return true
      }
      else {
        return false
      }
    }

    const handleFeed = () => {
      navigation.navigate("Feed")
    }

    const handleControle = () => {
      navigation.navigate("Controle", {idOng: data.idOng})
    }

    useEffect(async() => {
        await api.get(`/ong/${idOng}`).then((response) => {
            setData(response.data.data);
        }).catch((error) => {
            console.log("erro get navBar", error);
        })
    },[])
    
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="menu" style={styles.icons} size={30} />
        </TouchableOpacity>
        <View style={styles.options}>
            <TouchableOpacity onPress={() => {navigation.navigate("ConfigONG", {data})}}>
            <Icon name="settings" style={styles.icons} size={30} />
          </TouchableOpacity>
          <Image source={{ uri: data.foto }} style={styles.profilePicture} />
        </View>
      </View>
      <Modal transparent visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            alignItems: "flex-start",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <SafeAreaView>
            <View style={styles.containerModalMenu}>
              <Icon name="menu" style={styles.icons} size={30} />
              <TouchableOpacity
                onPress={() => navigation.navigate("Doar")}
                style={styles.containerOpcoesModalMenu}
              >
                <Icon name="heart" style={styles.iconsModal} size={30} />
                <Text style={styles.txtOpcoesModalMenu}>Doar</Text>
              </TouchableOpacity>
              <View style={styles.containerOpcoesModalMenu} onTouchEnd={handleFeed} >
                <Icon name="layout" style={styles.iconsModal} size={30} />
                <Text style={styles.txtOpcoesModalMenu}>Feed</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("PerfilONG", {idOng: user.idOng})}
                style={styles.containerOpcoesModalMenu}
              >
                <Icon name="user" style={styles.iconsModal} size={30} />
                <Text style={styles.txtOpcoesModalMenu}>Perfil</Text>
              </TouchableOpacity>
              
              {isONG ? <View style={styles.containerOpcoesModalMenu} onTouchStart={handleControle}>
                <Icon name="calendar" style={styles.iconsModal} size={30} />
                <Text style={styles.txtOpcoesModalMenu}>
                  Controle de Eventos
                </Text>
              </View> : <View></View>}

              <View
                style={[styles.containerOpcoesModalMenu, { marginTop: 100 }]}
              >
                <Icon name="settings" style={styles.iconsModal} size={30} />
                <Text style={styles.txtOpcoesModalMenu}>Configurações</Text>
              </View>
              <View style={styles.containerOpcoesModalMenu} onTouchStart={handleLogout}>
                <Icon name="log-out" style={styles.iconsModal} size={30} />
                <Text style={styles.txtOpcoesModalMenu}>Logout</Text>
              </View>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
      <Modal transparent visible={modalNotificacoesVisible}>
        <TouchableOpacity
          onPress={() => setModalNotificacoesVisible(false)}
          style={{
            flex: 1,
            alignItems: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <SafeAreaView>
            <View style={styles.containerModalNotificacoes}>
              <View style={styles.containerPerfilNotificacao}>
                <Image
                  source={require("../../assets/img/fotoDePerfil.jpeg")}
                  style={styles.ImgNotificacao}
                />
                <Text>O tal do Jorg1nhO</Text>
              </View>
              <View style={styles.containerNotificacao}>
                <Image
                  source={require("../../assets/img/fotoPerfilNotificao.png")}
                  style={styles.ImgNotificacao}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.txtNome}>Maycon Douglas</Text>
                  <Text style={styles.txtDataNotificacao}>
                    25 de fevereiro de 2022
                  </Text>
                  <Text numberOfLines={2} style={styles.txtNotificacao}>
                    Comentou em uma publicação sua: Simplesmente incrivel como
                    faço para participar?
                  </Text>
                </View>
              </View>
              <View style={styles.containerNotificacao}>
                <Image
                  source={require("../../assets/img/fotoPerfilNotificao.png")}
                  style={styles.ImgNotificacao}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.txtNome}>Maycon Douglas</Text>
                  <Text style={styles.txtDataNotificacao}>
                    25 de fevereiro de 2022
                  </Text>
                  <Text numberOfLines={2} style={styles.txtNotificacao}>
                    Comentou em uma publicação sua: Simplesmente incrivel como
                    faço para participar?
                  </Text>
                </View>
              </View>
              <View style={styles.containerNotificacao}>
                <Image
                  source={require("../../assets/img/fotoPerfilNotificao.png")}
                  style={styles.ImgNotificacao}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.txtNome}>Maycon Douglas</Text>
                  <Text style={styles.txtDataNotificacao}>
                    25 de fevereiro de 2022
                  </Text>
                  <Text numberOfLines={2} style={styles.txtNotificacao}>
                    Comentou em uma publicação sua: Simplesmente incrivel como
                    faço para participar?
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

Menu.propTypes = {
  estado: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
