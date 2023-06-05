import React, { useState, useEffect } from "react";
import "./tenantmgt.css";
import { data } from './data'
import { Link } from 'react-router-dom'
import { MdOutlineMenu, MdNorth, MdSouth, MdTornado } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const TenantManagement = () => {
    const [groupsListData, setGroupsListData] = useState([]);
    const [filteredData, setFilteredData] = useState({})
    const [sizePerPage] = useState(5);
    const [isTenantAscending, setIsTenantAscending] = useState(true);
    const [showFilterList, setShowFilterList] = useState(false);
    const [filters, setFilters] = useState({})
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAboutFilterList, setShowAboutFilterList] = useState(false);
    const [selectAllAbout, setSelectAllAbout] = useState(false);
    const [aboutFilterOptions, setAboutFilterOptions] = useState([]);

    const sortData = (fieldName) => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (fieldName === 'tenat_name') {
                if (isTenantAscending) {
                    return a.tenat_name.localeCompare(b.tenat_name);
                } else {
                    return b.tenat_name.localeCompare(a.tenat_name);
                }
            }
        });
        setFilteredData(sortedData);
    };
    const handleSortClick = (fieldName) => {
        if (fieldName === 'tenat_name') {
            setIsTenantAscending(!isTenantAscending);
            sortData(fieldName);
        }
    };

    const handleFilterClick = (fieldName) => {
        if (fieldName === 'tenat_name') {
            setShowFilterList(!showFilterList);
            setShowAboutFilterList(false);
        }
        if (fieldName === 'about') {
            setShowAboutFilterList(!showAboutFilterList);
            setShowFilterList(false);
        }
    };

    const handleFilterChange = (fieldName, value, checked) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (fieldName === "selectAll") {
                setSelectAll(checked);
                updatedFilters.tenat_name = checked ? data.map((item) => item.tenat_name) : [];
            } else if (fieldName === "selectAllAbout") {
                setSelectAllAbout(checked);
                updatedFilters.about = checked ? aboutFilterOptions : [];
            }
            else {
                const filterValues = updatedFilters[fieldName] || [];
                if (checked) {
                    updatedFilters[fieldName] = [...filterValues, value];
                } else {
                    updatedFilters[fieldName] = filterValues.filter((val) => val !== value);
                }
            }
            return updatedFilters;
        });
    };

    const handleApplyFilters = (fieldName) => {
        const filteredData = data.filter((item) => {
            if (fieldName === 'tenat_name') {
                if (filters.tenat_name && filters.tenat_name.length > 0) {
                    return filters.tenat_name.includes(item.tenat_name);
                }
            }
            else if (fieldName === 'about') {
                if (filters.about && filters.about.length > 0) {
                    return filters.about.includes(item.about);
                }
            }
            return true;
        });
        setFilteredData(filteredData);
        setShowFilterList(false);
        setShowAboutFilterList(false);
    };

    const onPageSizeChange = (itemsPage) => {
        setGroupsListData(itemsPage);
    };

    const customTotal = (from, to, size) => (
        <div className="d-inline pagination-text">
            <span>Showing</span>
            <span className="react-bootstrap-table-pagination-total mx-2">
                <b>{from}</b> - <b>{to}</b> of {size} entries
            </span>
        </div>
    );
    useEffect(() => {
        const filteredData = data.filter((item) => {
            if (filters.tenat_name && filters.tenat_name.length > 0) {
                return filters.tenat_name.includes(item.tenat_name);
            }
            return true;
        });
        const filteredAbout = Array.from(
            new Set(filteredData.map((item) => item.about))
        );
        setAboutFilterOptions(filteredAbout);
        setFilteredData(filteredData);
    }, []);
    const columns = [
        {
            dataField: "id",
            text: "S.No",
            headerStyle: { width: '70px' },
            style: { width: '70px' } 
        },
        {
            dataField: "tenat_name",
            text: "Tenant Name",
            headerStyle: { width: '250px' },
            style: { width: '250px' },
            headerFormatter: () => (
                <div>
                    <span className="column-header">Tenant Name</span>
                    <span className="tenant-sort-icon" onClick={() => handleSortClick('tenat_name')}>
                        {isTenantAscending ? <MdNorth /> : <MdSouth />}
                    </span>
                    <span className="filter-icon" onClick={() => handleFilterClick('tenat_name')}>
                        <MdTornado />
                    </span>
                    {showFilterList && (
                        <div className="filter-list-popup">
                            <div className="filter-item">
                                <input
                                    className="search-list"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={selectAll}
                                    onChange={(e) => handleFilterChange("selectAll", null, e.target.checked)} />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.tenat_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.tenat_name &&
                                                    filters.tenat_name.includes(item.tenat_name)
                                                }
                                                onChange={(e) => handleFilterChange("tenat_name", item.tenat_name, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.tenat_name}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters('tenat_name')}>Apply</button>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            dataField: "about",
            text: 'About',
            headerFormatter: () => (
                <div>
                    <span className="column-header">About</span>
                    <span className="about-filter-icon" onClick={() => handleFilterClick("about")}>
                        <MdTornado />
                    </span>
                    {showAboutFilterList && (
                        <div className="filter-list-popup">
                            <div className="filter-item">
                                <input
                                    className="search-list"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all-about"
                                    checked={selectAllAbout}
                                    onChange={(e) => handleFilterChange("selectAllAbout", null, e.target.checked)}
                                />
                                <label htmlFor="select-all-about" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.about.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.about &&
                                                    filters.about.includes(item.about)
                                                }
                                                onChange={(e) =>
                                                    handleFilterChange("about", item.about, e.target.checked)
                                                }
                                            />
                                            <label htmlFor={item.id}>{item.about}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters('about')}>Apply</button>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            text: 'Action',
            headerStyle: { width: '80px' },
            style: { width: '80px' },
            formatter: (cell, row) => (
                <Dropdown>
                    <Dropdown.Toggle as={CustomDropdownToggle} id="action-dropdown" />
                    <Dropdown.Menu>
                        <Dropdown.Item>View/Edit</Dropdown.Item>
                        <Dropdown.Item>Disable</Dropdown.Item>
                        <Dropdown.Item>Create Subscription</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )
        }
    ];
    const options = {
        paginationSize: 3,
        showTotal: true,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Previous',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }, {
            text: 'All', value: groupsListData.length
        }],
        onSizePerPageChange: onPageSizeChange,
        sizePerPage: sizePerPage
    };
    return (
        <div className="Container">
            <div className="row">
                <div className="col tenantmgt">
                    <h4 className="">Tenant Management</h4>
                    <button className="add-tenant m-3"> <Link className='addtenant' to='addTenant'>Add/Edit Tenant</Link></button>
                </div>
            </div>
            <div className="row tenat-page-bg">
                <div className="col">
                    <BootstrapTable
                        keyField="data.id"
                        columns={columns}
                        data={filteredData}
                        pagination={paginationFactory(options)}
                    />
                </div>
            </div>
        </div>
    )
}
const CustomDropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span ref={ref} onClick={onClick} className="menu-icon">
        <MdOutlineMenu />
    </span>
));
export default TenantManagement;