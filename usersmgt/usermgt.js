import React,{ useState, useEffect } from "react";
import "./usermgt.css";
import BootstrapTable from "react-bootstrap-table-next";
import { data } from "../tenantmgt/data";
import { MdOutlineMenu,MdNorth, MdSouth, MdTornado } from "react-icons/md";
import apiservice from "../../api/apiservices";

function UserManagement() {
    const [filters, setFilters] = useState({})
    const [isUserAscending, setIsUserAscending] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [showFilterList, setShowFilterList] = useState(false);
    const [showFilterList2, setShowFilterList2] = useState(false);
    const [showFilterList3, setShowFilterList3] = useState(false);
    const [showFilterList4, setShowFilterList4] = useState(false);
    const [showFilterList5, setShowFilterList5] = useState(false);
    const [showAboutFilterList, setShowAboutFilterList] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [selectAllAbout, setSelectAllAbout] = useState(false);
    const [aboutFilterOptions, setAboutFilterOptions] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    //  function fetchData() {
    //     axios.get('https://us-central1-adminconsole-dev.cloudfunctions.net/admin-console-dev/api/v1/user/signin', {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //      })
    //        .then(res => {
    //         console.log(res.data);
    //          data=res.data
    //       });
    //    }
    //    fetchData()

    useEffect(()=>{
        apiservice.getUserData().then((res)=>console.log(res))
    },[])
    const handleSortClick = (fieldName) => {
        if (fieldName === 'email') {
            setIsUserAscending(!isUserAscending);
            sortData(fieldName);
        }
    }
    const handleFilterChange = (fieldName, value, checked) => {
      setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          if (fieldName === "selectAll") {
              setSelectAll(checked);
              updatedFilters.email = checked ? filteredData.map((item) => item.email) : [];
          } else if (fieldName === "selectAllAbout") {
              setSelectAllAbout(checked);
              updatedFilters.firstName = checked ? aboutFilterOptions : [];
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
  const handleFilterChange2 = (fieldName, value, checked) => {
    setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.firstName = checked ? filteredData.map((item) => item.firstName) : [];
        } else if (fieldName === "selectAllAbout") {
            setSelectAllAbout(checked);
            updatedFilters.firstName = checked ? aboutFilterOptions : [];
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
const handleFilterChange3 = (fieldName, value, checked) => {
    setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.lastName = checked ? filteredData.map((item) => item.lastName) : [];
        } else if (fieldName === "selectAllAbout") {
            setSelectAllAbout(checked);
            updatedFilters.lastName = checked ? aboutFilterOptions : [];
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
const handleFilterChange4 = (fieldName, value, checked) => {
    setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.tenant = checked ? filteredData.map((item) => item.tenant) : [];
        } else if (fieldName === "selectAllAbout") {
            setSelectAllAbout(checked);
            updatedFilters.tenant = checked ? aboutFilterOptions : [];
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

const handleFilterChange5 = (fieldName, value, checked) => {
    setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.role = checked ? filteredData.map((item) => item.role) : [];
        } else if (fieldName === "selectAllAbout") {
            setSelectAllAbout(checked);
            updatedFilters.role = checked ? aboutFilterOptions : [];
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
        if (fieldName === 'email') {
            if (filters.email && filters.email.length > 0) {
                return filters.email.includes(item.email);
            }
        }
         else if (fieldName === 'firstName') {
             if (filters.firstName && filters.firstName.length > 0) {
                 return filters.firstName.includes(item.firstName);
            }
         }
        return true;
    });
    setFilteredData(filteredData1);
    setShowFilterList(false);
    setShowAboutFilterList(false);
};
const handleApplyFilters2 = (fieldName) => {
    const filteredData1 = filteredData.filter((item) => {
        if (fieldName === 'firstName') {
             if (filters.firstName && filters.firstName.length > 0) {
                 return filters.firstName.includes(item.firstName);
            }
         }
        return true;
    });
    setFilteredData(filteredData1);
    setShowFilterList2(false);
    setShowAboutFilterList(false);
};
const handleApplyFilters3 = (fieldName) => {
    const filteredData1 = filteredData.filter((item) => {
        if (fieldName === 'lastName') {
             if (filters.lastName && filters.lastName.length > 0) {
                 return filters.lastName.includes(item.lastName);
            }
         }
        return true;
    });
    setFilteredData(filteredData1);
    setShowFilterList3(false);
    setShowAboutFilterList(false);
};
const handleApplyFilters4 = (fieldName) => {
    const filteredData1 = filteredData.filter((item) => {
        if (fieldName === 'tenant') {
             if (filters.tenant && filters.tenant.length > 0) {
                 return filters.tenant.includes(item.tenant);
            }
         }
        return true;
    });
    setFilteredData(filteredData1);
    setShowFilterList4(false);
    setShowAboutFilterList(false);
};
const handleApplyFilters5 = (fieldName) => {
    const filteredData1 = filteredData.filter((item) => {
        if (fieldName === 'role') {
             if (filters.role && filters.role.length > 0) {
                 return filters.role.includes(item.role);
            }
         }
        return true;
    });
    setFilteredData(filteredData1);
    setShowFilterList5(false);
    setShowAboutFilterList(false);
};
    useEffect(()=>{
        setFilteredData(data);
    },[])
    const sortData = (fieldName) => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (fieldName === 'email') {
                if (isUserAscending) {
                    return a.email.localeCompare(b.email);
                } else {
                    return b.email.localeCompare(a.email);
                }
            }
        });
        setFilteredData(sortedData);
    };
    const handleFilterClick = (fieldName) => {
      if (fieldName === 'email') {
          setShowFilterList(!showFilterList);
          setShowAboutFilterList(false);
      }
      
  };
  const handleFilterClick2= (fieldName) => {
    if (fieldName === 'firstName') {
        setShowFilterList2(!showFilterList2);
        setShowAboutFilterList(false);
    }
    
};
const handleFilterClick3= (fieldName) => {
    if (fieldName === 'lastName') {
        setShowFilterList3(!showFilterList3);
        setShowAboutFilterList(false);
    }
    
};
const handleFilterClick4= (fieldName) => {
    if (fieldName === 'tenant') {
        setShowFilterList4(!showFilterList4);
        setShowAboutFilterList(false);
    }
    
};
const handleFilterClick5= (fieldName) => {
    if (fieldName === 'role') {
        setShowFilterList5(!showFilterList5);
        setShowAboutFilterList(false);
    }
    
};
const handleApplyReset=()=>{
    setFilteredData(data)
    setShowFilterList(!showFilterList)
    }

const handleApplyReset2=()=>{
    setFilteredData(data)
    setShowFilterList2(!showFilterList2)
    }
    const handleApplyReset3=()=>{
        setFilteredData(data)
        setShowFilterList3(!showFilterList3)
        }
        const handleApplyReset4=()=>{
            setFilteredData(data)
            setShowFilterList4(!showFilterList4)
            }
        
            const handleApplyReset5=()=>{
                setFilteredData(data)
                setShowFilterList5(!showFilterList5)
                }
           
  const columns = [
    {
      dataField: "id",
      text: "S.No",
    },
    {
      dataField: "email",
      text: "Email",
      headerFormatter: () => (
        <div>
            <span className=" ">Email</span>
            <span className=" ms-2" onClick={() => handleSortClick('email')} >
                {isUserAscending ? <MdNorth /> : <MdSouth />}
            </span>
            <span className=" " onClick={() => handleFilterClick('email')}>
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
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    />
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={selectAll}
                                    onChange={(e) => handleFilterChange("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.email.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.email &&
                                                    filters.email.includes(item.email)
                                                }
                                                 onChange={(e) => handleFilterChange("email", item.email, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.email}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters('email')}>Apply</button>
                                <button onClick={()=>handleApplyReset()}>Reset</button>
                            </div>
                        </div>
                    )}</div>
            )
            }
            
    ,
    {
      dataField: "firstName",
      text: "FirstName",
      headerFormatter: () => (
        <div>
            <span className=" ">FirstName</span>
            <span className=" ms-2" onClick={() => handleFilterClick2('firstName')}>
                <MdTornado />
            </span>{showFilterList2 && (
                        <div className="filter-list-popup">
                            <div className="filter-item">
                                {<input
                                    className="search-list"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    /> }
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={selectAll}
                                    onChange={(e) => handleFilterChange2("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.firstName &&
                                                    filters.firstName.includes(item.firstName)
                                                }
                                                 onChange={(e) => handleFilterChange2("firstName", item.firstName, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.firstName}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters2('firstName')}>Apply</button>
                                <button onClick={()=>handleApplyReset2()}>Reset</button>
                            </div>
                        </div>
                    )}</div>)
    },
    {
      dataField: "lastName",
      text: "LastName",
      headerFormatter: () => (
        <div>
            <span className="  ">LastName</span>
            
            <span className=" ms-2" onClick={() => handleFilterClick3('lastName')}>
                <MdTornado />
            </span>{showFilterList3 && (
                        <div className="filter-list-popup">
                            <div className="filter-item">
                                {<input
                                    className="search-list"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    /> }
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={selectAll}
                                    onChange={(e) => handleFilterChange3("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.lastName &&
                                                    filters.lastName.includes(item.lastName)
                                                }
                                                 onChange={(e) => handleFilterChange2("firstName", item.lastName, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.lastName}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters3('lastName')}>Apply</button>
                                <button onClick={()=>handleApplyReset3()}>Reset</button>
                            </div>
                        </div>
                    )}</div>)
    
    
    },
    {
      dataField: "tenant",
      text: "Tenant",
      headerFormatter: () => (
        <div>
            <span className="  ">Tenant</span>
            
            <span className=" ms-2" onClick={() => handleFilterClick4('tenant')}>
                <MdTornado />
            </span>{showFilterList4 && (
                        <div className="filter-list-popup">
                            <div className="filter-item">
                                {<input
                                    className="search-list"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    /> }
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={selectAll}
                                    onChange={(e) => handleFilterChange3("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.tenant.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.tenant &&
                                                    filters.tenant.includes(item.tenant)
                                                }
                                                 onChange={(e) => handleFilterChange4("tenant", item.tenant, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.tenant}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters4('tenant')}>Apply</button>
                                <button onClick={()=>handleApplyReset4()}>Reset</button>
                            </div>
                        </div>
                    )}</div>)
    
    },
    {
      dataField: "role",
      text: "Role",
      headerFormatter: () => (
        <div>
            <span className="  ">Role</span>
            
            <span className=" ms-2" onClick={() => handleFilterClick5('role')}>
                <MdTornado />
            </span>{showFilterList5 && (
                        <div className="filter-list-popup">
                            <div className="filter-item">
                                {<input
                                    className="search-list"
                                    type="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    /> }
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="select-all"
                                    checked={selectAll}
                                    onChange={(e) => handleFilterChange5("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.role.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.role &&
                                                    filters.role.includes(item.role)
                                                }
                                                 onChange={(e) => handleFilterChange5("role", item.role, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.role}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button">
                                <button onClick={() => handleApplyFilters5('role')}>Apply</button>
                                <button onClick={()=>handleApplyReset5()}>Reset</button>
                            </div>
                        </div>
                    )}</div>)
    
    },
    {
      text: "Action",
      formatter: (cell, row) => (
        <>
        <MdOutlineMenu />
        {cell}
        </>
      )
    },
  ];
 
  return (
    <div className="container">
      <div className="row">
        <div className="col usermgt">
          <h4 className="usermanagement">User Management</h4>
          <button className="add-tenant">Add User</button>
        </div>
      </div>
      <div className="row">
        <div className="col user-page-bg">
          <BootstrapTable
            keyField="data.tenantID"
            columns={columns}
            data={filteredData}
          />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
