import { gql } from "@apollo/client";

export const INSERT_USER = gql`
mutation Register($email: String, $username: String, $password: String, $avatar: String) {
  insert_user(
    objects: { email: $email, username: $username, password: $password, avatar: $avatar }
  ) {
    returning {
      email
      id
      username
      password
      avatar
    }
  }
}
`;

export const INSERT_DIARY = gql`
mutation InsertDiary($foto: String, $isi: String, $judul: String, $user_id: Int) {
  insert_diari(objects: {foto: $foto, isi: $isi, judul: $judul, user_id: $user_id}) {
    returning {
      foto
      id
      isi
      judul
      created_at
      user_id
    }
  }
}
`

export const DELETE_DIARY = gql`
mutation DeleteDiary($id: uuid) {
  delete_diari(where: {id: {_eq: $id}}) {
    returning {
      foto
      id
      isi
      created_at
      judul
      user_id
    }
  }
}
`

export const UPDATE_DIARY = gql`
mutation UpdateDiary($id: uuid, $judul: String, $isi: String, $foto: String) {
  update_diari(where: {id: {_eq: $id}}, _set: {judul: $judul, isi: $isi, foto: $foto}) {
    returning {
      id
      foto
      isi
      judul
      created_at
      user_id
    }
  }
}
`