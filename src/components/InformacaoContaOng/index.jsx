import { StyleSheet, Text, View, SafeAreaView,ScrollView, Modal, TouchableOpacity, ImageBackground, ToastAndroid, RefreshControlBase, } from 'react-native'
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
import BtnConfig from '../BtnConfig';
import { dateMask } from '../../utils/mask';
import SelectCategoria from '../SelectCategoria';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InformacaoContaOng({idOng}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataContatoOng, setdataContatoOng] = useState([]);
    const [dataCategoriasOng, setdataCategoriasOng] = useState([]);
    const [dataCategorias, setdataCategorias] = useState([]);
    const [open, setOpen] = useState(false)
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [historia, setHistoria] = useState();
    const [membros, setMembros] = useState("");
    const [fundacao, setFundacao] = useState(); 
    const [numeroDeSeguidores, setNumeroDeSeguidores] = useState(); 
    const [cnpj, setCNPJ] = useState();
    const [banner, setBanner] = useState();
    const [foto, setFoto] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    
    useEffect(async() =>{
        api.get(`/ong/${idOng}`).then((response) =>{
            setNome(response.data.data.nome);
            setDescricao(response.data.data.descricao);
            setHistoria(response.data.data.historia);
            setMembros(String(response.data.data.qtdDeMembros));
            setFundacao(String(response.data.data.dataDeFundacao).substring(0, 10).split('-').reverse().join('/'));
            setNumeroDeSeguidores(response.data.data.numeroDeSeguidores);
            setCNPJ(response.data.data.cnpj);
            setBanner(response.data.data.banner);
            setFoto(response.data.data.foto);
          }).catch((error) => {
              console.log(error);
          })
        await api.get(`/category/${idOng}`).then((response) =>{
            if(response.data.data != null){
                setdataCategoriasOng(response.data.data);
            }
            
          }).catch((error) => {
            console.log("error categoria por id ong", error)
          })

          adcionarCategoria();
          carregarCategorias();
          RecuperarEmailSenha();
        //   onSubmit();
          
    }, [])

    const RecuperarEmailSenha = async( ) => {
        const emailLogin = await AsyncStorage.getItem("OngEmailLogin")
        const senhaLogin = await AsyncStorage.getItem("OngSenhaLogin")
        const a = JSON.parse(senhaLogin)
        const b = JSON.parse(emailLogin)
        setEmail(b);
        setSenha(a);
        
      }

    function carregarCategorias(){
        api.get(`/category`).then((response) => {
            setdataCategorias(response.data.data);
        }).catch((error) => {
            console.log("error categoria", error)
        })
    }

    function adcionarCategoria(nome){
        if(nome != null){
            api.post(`/category/ong/`,{
                idOng: idOng,
                categoria: nome
            }).then((response) => {
                RefreshControlBase = carregarCategorias();
                ToastAndroid.show("Categoria: "+ nome + " adicionada com sucesso!", ToastAndroid.SHORT);
            }).catch((error) => {
                console.log("error em adcionar categoria", error);
            })
        }
        
    }

    
        
    

    // const ResultCategorias = dataCategorias.filter((item) => {
    //     const comparar = item.idCategorias == dataCategoriasOng.idCategorias ? item : "porra"
    //     return comparar
    // })
    // console.log(ResultCategorias)

      

  // const teste = () => {

  //   let idCategorias = [];
  //   dataIdCategoriasOng.map((item) =>{
  //       idCategorias.push(item.idCategorias);
  //   });

  //   let arrayidCategorias = [];

  //   // dataCategoriasOng.map((item) =>{
  //   //   arrayidCategorias.push(item.idCategorias);
  //   // });

  //   // let arrayCategorias = [];
  //   // let idx = arrayidCategorias.indexOf(idCategorias);
  //   // while (idx == -1) {
  //   //   arrayCategorias.push(idx);
  //   //   idx = dataCategoriasOng.indexOf(idCategorias, idx ++);
      
  //   // }
  //   // console.log("foi",arrayCategorias);
  // }

     
    const onSubmit = () =>{
        if(nome != null && descricao != null && historia != null && membros != null && fundacao != null && email != null && senha != null){
        api.put(`/ong/${idOng}`, {
            ong: {
                nome: nome,
                descricao: descricao,
                numeroDeSeguidores: numeroDeSeguidores,
                cnpj: cnpj,
                banner: banner,
                historia: historia,
                foto: foto,
                qtdDeMembros: Number(membros),
                dataDeFundacao: String(fundacao),
            },
            login: {
                email: email,
                senha: senha
            }
        }).then((response) =>{
            ToastAndroid.show("Dados salvos com sucesso!", ToastAndroid.SHORT);
            
        }).catch((error) =>{
            console.log("erro atualizar perfilong",error)
        })
    }else {
        ToastAndroid.show("Por favor preencha todos os campos!", ToastAndroid.SHORT);
    }
    }

    

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
            placeholder={"Digite seu nome"}
            color={"#FAFAFA"}
            borderColor={theme.colors.placeholder}
            txtColor={theme.colors.black}
            width={"100%"}
            value={nome}
            onChangeText={(text) =>{setNome(text)}}
            max={100}
            />

            <InputBorder
              title="Descrição"
              width={"100%"}
              keyboardType={"number-pad"}
              value={descricao}
              color={"#FAFAFA"}
              borderColor={theme.colors.placeholder}
              txtColor={theme.colors.black}
              placeholder={"Digite uma descrição"}
              onChangeText={(text) =>{setDescricao(text)}}
            />

            <InputBorder 
                title="História" 
                style={{flexDirection:"column"}} 
                width={"100%"} 
                height={200} 
                color={"#FAFAFA"} 
                placeholder={"Digite a história da sua ONG"}
                borderColor={theme.colors.placeholder}
                txtColor={theme.colors.black}
                multiline={true}
                value={historia}
                onChangeText={(text) =>{setHistoria(text)}}
            />
            
            <InputBorder 
                title="Membros" 
                color={"#FAFAFA"} 
                keyboardType={"number-pad"} 
                value={membros}
                txtColor={theme.colors.black}
                borderColor={theme.colors.placeholder}
                placeholder={"quantidade"}
                onChangeText={(text) =>{setMembros(text)}}
            />
            
                <InputBorder
                    title='Data de fundação'
                    placeholder="Data"
                    keyboardType={"number-pad"}
                    color={"#FAFAFA"}
                    width={"50%"}
                    max={10}
                    value={fundacao}
                    txtColor={theme.colors.black}
                    borderColor={theme.colors.placeholder}
                    onChangeText={(text) => {
                    setFundacao(dateMask(text));
                    }}
                />

            <CardContainer title={"Dados de Login"}>
            <InputContainer flexDirection={"column"}>
                <InputBorder 
                title="E-mal" 
                color={"#FAFAFA"}
                borderColor={theme.colors.placeholder}
                txtColor={theme.colors.black}
                width={"100%"}
                placeholder={"Informe seu E-mail"}
                onChangeText={(text) => setEmail(text)}
                value={email}
                />
                <InputBorder 
                title="Senha" 
                color={"#FAFAFA"}
                borderColor={theme.colors.placeholder}
                txtColor={theme.colors.black}
                width={"100%"}
                placeholder={"Informe sua Senha"}
                onChangeText={(text) => setSenha(text)}
                value={senha}
                isPassword={true}
                />
                </InputContainer>
            </CardContainer>
            
          </InputContainer>
          <CardContainer title={"Editar Categorias"}>
            <InputContainer flexDirection={"column"}>
            <SelectCategoria options={dataCategorias} onChangeSelect={(nome) => {adcionarCategoria(nome)}}/>
                <ScrollBorder>
                {
               
                dataCategoriasOng.map((item) =>{

                    return(
                    <ChipCategoria idOng={idOng} data={item} text={item.tbl_categorias.nome} key={item.idCategorias} />
                    );
                })
                }
                </ScrollBorder>
            </InputContainer>
            </CardContainer>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom:20}}>
                <BtnConfig
                    text="Atualizar"
                    color={theme.colors.primaryFaded}
                    width="35%"
                    height={40}
                    onPress={() => {
                        onSubmit();
                    }}
                    />
                <BtnConfig
                    text="Cancelar"
                    color={theme.colors.grey}
                    width="35%"
                    height={40}
                    onPress={() => {
                        setModalVisible(false);
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