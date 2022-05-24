import { StyleSheet, Text, View, SafeAreaView,ScrollView,Button, Modal, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useEffect} from 'react'
import CardContainer from "../../components/CardContainer";
import OptionsConfig from '../OptionsConfig';
import InputBorder from '../InputBorder';
import InputContainer from '../InputContainer';
import Icon from "react-native-vector-icons/Feather";
import { theme } from '../../global/styles/theme';
import ScrollBorder from '../ScrollBorder';
import { api } from '../../../api';
import ChipCategoria from '../ChipCategoria';
import BtnSubmit from '../BtnSubmit';
import MyDatePicker from '../MyDatePicker';

export default function InformacaoContaOng({data, setData}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataContatoOng, setdataContatoOng] = useState([]);
    const [dataCategoriasOng, setdataCategoriasOng] = useState([]);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    useEffect(async() =>{

        await api.get(`/category`).then((response) =>{
            setdataCategoriasOng(response.data.data);
          })
    }, [])

  return (
    <SafeAreaView>
    <TouchableOpacity style={styles.containerPress} onPress={() => setModalVisible(true)}>
        <OptionsConfig txt={"Informações de Conta"} visibleModal={setModalVisible}/>
    </TouchableOpacity>
    <Modal transparent visible={modalVisible}>
        <ImageBackground source={require('../../assets/img/ImgBackground.png')} style={styles.containerPrincipal}>
        <View style={styles.top}>
            <Icon
             name={"chevron-left"} 
             size={30} 
             color={"black"}
             onPress={() =>{setModalVisible(false)}}
             />
            <Text style={styles.txtTitulo}>Informações da Conta</Text>
        </View>
        <ScrollView style={{paddingHorizontal:5}}>
        <InputContainer>
            <InputBorder 
            title="Nome" 
            value={data.nome}
            color={"#FAFAFA"}
            borderColor={theme.colors.placeholder}
            txtColor={theme.colors.black}
            width={"100%"}
            />

            <InputBorder
              title="Descrição"
              width={"100%"}
              keyboardType={"number-pad"}
              value={data.descricao}
              color={"#FAFAFA"}
              borderColor={theme.colors.placeholder}
              txtColor={theme.colors.black}
            />

            <InputBorder 
                title="História" 
                style={{flexDirection:"column"}} 
                width={"100%"} 
                height={200} 
                color={"#FAFAFA"} 
                value={data.historia}
                borderColor={theme.colors.placeholder}
                txtColor={theme.colors.black}
                multiline={true}
            />
            
            <InputBorder 
                title="Membros" 
                color={"#FAFAFA"} 
                keyboardType={"number-pad"} 
                value={data.qtdDeMembros}
                txtColor={theme.colors.black}
                borderColor={theme.colors.placeholder}
            />
            <View>
                <Text style={{fontSize: 20,fontFamily: theme.fonts.regular,color: theme.colors.black, marginBottom:5}}>Fundação</Text>
                <MyDatePicker/>
            </View>
            
            
          </InputContainer>
          <CardContainer title={"Editar Categorias"}>
            <InputContainer flexDirection={"column"}>
                <InputBorder title="Categoria" width={"100%"} txtColor={theme.colors.black} borderColor={theme.colors.placeholder} />

                <ScrollBorder>
                {

                dataCategoriasOng.map((item) =>{
                    return(
                    <ChipCategoria text={item.nome} key={item.idCategorias} />
                    );
                })
                }
                </ScrollBorder>
            </InputContainer>
            </CardContainer>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom:20}}>
                <BtnSubmit
                    text="Salvar"
                    color={theme.colors.primaryFaded}
                    width="35%"
                    height={40}
                    onPress={() => {
                        onSubmit();
                    }}
                    />
                <BtnSubmit
                    text="Cancelar"
                    color={theme.colors.grey}
                    width="35%"
                    height={40}
                    onPress={() => {
                        onSubmit();
                    }}
                />
            </View>
            </ScrollView>
        </ImageBackground>
    </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    containerPress:{
        height:45,
        width:"100%",
        // backgroundColor:"aqua"
    },
    containerPrincipal:{
        flex:1,
        backgroundColor:"#FAFAFA"
    },
    top:{
        flexDirection:"row",
        paddingHorizontal:10,
        alignItems:'center',
        marginTop:15
    },
    txtTitulo:{
        // width:"50%",
        textAlign:'center',
        fontFamily:theme.fonts.semiBold,
        fontSize:20,
        paddingBottom:5,
        borderBottomWidth:1,
        borderBottomColor: theme.colors.placeholder,
        color:theme.colors.primary,
        marginLeft:"15%"
    },
    dateComponente:{
        width:200,
        height:41,
        backgroundColor:"#FAFAFA",
        marginTop:27
    }
})