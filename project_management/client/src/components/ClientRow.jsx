import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQuery";

export default function ClientRow({ client, clientEdit }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-primary btn-sm m-2"
          data-bs-toggle="modal"
          data-bs-target="#updateClient"
          type="button"
          onClick={() => clientEdit(client)}
        >
          <FaEdit />
        </button>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
