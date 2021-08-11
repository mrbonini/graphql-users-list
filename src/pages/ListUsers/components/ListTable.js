import React, { useState } from 'react';

import Button from '../../../components/Button';
import Title from '../../../components/Title';

export default function ListTable(props) {
  const {
    title,
    buttonLabel,
    buttonOnClick,
    buttonType,
    loading,
    data,
    columns,
    checkBox,
    selectedRow,
    onRowSelect,
    onRowClick,
  } = props;
  const [mouseOver, setOnMouseOver] = useState(null);
  
  const roles = {
    ADMIN: 'Admin',
    DEVELOPER: 'Developer',
    APP_MANAGER: 'App Manager',
    MARKETING: 'Marketing',
    SALES: 'Sales'
  };

  return (
    <section>
      <div className="flex-spaced">
        {title && <Title>{title}</Title>}
        {buttonLabel && (
          <Button
            disabled={selectedRow.length ? false : true}
            type={buttonType}
            onClick={buttonOnClick}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
      <table>
        <tbody onMouseLeave={() => setOnMouseOver(null)}>
          {columns && (
            <tr onMouseOver={() => setOnMouseOver(null)}>
              {checkBox && <th style={{width: '30px'}}></th>}
              {columns.map((column, idx) => (
                <th key={`head-${idx}`}>{column.name.toUpperCase()}</th>
              ))}
            </tr>
          )}
          {data &&
            data.map((dt, idx) => (
              <tr
                className={'row-hover'}
                key={`row-${idx}`}
                onMouseOver={() => setOnMouseOver(idx)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRow.includes(dt.email) ? true : false}
                    onChange={(e) =>
                      selectedRow.includes(dt.email)
                        ? onRowSelect(selectedRow.filter((sr) => sr !== dt.email))
                        : onRowSelect([...selectedRow, dt.email])
                    }
                  />
                </td>
                <td onClick={() => onRowClick(dt.email)}>
                  <Title
                    color={mouseOver === idx || selectedRow === idx ? '#0070c9' : '#333333'}
                    size="13px"
                  >
                    {dt.email}
                  </Title>
                </td>
                <td onClick={() => onRowClick(dt.email)}>{dt.name}</td>
                <td onClick={() => onRowClick(dt.email)}>{roles[dt.role]}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && 'Loading...'}
      {data && <div></div>}
    </section>
  );
}