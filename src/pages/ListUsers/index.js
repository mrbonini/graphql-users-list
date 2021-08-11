import React, {  useState } from 'react';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { DELETE_USERS } from '../../graphQL/mutations';
import { ALL_USERS_QUERY } from '../../graphQL/queries';

import ListTable from './components/ListTable';

export default function ListUsers(props) {
  const { history } = props
  const [selectedRow, setSelectedRow] = useState([]);

  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  
  const refetch = {
    query: ALL_USERS_QUERY,
  };

  const [deleteUsers] = useMutation(DELETE_USERS, {
    onCompleted(data) {
      setSelectedRow([]);
    },
    refetchQueries: [refetch],
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const selectUserToEdit = (id) => {
    history.push(`/edit/${id}`)
  }

  return (
    <>
      <ListTable
        title="Users"
        buttonLabel="Delete"
        buttonOnClick={() => {deleteUsers({variables: {emails: selectedRow}})}}
        buttonType="secondary"
        columns={[{ name: 'email' }, { name: 'name' }, { name: 'role' }]}
        checkBox={true}
        data={data.allUsers}
        onRowSelect={setSelectedRow}
        selectedRow={selectedRow}
        onRowClick={selectUserToEdit}
      />
    </>
  );
} 