
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';


const OrdersDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const calendarTemplate1 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.date)} showTime ></Calendar>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.total}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.discount}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.tax}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="date" header="Order Date" body={calendarTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="total" header="Total" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="discount" header="Discount" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="tax" header="Tax" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default OrdersDataTable;