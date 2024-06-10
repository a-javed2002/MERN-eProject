import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axiosConfig';
import MyHeader from '../Main/header';
import MyAsideBar from '../Main/aside';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-select-dt/css/select.dataTables.css';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.min.js';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'datatables.net-select/js/dataTables.select.min.js';
import jszip from 'jszip';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import styled from 'styled-components';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jszip;

const StyledTile = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;

    &.checked {
        background-color: lightblue;
    }
`;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [columns, setColumns] = useState([
        { data: 'username', title: 'Username', visible: true, type: 'text' },
        { data: 'email', title: 'Email', visible: true, type: 'select' },
        { data: 'basic_info._id', title: 'Gender', visible: true, type: 'select' },
        { data: 'basic_info._id', title: 'Height', visible: true, type: 'text' },
        { data: 'basic_info._id', title: 'Weight', visible: true, type: 'text' }
    ]);

    const tableRef = useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            if ($.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy();
            }

            tableRef.current = $('#example').DataTable({
                data: users,
                columns: columns.map(col => ({ data: col.data, title: col.title, visible: col.visible })),
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'copy',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    {
                        extend: 'csv',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    {
                        extend: 'excel',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    {
                        extend: 'pdf',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    {
                        extend: 'print',
                        exportOptions: {
                            columns: ':visible'
                        }
                    }
                ],
                select: {
                    style: 'multi'
                },
                initComplete: function () {
                    const api = this.api();

                    // Function to sync header and footer inputs
                    const syncInputs = (column, type, headerInput, footerInput) => {
                        headerInput.on('keyup change clear', function () {
                            if (column.search() !== this.value) {
                                column.search(this.value).draw();
                                footerInput.val(this.value);
                            }
                        });

                        footerInput.on('keyup change clear', function () {
                            if (column.search() !== this.value) {
                                column.search(this.value).draw();
                                headerInput.val(this.value);
                            }
                        });
                    };

                    api.columns().every(function () {
                        const column = this;
                        const columnIdx = column.index();
                        const colDef = columns[columnIdx];

                        if (colDef.type === 'text') {
                            const headerInput = $('<input type="text" placeholder="Search" style="width: 100%;">').appendTo($(column.header()).empty());
                            const footerInput = $('<input type="text" placeholder="Search" style="width: 100%;">').appendTo($(column.footer()).empty());

                            syncInputs(column, 'text', headerInput, footerInput);
                        } else if (colDef.type === 'select') {
                            const headerSelect = $('<select style="width: 100%;"><option value=""></option></select>').appendTo($(column.header()).empty());
                            const footerSelect = $('<select style="width: 100%;"><option value=""></option></select>').appendTo($(column.footer()).empty());

                            column.data().unique().sort().each(function (d, j) {
                                headerSelect.append(`<option value="${d}">${d}</option>`);
                                footerSelect.append(`<option value="${d}">${d}</option>`);
                            });

                            syncInputs(column, 'select', headerSelect, footerSelect);
                        }
                    });
                }
            });
        }
    }, [users, columns]);

    const toggleSelection = () => {
        const table = tableRef.current;
        if (table) {
            if (allSelected) {
                table.rows().deselect();
            } else {
                table.rows().select();
            }
            setAllSelected(!allSelected);
        }
    };

    const handleCheckboxChange = index => {
        const newColumns = [...columns];
        newColumns[index].visible = !newColumns[index].visible;
        setColumns(newColumns);
        if (tableRef.current) {
            tableRef.current.column(index).visible(newColumns[index].visible);
        }
    };

    return (
        <>
            <MyHeader />
            <MyAsideBar />
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            <div className="card-body">
                                <button className="mb-4" onClick={toggleSelection}>
                                    {allSelected ? 'Deselect All' : 'Select All'}
                                </button>
                                <div className="mb-4">
                                    {columns.map((col, index) => (
                                        <StyledTile key={col.data} className={col.visible ? 'checked' : ''} onClick={() => handleCheckboxChange(index)}>
                                            {col.title}
                                        </StyledTile>
                                    ))}
                                </div>

                                <table id="example" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            {columns.map(col => (
                                                <th key={col.data}>{col.title}</th>
                                            ))}
                                        </tr>
                                        <tr>
                                            {columns.map((col, index) => (
                                                <th key={`${col.data}-filter`} style={{ padding: '0.5rem' }}>
                                                    {col.type === 'text' ? (
                                                        <input type="text" placeholder="Search" style={{ width: '100%' }} />
                                                    ) : (
                                                        <select style={{ width: '100%' }}>
                                                            <option value="">All</option>
                                                        </select>
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            {columns.map(col => (
                                                <th key={col.data}>{col.title}</th>
                                            ))}
                                        </tr>

                                    </tfoot>
                                </table>
                            </div>
                            {/* /.row (main row) */}
                        </div>{/* /.container-fluid */}
                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}
        </>
    );
};

export default UserList;
