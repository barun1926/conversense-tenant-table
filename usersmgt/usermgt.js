import React,{ useState, useEffect } from "react";
import "./usermgt.css";
import BootstrapTable from "react-bootstrap-table-next";
import { MdOutlineMenu,MdNorth, MdSouth, MdTornado } from "react-icons/md";
import apiservice from "../../api/apiservices";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate,Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';




function UserManagement() {
    const [filters, setFilters] = useState({})
    const [groupsListData, setGroupsListData] = useState([]);
    const [isUserAscending, setIsUserAscending] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [showFilterList, setShowFilterList] = useState(false);
    const [showFilterList2, setShowFilterList2] = useState(false);
    const [showFilterList3, setShowFilterList3] = useState(false);
    const [showFilterList4, setShowFilterList4] = useState(false);
    const [showFilterList5, setShowFilterList5] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [sizePerPage] = useState(5);
    const [checked, setChecked]=useState(false)
    const [clicked,setClicked]=useState(false)
    const [isLoading, setIsLoading] = useState(true);


    const navigate = useNavigate();
    

     const fetchData = async () => {
         try {
             const response = await apiservice.getUserData()
             console.log(response)
             setFilteredData(response);
         } catch (error) {
             console.error(error);
        } finally{
            setIsLoading(false)
        }
        
     };
    

     useEffect(() => {
         fetchData();
     }, []);

    const handleSortClick = (fieldName) => {
        if (fieldName === 'email') {
            setIsUserAscending(!isUserAscending);
            sortData(fieldName);
        }
    }
    const showingPerPageEntries = (from, to, size) => (
        <div className="d-inline pagination-text">
            <span>Showing</span>
            <span className="react-bootstrap-table-pagination-total mx-2">
                <b>{from}</b> - <b>{to}</b> of {size} entries
            </span>
        </div>
    );
    const onPageSizeChange = (itemsPage) => {
        setGroupsListData(itemsPage);
    };
    const handleFilterChange = (fieldName, value, checked) => {
      setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          if (fieldName === "selectAll") {
              setSelectAll(checked);
              updatedFilters.email = checked ? filteredData.map((item) => item.email) : [];
            } 
          else {
              const filterValues = updatedFilters[fieldName] || [];
              if (checked) {
                  updatedFilters[fieldName] = [...filterValues, value];
              } else {
                  updatedFilters[fieldName] = filterValues.filter((val) => val !== value);
              }
          }
          if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.first_name = checked ? filteredData.map((item) => item.first_name) : [];
        } 
        else {
            const filterValues = updatedFilters[fieldName] || [];
            if (checked) {
                updatedFilters[fieldName] = [...filterValues, value];
            } else {
                updatedFilters[fieldName] = filterValues.filter((val) => val !== value);
            }
        }
        if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.tenantname = checked ? filteredData.map((item) => item.tenantname) : [];
        } 
        else {
            const filterValues = updatedFilters[fieldName] || [];
            if (checked) {
                updatedFilters[fieldName] = [...filterValues, value];
            } else {
                updatedFilters[fieldName] = filterValues.filter((val) => val !== value);
            }
        }
        if (fieldName === "selectAll") {
            setSelectAll(checked);
            updatedFilters.role = checked ? filteredData.map((item) => item.role) : [];
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
         else if (fieldName === 'first_name') {
             if (filters.first_name && filters.first_name.length > 0) {
                 return filters.first_name.includes(item.first_name);
            }
         }else  if (fieldName === 'last_name') {
            if (filters.last_name && filters.last_name.length > 0) {
                return filters.last_name.includes(item.last_name);
           }
        }else  if (fieldName === 'tenantname') {
            if (filters.tenantname && filters.tenantname.length > 0) {
                return filters.tenantname.includes(item.tenantname);
           }
        }else if (fieldName === 'role') {
            if (filters.role && filters.role.length > 0) {
                return filters.role.includes(item.role);
           }
        }
      
    
        return true;
    });
    setFilteredData(filteredData1);
    setShowFilterList(false);
  
};
// const handleResetFilters = (fieldName) => {
//     setFilters((prevFilters) => {
//         const updatedFilters = { ...prevFilters };
//         updatedFilters[fieldName] = [];
//         return updatedFilters;
//     });
//     setShowFilterList(false);
//     setFilteredData(groupsListData);
//     setSearchTerm('');
// };

    
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
          setShowFilterList2(false)
          setShowFilterList3(false)
          setShowFilterList4(false)
          setShowFilterList5(false)
      }
      
  
    if (fieldName === 'first_name') {
        setShowFilterList2(!showFilterList2);
        setShowFilterList3(false)
        setShowFilterList4(false)
        setShowFilterList5(false)
        setShowFilterList(false)
    }
    


    if (fieldName === 'last_name') {
        setShowFilterList3(!showFilterList3);
        setShowFilterList4(false)
        setShowFilterList5(false)
        setShowFilterList(false)
        setShowFilterList2(false)
 
    }
    
