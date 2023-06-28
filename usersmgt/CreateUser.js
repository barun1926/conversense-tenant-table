import React, { useEffect, useState } from 'react';
import './createuser.css'
import Swal from "sweetalert2";
import { FaAsterisk } from "react-icons/fa";
import { MdWest } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"; 
import InputTextField from '../../components/common/hook-form/InputBox';
import SelectField from '../../components/common/hook-form/Select';  
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../actions/tenantActionCreator';
import { encrypt } from '../../helpers/index';
import apiservice from '../../api/apiservices';
import $ from "jquery";

function CreateUser() {
      
  const addUserData = useSelector(state => state.getCreateTenant); 
  
  console.log('addUserData Redux', addUserData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { control,register, handleSubmit, reset, setValue, getValues } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur'});
     const [isFormValid, setIsFormValid] = useState(false);  
    const [tenantList, setTenantList] = useState([]); 
    const [selected, setSelected] = useState('');

    useEffect(()=>{
        getTenantList();
    },[]);

    const getTenantList = () => {
         apiservice.getTenant()
         .then((response) => {
            if(response.length !== 0){
                let tenantNameArr = [];
                 // eslint-disable-next-line array-callback-return
                 response.map((item) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.name;
                    tenantNameArr.push(obj);  
                })
                 
                setTenantList(tenantNameArr); 
            }
            else{
                console.log('error');
            }
         })
        }   

     const onSubmit = (data) => { 
        const createUserObj = {first_name : encrypt(data.firstName),
        last_name : encrypt(data.lastName), 
        email : encrypt(data.email),
        tenantname : data.tenantName,
        role : data.role
        }; 
        const createUserReduxObj = {
            first_name : data.firstName,
        last_name : data.lastName, 
        email : data.email,
        tenantname : data.tenantName,
        role : data.role
        }
           apiservice.createuser(createUserObj)
           .then((response) => {
             if(response.success){
                
                dispatch(addUser(createUserReduxObj));
                reset({});
                setSelected('')
                $('.css-1dimb5e-singleValue').html('Select...');
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
                    navigate('/usermgt');
             }
             else{ 
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-right",
                        iconColor: "white",
                        customClass: {
                            popup: "colored-red",
                        },
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                    });
                    Toast.fire({
                        icon: "error",
                        title: response.message,
                    }); 
                console.log('error')
             }
           
           })

       
    };
 
    const handleInputValueChange = (fieldName, value) => { 
        console.log('fieldName', fieldName, value);
        const alphanumericRegex = /^[a-zA-Z0-9\s]*$/; 
       
        if (fieldName === 'email' || value === "") {
            setValue(fieldName, value);
        }
        else if (fieldName === 'tenantName' || value === "") {
            setValue(fieldName, value);
        }
        else if (fieldName === 'role' || value === "") {
            setValue(fieldName, value);
        }  
        // eslint-disable-next-line no-mixed-operators
        else if (fieldName !== 'tenantName' && fieldName !== 'role' && fieldName !== 'email' && value.match(alphanumericRegex) || value === "") {
            setValue(fieldName, value);
        }     
        const formData = getValues();  
        const isAllFieldsValid =
            (formData.firstName !== "" && formData.firstName !== undefined)  && 
            (formData.lastName !== "" && formData.lastName !== undefined)  && 
            (formData.email !== "" && formData.email !== undefined)  && 
            (formData.tenantName !== "" && formData.tenantName !== undefined)  && 
            (formData.role !== "" && formData.role !== undefined);  
            setIsFormValid(isAllFieldsValid);
         };  
    const handleClear = () => { 
        setIsFormValid(false);
        reset({}); 
        setSelected(tenantList)
        $('.css-1dimb5e-singleValue').html('Select...');
         
    }; 

  const optionRoles = [{label : 'Admin', value : 'admin'}, {label : 'Editor', value : 'editor'}, {label : 'Viewer', value : 'viewer'}]
 
    return (
        <div>
            <div className="row">
                <div className="col tenantmgt">
                    <h4 className="">User Management</h4>
                    <button className="backto-tenant m-3" ><Link className='back-to-tenantlist' to='/usermgt'><MdWest className="mdwest" />Back to User List</Link></button>
                    </div>
            </div>
            <div className="container addtenant-bg mt-3">
                <div className="row mb-4">
                    <div className="col mt-3">
                        <div className="tenat-border create-user">Create User</div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row ">
                            <div className="col-6">
                                <label htmlFor="clientName" className="input-label">First name <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                control={control} 
                                 name="firstName"
                                 rules={{ required: 'First name is required' }} 
                                 onChanges={(e) => handleInputValueChange("firstName", e.target.value)}
                                 /> 
                                </div>
                            </div> 
                            <div className="col-6">
                                <label htmlFor="countofCode " className="input-label">Last Name <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                control={control} 
                                 name="lastName"
                                 rules={{ required: 'Last Name is required' }} 
                                 onChanges={(e) => handleInputValueChange("lastName", e.target.value)}
                                />
                                
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-6">
                                <label htmlFor="clientName" className="input-label">Email Address<FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                <InputTextField
                                    name="email"
                                    type="email"  
                                    meta={{ touched: false, error: "" }}
                                    control={control}
                                    rules={{
                                    required: "EmailId is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Valid EmailId is required",
                                    },
                                    }}
                        
                                    onChanges={(e) => handleInputValueChange("email", e.target.value)}
                      /> 
                                </div>
                            </div> 
                            <div className="col-6">
                                <label htmlFor="countofCode " className="input-label">Tenant Name <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                    <SelectField
                                      classNameStyle="selectboxradius" 
                                      control={control}  
                                      name="tenantName"
                                      presetValue={selected} 
                                      options={tenantList} 
                                      rules={{ required: 'Tenant Name is required' }}
                                      handleChange={(e) => {setSelected(e.value); handleInputValueChange("tenantName", e.value); }}
                                    > 
                                    </SelectField> 
                                
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                             <div className="col-6">
                                <label htmlFor="countofCode " className="input-label">Role <FaAsterisk className="asterisk" /> </label>
                                <div className="mb-3">
                                    <SelectField
                                      control={control}
                                      name="role"
                                      register={register}
                                      options={optionRoles} 
                                      rules={{ required: 'Role is required' }} 
                                      handleChange={(e) => handleInputValueChange("role", e.value)}
                                    > 
                                    </SelectField> 
                                
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
export default CreateUser;