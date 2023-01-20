
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';


const ProductsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.name}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.price}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.description}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.color}</p>
    const imageTemplate4 = (rowData, { rowIndex }) => <Image src={rowData.photo}  alt="Image" height="60px" />
    const tagTemplate5 = (rowData, { rowIndex }) => <Tag value={rowData.tags}  ></Tag>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="name" header="Name" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="price" header="Price" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="description" header="Description" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="color" header="Color" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="photo" header="Photo" body={imageTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="tags" header="Tags" body={tagTemplate5} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ProductsDataTable;