;

    if (fieldName === 'tenantname') {
        setShowFilterList4(!showFilterList4);
        setShowFilterList5(false)
        setShowFilterList(false)
        setShowFilterList2(false)
        setShowFilterList3(false)
    }
    

    if (fieldName === 'role') {
        setShowFilterList5(!showFilterList5);
        setShowFilterList(false)
        setShowFilterList2(false)
        setShowFilterList3(false)
        setShowFilterList4(false)
    }
    
};
// const handleButtonClick=()=>{
//     setClicked(!clicked)
// }
const handleApplyReset=()=>{

//if(fieldName="email"){
    fetchData()
    setShowFilterList(!showFilterList)
// }else if(fieldName="first_name"){
//     fetchData()
//     setShowFilterList2(!showFilterList2)
// }else if(fieldName="last_name"){
//     fetchData()
//     setShowFilterList3(!showFilterList3)
// }else if(fieldName="tenantname"){
//     fetchData()
//     setShowFilterList4(!showFilterList4)

// }else if(fieldName="role"){
//     fetchData()      
// setShowFilterList5(!showFilterList5)
// }
    }

 const handleApplyReset2=()=>{
     fetchData()
     setShowFilterList2(!showFilterList2)
     }
     const handleApplyReset3=()=>{
         fetchData()
         setShowFilterList3(!showFilterList3)
         }
         const handleApplyReset4=()=>{
             fetchData()
             setShowFilterList4(!showFilterList4)
             }
        
             const handleApplyReset5=()=>{
                 fetchData()
                
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
                            <div className="apply-button2">
                                {/* <button onClick={() => handleApplyFilters('email')}>Apply</button>
                             */}
                                <button onClick={()=>handleApplyReset()}>Reset</button>
                                <button onClick={() => handleApplyFilters('email')}>Apply</button>
 
                            </div>
                        </div>
                    )}</div>
            )
            }
            
    ,
    {
      dataField: "first_name",
      text: "first_name",
      headerFormatter: () => (
        <div>
            <span className=" ">first_name</span>
            <span className=" ms-2" onClick={() => handleFilterClick('first_name')}>
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
                                    onChange={(e) => handleFilterChange("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.first_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.first_name &&
                                                    filters.first_name.includes(item.first_name)
                                                }
                                                 onChange={(e) => handleFilterChange("first_name", item.first_name, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.first_name}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button2">
                                {/* <button onClick={() => handleApplyFilters('first_name')}>Apply</button> */}
                                <button onClick={()=>handleApplyReset2()}>Reset</button>
                                <button onClick={() => handleApplyFilters('first_name')}>Apply</button>
                            </div>
                        </div>
                    )}</div>)
    },
    {
      dataField: "last_name",
      text: "last_name",
      headerFormatter: () => (
        <div>
            <span className="  ">last_name</span>
            
            <span className=" ms-2" onClick={() => handleFilterClick('last_name')}>
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
                                    onChange={(e) => handleFilterChange("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.last_name &&
                                                    filters.last_name.includes(item.last_name)
                                                }
                                                 onChange={(e) => handleFilterChange("last_name", item.last_name, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.last_name}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button2">
                                {/* <button onClick={() => handleApplyFilters('last_name')}>Apply</button> */}
                                <button onClick={()=>handleApplyReset3()}>Reset</button>
                                <button onClick={() => handleApplyFilters('last_name')}>Apply</button>
                            </div>
                        </div>
                    )}</div>)
    
    
    },
    {
      dataField: "tenantname",
      text: "tenantname",
      headerFormatter: () => (
        <div>
            <span className="  ">tenantname</span>
            
            <span className=" ms-2" onClick={() => handleFilterClick('tenantname')}>
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
                                    onChange={(e) => handleFilterChange("selectAll", null, e.target.checked)}
                                     />
                                <label htmlFor="select-all" className="selectAll">Select All</label>
                            </div>
                            <div className="filter-scroll">
                                {filteredData
                                    .filter((item) => item.tenantname.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <div key={item.id} className="filter-item">
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                checked={
                                                    filters.tenantname &&
                                                    filters.tenantname.includes(item.tenantname)
                                                }
                                                 onChange={(e) => handleFilterChange("tenantname", item.tenantname, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.tenantname}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button2">
                                {/* <button onClick={() => handleApplyFilters('tenantname')}>Apply</button> */}
                                <button onClick={()=>handleApplyReset4()}>Reset</button>
                                <button onClick={() => handleApplyFilters('tenantname')}>Apply</button>
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
            
            <span className=" ms-2" onClick={() => handleFilterClick('role')}>
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
                                    onChange={(e) => handleFilterChange("selectAll", null, e.target.checked)}
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
                                                 onChange={(e) => handleFilterChange("role", item.role, e.target.checked)}
                                            />
                                            <label htmlFor={item.id}>{item.role}</label>
                                        </div>
                                    ))}
                            </div>
                            <div className="apply-button2">
                                {/* <button className="app" onClick={() => handleApplyFilters('role')}>Apply</button> */}
                                <button className="Res" onClick={()=>handleApplyReset5()}>Reset</button>
                                <button className="app" onClick={() => handleApplyFilters('role')}>Apply</button>
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
    <div className="container">
      <div className="row">
        <div className="col usermgt">
          <h4 className="usermanagement">User Management</h4>
          <button className="add-username" onClick={()=>navigate('/createuser')}><Link className='addtenant' to='addTenant'>Add User</Link></button>
        </div>
      </div>
      <div className="row">
        <div className="col user-page-bg">
        {isLoading ? (
                        <div className="loader-wrapper my-5">
                            <div className="align-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        </div>
                    ) :
         ( <BootstrapTable
            keyField="data.tenantnameID"
            columns={columns}
            data={filteredData}
            pagination={paginationFactory(options)}
          />)}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
