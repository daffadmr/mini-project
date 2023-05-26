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
subscription UserDiary($user_id: uuid, $limit: Int) {
  diari(order_by: {created_at: desc}, where: {user_id: {_eq: $user_id}}, limit: $limit) {
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
export const DIARY_USER_SUBS_COUNT = gql `
subscription MySubscription($user_id: uuid) {
  diari_aggregate(where: {user_id: {_eq: $user_id}}) {
    aggregate {
      count
    }
  }
}
`