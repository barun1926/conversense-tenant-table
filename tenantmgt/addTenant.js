import React, { useEffect, useState } from 'react';
import './addTenant.css'
import Swal from "sweetalert2";
import { FaAsterisk } from "react-icons/fa";
import { MdWest } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"; 
import InputTextField from '../../components/common/hook-form/InputBox'; 
import { useDispatch, useSelector } from 'react-redux';
import { addTenant } from '../../actions/tenantActionCreator';
import apiservice from '../../api/apiservices';

function AddTenant() {
     
  const addTenantData = useSelector(state => state.getCreateTenant); 
    const dispatch = useDispatch();

    const { control, register, handleSubmit, reset,  formState: { isValid, errors }, setValue, getValues } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur'});
    const [isTenantNameFilled, setIsTenantNameFilled] = useState(false);
    const [isAboutFilled, setIsAboutFilled] = useState(false); 
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false); 
    const [tableData, setTableData] = useState([]); 

     const onSubmit = (data) => { 
           dispatch(addTenant(data));
           apiservice.addTenant(data)
           .then((response) => {
             if(response.success){
                reset({});
                if (isTenantNameFilled && isAboutFilled) {
                    setIsFormValid(false);
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
             }
             else{
                console.log('error')
             }
           
           })

       
    };
 
    const handleInputValueChange = (fieldName, value) => { 
        const alphanumericRegex = /^[a-zA-Z0-9\s]*$/; 
        if (fieldName !== 'applicationname' && value.match(alphanumericRegex) || value === "") {
            setValue(fieldName, value);
        }  
        if (fieldName === "tenantName") {
            setIsTenantNameFilled(value !== "");
        } 
        else if (fieldName === "about") {
            setIsAboutFilled(value !== "");
        }   
        setIsFormSubmitted(false);
        const formData = getValues(); 
        const isAllFieldsValid =
            (formData.tenantName !== "" && formData.tenantName !== undefined)  && 
            (formData.about !== "" && formData.about !== undefined);  
            setIsFormValid(isAllFieldsValid);
         };
         
    const handleClear = () => { 
        setIsFormValid(false);
        reset({});
        setIsTenantNameFilled(false);
        setIsAboutFilled(false); 
    };
     

    useEffect(()=> {
       setTableData(apiData);
    },[]);

    const apiData = [
        {
            id: 1,
            api_name: 'Best Agent Suggest',
            api_description: 'Before routing a call to an agent, this API will be called yto get suggestion or to decide which agent matches the best for that perticular customer from the available agent list provided',
            application_name: [
                {value: 'app2', label: 'App2'}, 
                {value: 'app1', label: 'App1'}],
            validity : [{from : '05/19/2023', to : '05/19/2023'}, {from : '05/19/2023', to : '05/19/2023'}]
        },
        {
            id: 2,
            api_name: 'Profanity Check API',
            api_description: 'Profanity Check API will check the profanity of the chat from the end user',
            application_name: [
                {value: 'app2', label: 'App2'}],
            validity : [{from : '05/19/2023', to : '05/19/2023'}]
        },
        {
            id: 3,
            api_name: 'Same Agent Routing',
            api_description: 'Provided same agent suggestion, when skill set matches',
            application_name: [
                {value: 'app3', label: 'App3'}],
            validity : [{from : '05/19/2023', to : '05/19/2023'}]
        },
        {
            id: 4,
            api_name: 'CSAT-Insights',
            api_description: 'To find if a customer is satisfied for a perticular session by using CSAT store, user sentimate store and profane store',
            application_name: [
                {value: 'app4', label: 'App4'}],
            validity : [{from : '05/19/2023', to : '05/19/2023'}]
        },
        {
            id: 5,
            api_name: 'First Call Resolution-FCR',
            api_description: 'To improve the over all contact centre performance it is mandatory to focus on customer experience, First call resolution will give more understanding on the call resolution, Based on that over all performance can be improved ',
            application_name: [
                {value: 'app5', label: 'App5'}],
            validity : [{from : '05/19/2023', to : '05/19/2023'}]
        } 
    ]
      
    return (
        <div>
            <div className="row">
                <div className="col tenantmgt">
                    <h4 className="">Tenant Management</h4>
                    <button className="backto-tenant m-3" ><Link className='back-to-tenantlist' to='/tenantmgt'><MdWest className="mdwest" />Back to Tenant List</Link></button>
                    </div>
            </div>
            <div className="container addtenant-bg mt-3">
                <div className="row mb-4">
                    <div className="col mt-3">
                        <div className="tenat-border">CREATE TENANT</div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-5">
                                <label htmlFor="clientName" className="input-label">Tenant name <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                control={control} 
                                 name="tenantName"
                                 rules={{ required: 'Tenant name is required' }}
                                 label="Tenant name"
                                 onChanges={(e) => handleInputValueChange("tenantName", e.target.value)}
                                 /> 
                                </div>
                            </div> 
                            <div className="col-7">
                                <label htmlFor="countofCode " className="input-label">About <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                control={control} 
                                 name="about"
                                 rules={{ required: 'About is required' }}
                                 label="About"
                                 onChanges={(e) => handleInputValueChange("about", e.target.value)}
                                />
                                
                                </div>
                            </div>
                        </div>
                        <div className="row ">  
                                <div className="col d-flex add-btn-tenant">
                                    <button
                                        type="submit"
                                        className={`btn-save ${isFormValid ? 'enabled' : ''}`}
                                        disabled={!isFormValid}
                                     >
                                        Create
                                        </button>
                                        <button className="btn-clear" onClick={handleClear}>
                                            Clear
                                        </button>
                                </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default AddTenant;