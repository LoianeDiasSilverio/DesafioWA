import React, { Component } from "react";
import { View, Image, Text, ScrollView, Button, Linking, TouchableOpacity, TextInput  } from "react-native";
import Styles from '../home/tela_inicial.styles';
import UsersService from '../services/usersService';
import FollowService from '../services/followService'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();
let listRemoved = [];

class TelaInicial extends Component {
  constructor(props){
    super(props)

    this.state = {
      listUsersNotRemove: [],
      listUsers: [],
      listUsersRemove: [],
      click: false
    }

    this.doRequest();
  }
  
  doRequest(){
    this.getUsers();
  }

  async getUsers(){
    const users = await new UsersService().getUsersRequest();
    let list = [];

    users.data.forEach(async (user, index) => {
      if(index < 10){
        // DESCOMENTAR DESTA LINHA
          // const responseFollower = await new FollowService().getUserFollowerRequest(user.followers_url);
          // const responseFollowing = await new FollowService().getUserFollowerRequest(user.following_url);
          // const follower = responseFollower.data.length;
          // const following = responseFollowing.data.length;
        // ATE ESTA LINHA PARA TESTAR COM REQUISICAO

          // MOCK POIS ESTA DANDO LIMITE DE REQUISICOES EXCEDIDA
          const follower = 30;
          const following = 30;

          const userObj = {
            follower,
            following,
            ...user
          }
        
         list.push(userObj);
      }
    })
    
    this.setState({listUsers: list, listUsersNotRemove: list});
  }

  getUsersRemove(){
    this.setState({listUsers: this.state.listUsersRemove, click: true})
  }

  getUsersNotRemove(){
    this.setState({listUsers: this.state.listUsersNotRemove, click: false})
  }

  removeUser(item){
    const newListUsers = this.state.listUsers.filter(
      (user) =>
        user.id !== item.id
    );

    listRemoved.push(item);
    this.setState({listUsersRemove: listRemoved, listUsers: newListUsers, listUsersNotRemove: newListUsers});
  }

  handleLogin = (text) => {
    if(text === ''){
      this.setState({ listUsers: this.state.listUsersNotRemove });
      return;
    }

    const result = this.state.listUsers.filter(
      (user) =>
        user.login.indexOf(text) > -1
    );

    this.setState({ listUsers: result })
  }

  handleUserId = (text) => {
    
    if(text === ''){
      this.setState({ listUsers: this.state.listUsersNotRemove });
      return;
    }

    const result = this.state.listUsers.filter(
      (user) =>
        user.id.toString() === text
    );
    this.setState({ listUsers: result })
  }


  renderCard(){
    return(
      this.state.listUsers.map((item)=> (
        <View style={Styles.card}>
          <TouchableOpacity onPress={ ()=> this.removeUser(item)}>
            <View style={Styles.flexEnd}>
              <Icon name="delete" size={20} color="red" />
            </View>
          </TouchableOpacity>
          <View style={Styles.row}>
            <Image
              style={Styles.tinyLogo}
              source={{
                uri: item.avatar_url,
              }}
            />
            <View style={Styles.cardDescription}>
              <View style={Styles.row}>
                <Text style={Styles.title}>Login:</Text>
                <Text style={Styles.textInformative}>{item.login}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.title}>NodeId:</Text>
                <Text style={Styles.textInformative}>{item.node_id}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.title}>UserId:</Text>
                <Text style={Styles.textInformative}>{item.id}</Text>
              </View>
            </View>
          </View>
          {/* Comentar daqui */}
          <View style={Styles.flexEnd}>
            <View style={Styles.row}>
              <Text style={Styles.title}>Followers:</Text>
              <Text style={Styles.textInformative}>{item.follower}</Text>
            </View>
            <View style={Styles.row}>
              <Text style={Styles.title}>Following:</Text>
              <Text style={Styles.textInformative}>{item.following}</Text>
            </View>
          </View>
          {/* Ate aqui caso comente followers*/}
          <Button
            onPress={ ()=>{ Linking.openURL(item.html_url)}}
            title="Ir para github"
            color="#0047BA"
            accessibilityLabel="Ir para github"
          />
        </View>
      ))
    );
  }

  render() {
    return(
      <View style={Styles.container}>
        <ScrollView>
          <View style={{marginVertical: 10}}>
            <Button
              onPress={ ()=> !this.state.click ? this.getUsersRemove() : this.getUsersNotRemove()}
              title={!this.state.click ? "Mostrar usuários deletados" : "Mostrar usuarios não deletados"}
              color="#0047BA"
              accessibilityLabel={!this.state.click ? "Mostrar usuários deletados" : "Mostrar usuarios não deletados"}
            />

            <View style={{marginVertical: 10}, Styles.row}>
              <TextInput 
                style = {Styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Pesquisar pelo Login"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLogin}/>
              
              <TextInput 
                style = {Styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Pesquisar pelo UserId"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleUserId}/>
            </View>
              {this.renderCard()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TelaInicial;
