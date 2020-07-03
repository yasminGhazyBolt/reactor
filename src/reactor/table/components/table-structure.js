import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Obj } from 'reinforcements';

import { TableEditButton, TableDeleteButton } from './table-actions';

const defaultTableActions = {
    heading: 'actions',
    buttons: [TableEditButton, TableDeleteButton]
};

export default function tableStructure(options, records, setRecord) {
    if (options.actions === true && ! options.actionsIsAdded) {
        options.columns.push(defaultTableActions);
        options.actionsIsAdded = true;
    }

    let tableHeading = options.columns.map((column, index) => {
        return <TableCell key={index}>{column.heading}</TableCell>;
    });

    let tableRows = records.map((record, rowIndex) => {
        return <TableRow key={record.id}>
            {options.columns.map((column, columnIndex) => {
                if (column.buttons) {
                    return <TableCell key={columnIndex}>
                        {column.buttons.map((ActionButton, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ActionButton onClick={(e, currentAction) => setRecord(record, rowIndex, currentAction)} />
                                </React.Fragment>
                            )
                        })}
                    </TableCell>
                }

                let columnValue = column.formatter ? <column.formatter record={record} column={column} rowIndex={rowIndex} columnIndex={columnIndex} /> : Obj.get(record, column.key);

                return <TableCell key={column.heading}>
                    {columnValue}
                </TableCell>
            })}

        </TableRow>;
    });

    return [tableHeading, tableRows];
} 