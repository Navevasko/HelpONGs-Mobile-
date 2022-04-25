import {
  Text,
  Image,
  TouchableHighlight,
  View,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import React from "react";
import Logo from "../../components/Logo";
import { styles } from "./style";
import { theme } from "../../global/styles/theme";
import BtnSubmit from "../../components/BtnSubmit";
import InputUnderline from "../../components/InputUnderline";
import InputUnderlinePassword from "../../components/InputUnderlinePassword";
import { cnpjMask, emailMask, passwordMask } from "../../utils/mask";
import Ong from "../../../api/ongController";

const imgPrincipal = require("../../assets/img/imgPrincipalCadastroONG.png");

export default function CadastroONG() {
  /* Criando as constantes dos dados */

  const [CNPJ, setCNPJ] = useState("10.399.631/0001-89");
  const [Email, setEmail] = useState("Greenpeacea@gmail.com");
  const [Senha, setSenha] = useState("1");
  const [ConfirmSenha, setConfirmSenha] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const trueCNPJ = Ong.trueCNPJ(CNPJ);
    let post = await Ong.post(trueCNPJ, Email, Senha)
    const postString = JSON.stringify(post)
    if (postString.includes("400")) {
      ToastAndroid.show(
        "Email ou CNPJ já existem, faça login",
        ToastAndroid.SHORT,
      );
      setIsLoading(false);
    }
    if (postString.includes("429")) {
      ToastAndroid.show(
        "Muitas requisições por CNPJ, por favor tente novamente mais tarde",
        ToastAndroid.SHORT
      );
      setIsLoading(false);
    }
    if(postString.includes("200")){
      ToastAndroid.show("Cadastro efetuado com sucesso!", ToastAndroid.SHORT)
      setIsLoading(false)
    }
  };

  /* Criando a função para validar os dados */
  // const validate = (StringCNPJ, Email, Senha, ConfirmSenha) => {
  //   if (StringCNPJ != "" && Email != "" && Senha != "" && ConfirmSenha != "") {
  //     /* Transformando o StringCNPJ em número */
  //     StringCNPJ =
  //       StringCNPJ.substring(0, 2) +
  //       StringCNPJ.substring(3, 6) +
  //       StringCNPJ.substring(7, 10) +
  //       StringCNPJ.substring(11, 15) +
  //       StringCNPJ.substring(15, 17);
  //     const CNPJ = parseInt(StringCNPJ);
  //     if (Email.includes("@")) {
  //       if(Senha.length < 10 || ConfirmSenha < 10)
  //     }
  //     else {
  //       ToastAndroid.show("Email inválido", ToastAndroid.SHORT);
  //     }
  //   } else {
  //     ToastAndroid.show("Preencha todos os campos", ToastAndroid.SHORT);
  //     return false;
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />

      <View style={styles.containerLogo}>
        <Logo />
      </View>
      <View style={styles.containerImage}>
        <Image source={imgPrincipal} style={styles.image} />
      </View>

      <Text style={styles.title}> Cadastro </Text>

      <InputUnderline
        iconName={"user"}
        color={theme.colors.secondary}
        size={30}
        placeholder={"Digite seu CNPJ"}
        value={cnpjMask(CNPJ)}
        onChangeText={(text) => {
          setCNPJ(text);
        }}
        keyboardType={"number-pad"}
        max={18}
        editable={!isLoading}
      />

      <InputUnderline
        iconName={"mail"}
        color={theme.colors.secondary}
        size={30}
        placeholder={"Digite seu E-mail"}
        value={emailMask(Email)}
        onChangeText={(text) => {
          setEmail(text);
        }}
        keyboardType={"email-address"}
        editable={!isLoading}
      />

      <InputUnderlinePassword
        iconName={"lock"}
        color={theme.colors.secondary}
        size={30}
        placeholder={"Digite sua Senha"}
        value={passwordMask(Senha)}
        isPassword={true}
        onChangeText={(text) => {
          setSenha(text);
        }}
        editable={!isLoading}
      />

      <InputUnderlinePassword
        iconName={"lock"}
        color={theme.colors.secondary}
        size={30}
        placeholder={"Confirme sua Senha"}
        value={passwordMask(ConfirmSenha)}
        isPassword={true}
        onChangeText={(text) => {
          setConfirmSenha(text);
        }}
        editable={!isLoading}
      />

      <BtnSubmit text={"Cadastrar"} onPress={onSubmit} editable={!isLoading} />

      <Text style={styles.terms}>
        Ao clicar em Cadastre-se, você concorda com nossos
        <Text
          style={{
            color: theme.colors.primary,
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Termos, Política de Dados e Política de Cookies.
        </Text>
        Você poderá receber notificações por SMS e cancelar isso quando quiser.
      </Text>

      <TouchableHighlight style={styles.signUp}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: theme.fonts.light,
          }}
        >
          Já tem uma conta? Faça
          <Text
            style={{
              color: theme.colors.primary,
              fontFamily: theme.fonts.bold,
            }}
          >
            {" "}
            Login
          </Text>
        </Text>
      </TouchableHighlight>
    </ScrollView>
  );
}
