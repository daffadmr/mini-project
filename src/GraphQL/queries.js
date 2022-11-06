import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
query GET_USER_DATA($email: String, $password: String) {
  user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
    email
    id
    password
    avatar
  }
}
`

export const GET_USER = gql`
query GetUser($id: Int) {
  user(where: { id: { _eq: $id }}) {
    email
    id
    password
    username
    avatar
  }
}
`

export const GET_DIARY = gql`
query GetDiary($user_id: Int) {
  diari(where: { user_id: { _eq: $user_id }}) {
    foto
    id
    isi
    judul
    user_id
    created_at
  }
}
`

export const GET_DIARY_DETAIL = gql`
query UserDiary($id: uuid) {
  diari(where: {id: {_eq: $id}}) {
    foto
    id
    isi
    judul
    created_at
    user_id
  }
}
`

export const SEARCH_DIARY = gql`
query SearchQuery($input: String, $user_id: Int) {
  diari(order_by: {id: asc}, where: {_or: [{judul: {_ilike: $input}}, {isi: {_ilike: $input}}], user_id: {_eq: $user_id}}) {
    id
    foto
    isi
    judul
    created_at
    user_id
  }
}

`
// variables search query ntar begini: input:`%${nama}%` (pake persen)

export const FILTER_DIARY = gql`
query FilterDate($tanggal: date, $user_id: Int) {
  diari(where: {created_at: {_eq: $tanggal}, user_id: {_eq: $user_id}}) {
    created_at
    foto
    id
    isi
    judul
    user_id
  }
}

`