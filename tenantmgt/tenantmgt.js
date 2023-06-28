import React, { useState, useEffect } from "react";
import "./tenantmgt.css";
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineMenu, MdNorth, MdSouth, MdTornado } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import apiservice from "../../api/apiservices";
import Spinner from 'react-bootstrap/Spinner';

const TenantManagement = () => {
    const [groupsListData, setGroupsListData] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [sizePerPage] = useState(5);
    const [isTenantAscending, setIsTenantAscending] = useState(true);
    const [showFilterList, setShowFilterList] = useState(false);
    const [filters, setFilters] = useState({})
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAboutFilterList, setShowAboutFilterList] = useState(false);
    const [selectAllAbout, setSelectAllAbout] = useState(false);
    const [aboutFilterOptions, setAboutFilterOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const sortData = (fieldName) => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (fieldName === 'name') {
                if (isTenantAscending) {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            }
        });
        setFilteredData(sortedData);
    };
    const handleSortClick = (fieldName) => {
        if (fieldName === 'name') {
            setIsTenantAscending(!isTenantAscending);
            sortData(fieldName);
        }
    };
    const handleSubscription = () => {
        navigate('/subscriptionmgt')
    }
    const handleFilterClick = (fieldName) => {
        if (fieldName === 'name') {
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
                updatedFilters.name = checked ? filteredData.map((item) => item.name) : [];
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
        const filteredData1 = filteredData.filter((item) => {
            if (fieldName === 'name') {
                if (filters.name && filters.name.length > 0) {
                    return filters.name.includes(item.name);
                }
            }
            else if (fieldName === 'about') {
                if (filters.about && filters.about.length > 0) {
                    return filters.about.includes(item.about);
                }
            }
            return true;
        });
        setFilteredData(filteredData1);
        setShowFilterList(false);
        setShowAboutFilterList(false);
    };

    const onPageSizeChange = (itemsPage) => {
        setGroupsListData(itemsPage);
    };

    const showingPerPageEntries = (from, to, size) => (
        <div className="d-inline pagination-text">
            <span>Showing</span>
            <span className="react-bootstrap-table-pagination-total mx-2">
                <b>{from}</b> - <b>{to}</b> of {size} entries
            </span>
        </div>
    );
    const fetchData = async () => {
        try {
            const response = await apiservice.getTenant();
            setGroupsListData(response);
            setFilteredData(response);
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            dataField: "tenantID",
            text: "S.No",
        },
        {
            dataField: "name",
            text: "Tenant Name",
            formatter: (cell, row) => (
                <>
                    <span className="profile-icon">{cell.slice(0, 2).toUpperCase()}</span>
                    {cell}
                </>
            ),
            headerFormatter: () => (
                <div>
                    <span className="column-header">Tenant Name</span>
                    <span className="tenant-sort-icon ms-5" onClick={() => handleSortClick('name')}>
                        {isTenantAscending ? <MdNorth /> : <MdSouth />}
                    </span>
                    <span className="filter-icon ms-2" onClick={() => handleFilterClick('name')}>
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
                                    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.tenantID} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.tenantID}
                                                checked={
                                                    filters.name &&
                                                    filters.name.includes(item.name)
                                                }
                                                onChange={(e) => handleFilterChange("name", item.name, e.target.checked)}
                                            />
                                            <label htmlFor={item.tenantID}>{item.name}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters('name')}>Apply</button>
                                <button>Reset</button>
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
                    <span className="about-filter-icon ms-m-2" onClick={() => handleFilterClick("about")}>
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
                                        <div key={item.tenantID} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.tenantID}
                                                checked={
                                                    filters.about &&
                                                    filters.about.includes(item.about)
                                                }
                                                onChange={(e) =>
                                                    handleFilterChange("about", item.about, e.target.checked)
                                                }
                                            />
                                            <label htmlFor={item.tenantID}>{item.about}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters('about')}>Apply</button>
                                <button>Reset</button>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            text: 'Action',
            formatter: (cell, row) => (
                <Dropdown>
                    <Dropdown.Toggle as={dropdownToggle} id="action-dropdown" />
                    <Dropdown.Menu><Dropdown.Item onClick={() => navigate('/viewandedittenant/' + row.tenantID)}>View/Edit</Dropdown.Item>
                        <Dropdown.Item>Disable</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSubscription()}>Create Subscription</Dropdown.Item>
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
        paginationTotalRenderer: showingPerPageEntries,
        disablePageTitle: true,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '20', value: 20
        }, {
            text: 'All', value: filteredData.length
        }],
        onSizePerPageChange: onPageSizeChange,
        sizePerPage: sizePerPage
    };
    return (
        <div className="Container">
            <div className="row">
                <div className="col tenantmgt">
                    <h4 className="">Tenant Management</h4>
                    <button className="add-tenant"> <Link className='addtenant' to='addTenant'>Add Tenant</Link></button>
                </div>
            </div>
            <div className="row">
                <div className="col tenat-page-bg">
                    {isLoading ? (
                        <div className="loader-wrapper my-5">
                            <div className="align-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </div>
                    ) : (
                        <BootstrapTable
                            keyField="data.tenantID"
                            columns={columns}
                            data={filteredData}
                            pagination={paginationFactory(options)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
const dropdownToggle = React.forwardRef(({ children, onClick }, ref) => (
    <span ref={ref} onClick={onClick} className="menu-icon">
        <MdOutlineMenu />
    </span>
));
export default TenantManagement;