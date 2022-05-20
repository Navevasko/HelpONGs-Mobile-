import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Modal, ScrollView, Text, ToastAndroid, View } from "react-native";
import ContainerModal from "../ContainerModal";
import TypePicker from "../TypePicker";
import ONGData from "../ONGData";
import BottomSheetPost from "../BottomSheetPost";
import FullButton from "../FullButton";
import ModalEvento from "../ModalEvento";
import ModalVaga from "../ModalVaga";
import ModalPost from "../ModalPost";
import { styles } from "./style";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalEndereco from "../ModalEndereco";
import ModalDataHora from "../ModalDataHora";
import { api } from "../../../api";
import ModalShadow from "../ModalShadow";
import { theme } from "../../global/styles/theme";
import { ActivityIndicator } from "react-native";

export default function ModalCreate({ onClose }) {
  const [Type, setType] = useState("post");
  const types = [
    { label: "Post", value: "post" },
    { label: "Evento", value: "evento" },
    { label: "Vaga", value: "vaga" },
  ];
  const [file, setFile] = useState();
  const [modalEndereco, setModalEndereco] = useState(false);
  const [modalDataHora, setModalDataHora] = useState(false);
  const [endereco, setEndereco] = useState({});
  const [data, setData] = useState({});
  const [tituloEvento, setTituloEvento] = useState("");
  const [descEvento, setDescEvento] = useState("");
  const [descPost, setDescPost] = useState({});
  const [descVaga, setVagaArray] = useState({});
  const [reqVaga, setReqVaga] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileArray, setFileArray] = useState([]);

  const handlePost = (desc, fileArray) => {
    console.log(fileArray);
    // let fileName;
    // let fileType;

    // if (desc !== "") {
    //   if (fileArray !== null) {
    //     fileArray.map((file) => {});
    //   }

    //   const arrayPost = {
    //     idOng: 1,
    //     descricao: desc,
    //     media: [],
    //   };

    //   fileArray.map((file) => {
    //     if (file.type === "image") {
    //       fileName = file.uri.split("/")[11];
    //       fileType = file.type + "/" + fileName.split(".")[1];
    //     } else if (file.type === "video") {
    //       fileName = file.uri.split("/")[11];
    //       fileType = file.type + "/" + fileName.split(".")[1];
    //     }
    //     arrayPost.media.push({
    //       fileName: fileName,
    //       type: fileType,
    //     });
    //   });

    //   console.log(arrayPost);

    //   api
    //     .post("/post", arrayPost)
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   ToastAndroid.show("Por favor, faça uma descrição de seu post");
    // }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Desculpe! Precisamos de permissão para fazer isso funcionar");
        }
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setFileArray([...fileArray, result]);
    }
  };

  return (
    <Modal transparent={true} animationType={"slide"} onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {loading && (
          <ModalShadow>
            <View
              style={{
                width: "40%",
                height: "20%",
                backgroundColor: theme.colors.white,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <ActivityIndicator size={60} color={theme.colors.secondary} />
              <Text style={{ fontSize: 20, fontFamily: theme.fonts.medium }}>
                {" "}
                Carregando...{" "}
              </Text>
            </View>
          </ModalShadow>
        )}
        <ContainerModal
          onClose={onClose}
          title={"Criar Publicação"}
          publish={true}
          onPress={() => {
            if (Type === "post") {
              handlePost("teste", fileArray);
            } else if (Type === "evento") {
              console.log(eventoArray);
            } else if (Type === "vaga") {
              console.log(vagaArray);
            }
          }}
        >
          <ONGData
            image={require("../../assets/img/ONG.png")}
            name={"GreenPeace"}
          />
          <TypePicker
            onValueChange={(item) => {
              setType(item);
            }}
            selectedValue={Type}
            items={types}
            mode={"dialog"}
          />

          <ScrollView
            style={styles.containerInput}
            contentContainerStyle={{ justifyContent: "center" }}
          >
            {Type == "post" && (
              <ModalPost
                fileArray={fileArray}
                setFile={(data) => {
                  setFile(data);
                }}
              />
            )}

            {Type == "evento" && (
              <ModalEvento
                fileArray={fileArray}
                setFile={(data) => {
                  setFile(data);
                }}
              />
            )}

            {Type == "vaga" && <ModalVaga />}
          </ScrollView>

          <BottomSheetPost>
            {Type == "post" && (
              <FullButton
                icon={"image"}
                text={"Adicionar Foto/Vídeo"}
                onPress={handleChoosePhoto}
              />
            )}

            {Type == "evento" && (
              <>
                <FullButton
                  icon={"image"}
                  text={"Adicionar Foto/Vídeo"}
                  onPress={handleChoosePhoto}
                />

                <FullButton
                  icon={"map-pin"}
                  text={"Adicionar Endereço"}
                  onPress={() => {
                    setModalEndereco(true);
                  }}
                />

                <FullButton
                  icon={"calendar"}
                  text={"Adicionar Data e Hora"}
                  onPress={() => {
                    setModalDataHora(true);
                  }}
                />
              </>
            )}

            {modalEndereco && (
              <ModalEndereco
                setData={(data) => {
                  setEndereco(data);
                }}
                onClose={() => {
                  setModalEndereco(false);
                }}
              />
            )}

            {modalDataHora && (
              <ModalDataHora
                onClose={() => {
                  setModalDataHora(false);
                }}
                setData={(data) => {
                  setData(data);
                }}
              />
            )}

            {Type == "vaga" && (
              <>
                <FullButton
                  icon={"map-pin"}
                  text={"Adicionar Endereço"}
                  onPress={() => {
                    setModalEndereco(true);
                  }}
                />

                <FullButton
                  icon={"calendar"}
                  text={"Adicionar Data e Hora"}
                  onPress={() => {
                    setModalDataHora(true);
                  }}
                />
              </>
            )}
          </BottomSheetPost>
        </ContainerModal>
      </GestureHandlerRootView>
    </Modal>
  );
}
