import React, { useEffect, useState } from 'react';
import '../subscriptionmanagement/subscriptionmanagement.css'
import Swal from "sweetalert2";
import { FaAsterisk } from "react-icons/fa";
import { MdWest } from "react-icons/md";
import { Link, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"; 
import Table from 'react-bootstrap/Table';
import InputTextField from '../../components/common/hook-form/InputBox'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import CheckBox from '../../components/common/hook-form/CheckBox';
import { useRef } from 'react';
import apiServices from '../../api/apiservices'; 
import moment from 'moment';  
import { addSubscriptionManagement } from '../../actions/tenantActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import Spinner from 'react-bootstrap/Spinner';

const ViewandEditTenant = () => {
    
    const getSubscriptionData = useSelector(state => state.getCreateTenant); 
    console.log('getSubscriptionData', getSubscriptionData);
    const dispatch = useDispatch();
    
    const { control, register, handleSubmit, reset,  formState: { isValid, errors }, setValue, getValues } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur'});
    const [isTenantNameFilled, setIsTenantNameFilled] = useState(false);
    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [isApplicationNameFilled, setIsApplicationNameFilled] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);  
    const [dateRange, setDateRange] = useState('');
    const [checkBoxValue, setCheckBoxValue] = useState([]);
    const [isAboutFilled, setIsAboutFilled] = useState(false);
    const [isValidFilled, setIsValidityFilled] = useState(false);
    const [apiSecData, setApiSecData] = useState([]);
    const [tenantData, setTenantData] = useState([]);
    const [disable, setDisable] = useState(true);
    const [loader, setLoader] = useState(false);

    const params = useParams();
   console.log('params', params);
    
    const ref = useRef([]);

    useEffect(() => {
        getTenantDetails();
         
    }, []);

    const getTenantDetails = () => {
        setLoader(true);
        apiServices.viewAndEditTenant(params.tenantId)
        .then((response) => {
            console.log('response tenant', response);
           if(response?.subscriptionDetails){
               setTenantData(response.subscriptionDetails)
               setLoader(false);
           console.log("response", response);
           } 
           else{
               console.log('error');
           }
        })
    }

    const onSubmit = (data) => { 
        const splitDateRange = dateRange?.split('-');
        const fromDate = moment(splitDateRange[0]);
        const toDate = moment(splitDateRange[1]); 
        const dateValidity = [{from : fromDate.format('DD/MM/YYYY'), to : toDate.format('DD/MM/YYYY')}]
       
         const subscriptionObj = {tenantname : data.tenantname, about : data.about, label : data.applicationname, validity : dateValidity, apiSection : checkBoxValue} ;
         dispatch(addSubscriptionManagement(subscriptionObj))
         apiServices.addSubscription(subscriptionObj)
        .then((response) => {
            if(response.success){
           
                reset({}, {keepValues: false});
                setDateRange('');
                setCheckBoxValue('');
                for (let i = 0; i < ref.current.length; i++) {

                    ref.current[i].checked = false;
                }
                setIsTenantNameFilled(false);
                setIsEmailFilled(false);
                setIsApplicationNameFilled(false);
 
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-right",
                        iconColor: "white",
                        customClass: {
                            popup: "colored",
                        },
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "success",
                        title: response.message,
                    });
                    setIsFormSubmitted(true);
                } 
            else{
                console.log('error subscription');
            }
        });
    };

    const handleInputValueChange = (fieldName, value) => {
         const alphanumericRegex = /^[a-zA-Z0-9\s]*$/; 
        if (value.match(alphanumericRegex) || value === "") {
            setValue(fieldName, value);
        }
        if (fieldName === "tenantname") {
            setIsTenantNameFilled(value !== "");
        } 
        else if (fieldName === "about") {
            setIsAboutFilled(value !== "");
        } 
        else if (fieldName === "applicationname") {
            setIsApplicationNameFilled(value !== "");
        }
        else if (fieldName === "validity") {
            setIsValidityFilled(value !== "");
        } 
         setIsFormSubmitted(false); 
         };
         
    const handleClear = () => { 
        reset({}, {keepValues: false});
        setDateRange('');
        setCheckBoxValue('');
        for (let i = 0; i < ref.current.length; i++) {

            ref.current[i].checked = false;
        }
        setIsTenantNameFilled(false);
        setIsEmailFilled(false);
        setIsApplicationNameFilled(false);
    };
    
    const handleSearch = (searchedVal) => {  
        const filteredRows = apiSecData.filter((data) => {
            return data.api_name.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
         if (searchedVal.length <= 0) { 
            // getSubscription();
            // setApiSecData(apiSecData)
        }
        else {
            setApiSecData(filteredRows)
        }
    }

    const handleApply = (event, picker) => {
               picker.element.val(
                 picker.startDate.format('DD/MMMM/YYYY') +
                   ' - ' +
                   picker.endDate.format('DD/MMMM/YYYY')
               );
               setDateRange(picker.startDate.format('DD/MMMM/YYYY') +
               ' - ' +
               picker.endDate.format('DD/MMMM/YYYY'))
             };
 
     useEffect(() => {
        const formData = getValues();
         const isAllFieldsValid =
            formData.tenantname !== "" && formData.tenantname !== undefined &&
            (formData.applicationname !== undefined && formData.applicationname !== "" ) &&
            (formData.about !== "" && formData.about !== undefined) && checkBoxValue.length !== 0 && dateRange !== '';
             setIsFormValid(isAllFieldsValid);
         
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[dateRange, checkBoxValue]);

    const handleCancel = (event, picker) => {
               picker.element.val('');
               setDateRange('');
     };
 
 
    return (
        <div>
            <div className="row">
                <div className="col tenantmgt">
                    <h4 className="">Tenant Management</h4>
                    <button className="backto-tenant m-3" ><Link className='back-to-tenantlist' to='/tenantmgt'><MdWest className="mdwest" />Back to Tenant List</Link></button>
                 </div>
            </div>
            <div className="container addtenant-bg mt-3">
                
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-4">
                    <div className="col mt-3">
                        <div className="tenat-border"><span>SUBSCRIPTION MANAGEMENT</span>
                        <button className="backto-tenant add-sub m-3" ><Link className='back-to-tenantlist' to='/subscriptionmgt'>Add Subscription</Link></button>
                        </div>
                        
                    </div> 
                    <div className='btn-section'>
                        <FontAwesomeIcon icon={faPencilAlt} className='me-3 tenant-edit syncIcon'/> 
                    </div>
                    {loader && 
                    <div className="align-center">
                    <Spinner animation="border" variant="primary" />
                    </div>
                    }
                     {tenantData && tenantData.map((item) => {
                        return(
                         <div className="row">
                            <div className="col-5">
                                <label htmlFor="clientName" className="input-label">Tenant name <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                control={control} 
                                fieldData={item.tenantname}
                                 name="tenantname"
                                 rules={{ required: 'Tenant name is required' }}
                                 label="Tenant name"
                                 onChanges={(e) => handleInputValueChange("tenantname", e.target.value)}
                                 disabled={disable}
                                 />
                                     
                                </div>
                            </div> 
                            <div className="col-7">
                                <label htmlFor="countofCode " className="input-label">About <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                control={control} 
                                 name="about"
                                 fieldData={item.about}
                                 rules={{ required: 'About is required' }}
                                 label="About"
                                 disabled={disable}
                                 onChanges={(e) => handleInputValueChange("about", e.target.value)}
                                /> 
                                </div>
                            </div>
                        </div>
                        )
                    })}
                     </div>
                     <div className='row api-section mt-4 pb-4'>
                        <div className='col'>
                            <div className="table-header">
                            <h5>Subscription</h5>
                            <div className='search-api'> 
                                <input placeholder='search' onChange={(e)=>handleSearch(e.target.value)} type='text' className='search'/>
                            </div>
                            </div>
                            <Table responsive="md">
                            <thead>
                            <tr className='view-tenant-header'> 
                                <th>Application</th>
                                <th>Validity</th> 
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody className="edit-tenant-body"> 
                            {tenantData && tenantData.map((item) => {
                        return(
                            <> 
                             {item?.applicationValidity && 
                                <tr> 
                                    <td>{item.label}</td>
                                    <td>
                                    {item?.applicationValidity?.map((data) => {
                                        return(
                                        <div className="validity">{data.from} - {data.to} <FontAwesomeIcon
                                            icon={faCalendarAlt} className='me-2 syncIcon'
                                        /></div>
                                        )
                                    })
                                    }
                  </td> 
                                    <td><FontAwesomeIcon
                    icon={faPencilAlt} className='me-3 syncIcon'
                  /></td>
                                    <td><FontAwesomeIcon icon={faTrash} className='me-4 syncIcon'
                                    /></td>
                                </tr>   
                            }
                                  {!item?.applicationValidity && 
                                    <tr>
                                        <td></td>
                                         <td>No subscription found</td>
                                    </tr>
                                 }
                                 
                                </>
                        )})}
                                 
                            </tbody>
                        </Table>

                             
                        </div>
                    </div>
                    </form> 
            </div>
        </div>
    );
}
export default ViewandEditTenant;