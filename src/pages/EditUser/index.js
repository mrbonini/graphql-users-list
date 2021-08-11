import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_USER } from '../../graphQL/mutations';
import { ALL_USERS_QUERY, GET_USER } from '../../graphQL/queries';

import styled from 'styled-components';
import Button from '../../components/Button';
import HorizontalDivider from '../../components/HorizontalDivider';
import Label from '../../components/Label';
import Title from '../../components/Title';
import RadioButton from '../../components/RadioButton';

const StyledInput = styled.input`
  box-shadow: 0 0 0 3.5px rgba(59, 153, 252, 0.5), inset 0 0 0 0.5px #b9b9b9,
    inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 4px 4px 2px;
  margin: 0.75em 0;
  border: 0;
  &:focus {
    outline: none;
  }
`;

export default function EditUser(props) {
  const { id } = useParams();
  const history = useHistory()
  
  const { loading, error, data } = useQuery(GET_USER, {variables: {email: id}});
  
  const refetchAllUsers = {
    query: ALL_USERS_QUERY
  }

  const refetchUser = {
    query: GET_USER,
    variables: { email: id}
  }

  const [editUser] = useMutation(UPDATE_USER, {
    onCompleted(data) {
      history.push('/');
    },
    onError(err) {
      console.log('🚀 ~ err', err);
    },
    refetchQueries: [refetchAllUsers, refetchUser],
  });
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  })

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user)
    }
  }, [data])
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const handleEdit = (evt, key) => {
    setUser({...user, [key]: evt.currentTarget.value})
  }

  const roles = [
    { name: 'Admin', value: 'ADMIN' },
    { name: 'Developer', value: 'DEVELOPER' },
    { name: 'App Manager', value: 'APP_MANAGER' },
    { name: 'Marketing', value: 'MARKETING' },
    { name: 'Sales', value: 'SALES' },
  ]

  return (
    <section>
      <div
        className="flex-spaced"
        style={{ padding: "15px 0", borderBottom: "1px solid #e5e5e5" }}
      >
        <Title size="34px" color="#000000">
          {user.email}
        </Title>
        <Button
          disabled={loading}
          onClick={() =>
            editUser({
              variables: {
                email: user.email,
                newAttributes: {
                  name: user.name,
                  role: user.role,
                },
              },
            })
          }
          type="primary"
        >
          Save
        </Button>
      </div>
      <div className="flex-evenly">
        <div style={{ width: "48%" }}>
          <div>
            <Label>Name</Label>
          </div>
          <StyledInput
            value={user.name}
            onChange={(evt) => handleEdit(evt, "name")}
          />
        </div>
        <HorizontalDivider />
        <div style={{ width: "48%" }}>
          <div>
            <Label>Role</Label>
          </div>
          {roles.map((role) => (
            <div
              key={role.value}
              style={{
                padding: "5px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RadioButton
                value={role.value}
                checked={user.role === role.value}
                onClick={() => setUser({ ...user, role: role.value })}
              />
              <Label style={{ marginLeft: "10px" }}>{role.name}</Label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}