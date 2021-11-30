import React from 'react';
import PropTypes from 'prop-types';

import LogoOption from '../logo-option/inde';

import './style.scss';

export const TableComponent = ({ tableHeaders, entities, actions }) => {
  const _renderHeaderColumns = () => {
    return (
      <thead className="table__head">
        <tr className="table__head__row">
          {tableHeaders.map((header, index) => (
            <th className={getThStyle(header)} key={index}>
              {header.label}
            </th>
          ))}
          <th className="table__head__row__th medium">Actions</th>
        </tr>
      </thead>
    );
  };

  const _renderRow = (entity, index) => {
    return (
      <tr key={index} className="table__body__row">
        {tableHeaders.map((header, index) =>
          header.hidden ? (
            ''
          ) : (
            <td className={getTdStyle(header)} key={index}>
              {entity[header.key]}
            </td>
          )
        )}
        <td className="table__body__row__td medium">
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={() => action.onClick(entity)}
              className={`${action.icon} table__body__row__td__action`}
              title={action.title}
            >
              <LogoOption
                text={action.title}
                icon={action.icon}
                logoClass="action-icon"
                textClasses={'action-text'}
              />
            </div>
          ))}
        </td>
      </tr>
    );
  };

  const _renderBodyRows = () => {
    return (
      <tbody className="table__body">
        {entities.map((entity, index) => _renderRow(entity, index))}
      </tbody>
    );
  };

  return (
    <table className="table">
      {_renderHeaderColumns()}
      {_renderBodyRows()}
    </table>
  );
};

TableComponent.propTypes = {
  tableHeaders: PropTypes.array.isRequired,
  entities: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
};

export default TableComponent;

const getThStyle = (header) => {
  return `table__head__row__th ${header.classes || ''}`;
};

const getTdStyle = (header) => {
  return `table__body__row__td ${header.classes || ''}`;
};
