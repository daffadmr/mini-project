import { gql } from "@apollo/client";

export const USER_SUBS = gql`
subscription UserInfo($id: uuid) {
  users(where: { id: { _eq: $id } }) {
    email
    username
    id
    avatar
  }
}
`

export const DIARY_USER_SUBS = gql`
subscription UserDiary($user_id: uuid) {
  diari(order_by: {created_at: desc}, where: {user_id: {_eq: $user_id}}) {
    foto
    id
    isi
    judul
    created_at
    tanggal
    user_id
  }
}
`