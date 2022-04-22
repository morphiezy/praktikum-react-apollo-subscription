import { gql } from "@apollo/client";

const GET_USER = gql`
  query MyQuery {
    user {
      id
      name
    }
  }
`

const ADD_TODO = gql`
  mutation insertTodo($objects: [todolist_insert_input!]!) {
    insert_todolist(objects: $objects) {
      returning {
        id
        id_user
        is_done
        title
      }
    }
  }
`;

const UPDATE_TODO_FIELD = gql`
  mutation updateTodoStatus($id: Int!, $update: todolist_set_input) {
    update_todolist_by_pk(pk_columns: { id: $id }, _set: $update) {
      id
      is_done
      title
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    delete_todolist_by_pk(id: $id) {
      id
      title
      is_done
    }
  }
`;


const SUBSCRIPTION_TODO = gql`
  subscription getTodo {
    todolist {
      id
      id_user
      is_done
      title
    }
  }
`


export {
  GET_USER,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO_FIELD,
  SUBSCRIPTION_TODO
};
