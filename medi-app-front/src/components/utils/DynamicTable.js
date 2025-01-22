import React, { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import moment from 'moment';

export default function DynamicTable({ data, columns, name }) {
    const dt = useRef(null);

    const formattedData = data.map(row => {
        const newRow = {};
        columns.forEach(col => {
            if (col.field === 'fechaHora' || col.field === 'fecha') {
                newRow[col.field] = moment(row[col.field]).format(col.field === 'fechaHora' ? 'YYYY-MM-DD hh:mm A' : 'YYYY-MM-DD');
              } else {
                newRow[col.field] = row[col.field];
              }
        });
        return newRow;
    });

    const exportColumns = columns
        .filter(col => col.header !== 'Acción' && col.header !== 'Hora') 
        .map(col => ({ title: col.header, dataKey: col.field }));

    const exportPdf = () => {
        const doc = new jsPDF();
        doc.autoTable(exportColumns, formattedData);
        doc.save(`${name}.pdf`);
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, name);
    };

    const saveAsExcelFile = (buffer, fileName) => {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(data, fileName + EXCEL_EXTENSION);
    };

    return (
		<div className="card">
			<div className="flex justify-end mt-2 mb-2" style={{ gap: '5px' }}>
				<Button type="button" icon="pi pi-file-excel" rounded onClick={exportExcel} data-pr-tooltip="XLS" style={{ backgroundColor: '#008000' }} />
				<Button type="button" className="bg-red-600" icon="pi pi-file-pdf" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
			</div>
			<Tooltip target=".export-buttons>button" position="bottom" />
			<DataTable ref={dt} value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}  className="p-datatable-custom">
				{columns.map((col, index) => (
					<Column key={index} field={col.field} header={col.header} body={col.body} sortable={col.header !== 'Acción'} />
				))}
			</DataTable>
            <style jsx>{`
                .p-datatable-custom .p-paginator .p-dropdown {
                    width: auto !important;
                }
            `}</style>
		</div>
	);
}