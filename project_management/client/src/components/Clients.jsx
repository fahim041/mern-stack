import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQuery";
import Spinner from "./Spinner";
import EditClientModal from "./EditClientModal";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [selectedClient, setSelectedClient] = useState({});

  const clientEdit = (client) => {
    setSelectedClient(client);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error...</p>;
  return (
    <>
      <EditClientModal client={selectedClient} />
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow
                key={client.id}
                client={client}
                clientEdit={clientEdit}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
