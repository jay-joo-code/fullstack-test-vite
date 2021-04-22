import React from 'react';
import { TableValue } from '../../types/index';
import TableCell from './TableCell';

/**
 * Use this component to create the white panel for each table row. The table
 * should already include table headers, and the values passed in are in the
 * order in which the table headers appear.
 */
type TableRowProps = {
  values: Array<TableValue>;
};

const TableRow = (props: TableRowProps) => {
  const { values } = props;

  const resultList = values.map((val, index) => {
    const { data, tag, driver, buttonHandler, ButtonModal } = val;
    if (index === 0) {
      /* first cell */
      return (
        <TableCell
          key={index}
          data={data}
          index={index}
          first={true}
          last={false}
          driver={false}
        />
      );
    }
    if (index === values.length - 1) {
      /* last cell */
      return (
        <TableCell
          key={index}
          data={data}
          index={index}
          first={false}
          last={true}
          driver={driver === undefined ? false : driver}
          buttonHandler={buttonHandler}
          ButtonModal={ButtonModal}
        />
      );
    }
    return (
      <TableCell
        key={index}
        data={data}
        index={index}
        first={false}
        last={false}
        driver={false}
        tag={tag}
      />
    );
  });
  return <>{resultList}</>;
};

export default TableRow;
