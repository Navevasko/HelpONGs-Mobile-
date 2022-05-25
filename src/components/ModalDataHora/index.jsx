import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import ContainerModal from "../ContainerModal";
import PropTypes from "prop-types";
import { styles } from "./style";
import InputUnderline from "../InputUnderline";
import { theme } from "../../global/styles/theme";
import FullButton from "../FullButton";
import { dateMask, timeMask } from "../../utils/mask";

export default function ModalDataHora({ onClose, setData }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <Modal transparent={true} animationType={"slide"}>
      <ContainerModal onClose={onClose} title={"Data e Hora"} publish={false}>
        <ScrollView style={styles.containerInput}>
          <InputUnderline
            placeholder="Data"
            keyboardType={"number-pad"}
            max={10}
            value={dateMask(date)}
            borderColor={theme.colors.primary}
            onChangeText={(text) => {
              setDate(text);
            }}
          />
          <InputUnderline
            placeholder="Hora"
            keyboardType={"number-pad"}
            max={5}
            value={timeMask(time)}
            borderColor={theme.colors.primary}
            onChangeText={(text) => {
              setTime(timeMask(text));
            }}
          />
        </ScrollView>
        <FullButton
          text="Salvar"
          backColor={theme.colors.primary}
          onPress={() => {
            const ano = date.split("/")[2];
            const mes = date.split("/")[1];
            const dia = date.split("/")[0];

            const hora = time.split(":")[0];
            const minuto = time.split(":")[1];

            const dataHora = new Date(ano, mes - 1, dia, hora - 3, minuto);

            setData(dataHora);
            onClose();
          }}
        />
      </ContainerModal>
    </Modal>
  );
}
