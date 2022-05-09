const { gql } = require("@apollo/client")


export const GET_USER = gql`query getUser{me {
  id
  username
  email
  lastName
  lastLogin
  firstName
  verified
  pk
}
}
`
export const MESSAGES_QUERY = gql`query($id: ID,$last: Int){
    messages(id:$id, last:$last) {
      edges {
        node {
          id
          text
          created
          read
          sender {
            id
          }
        }
      }
    }
  }`;

export const CREATE_MESSAGE_QUERY = gql`mutation($chatId:Int!,$message:String!){
    sendMessage(chatId:$chatId,message:$message){
      message{
        id
        text
        created
        read
        sender {
            id
          }
      }
    }
  }`

export const SUBSCRIBE_MESSAGES = gql`subscription($username: String) {
    onNewMessage(chatroom: $username) {
      message {
        chatSet {
          edges {
            node {
              id
            }
          }
        }
        sender{
          id
        }
        id
        text
        created
        read
      }
    }
  }`;

export const USER_CHATS = gql`query getChats($last: Int){
    chats(last:$last) {
      edges {
        node {
          id
          group
          name
          lastModified
          participants {
            id
            username
            email
          }
          messages(last:1) {
            edges {
              node {
                id
                text
              }
            }
          }
        }
      }
    }
  }`

export const LOGIN_QUERY = gql`
  mutation($email: String!, $password: String!) {
    tokenAuth(password: $password, email: $email) {
      token
      success
      refreshToken
      errors
      user {
        pk
        username
        firstName
        lastName
        email
        isActive
      }
    }
  }
`;

export const REGISTER_QUERY = gql`
    mutation(
        $username: String!
        $email: String!
        $password1: String!
        $password2: String!
    ) {
        register(
            username: $username
            email: $email
            password1: $password1
            password2: $password2
        ) {
            success
            errors
        }
}`;

export let REFRESH_QUERY = gql`
    mutation ($token: String!) {
        refreshToken(refreshToken:$token){
            token
            refreshToken
            success
        }
    }
`;