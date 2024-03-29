import {InputField, SelectField} from '../../components/InputFiled/InputField'
import RedirectToSignupOrLogin from '../../components/RedirectToSignupOrLogin/RedirectToSignupOrLogin'
import { RoleOptions } from '../../constants'
import './SignUpPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserRegisterForm } from '../../store/userRegister.slice'
import { useState } from 'react'
import {cloneDeep} from 'lodash'
import { registerApi } from '../../services/api'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userRegisterDetails = useSelector((state) => state.userRegisterForm.user);

    const [user, setUser] = useState(cloneDeep(userRegisterDetails))

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onRegister = async () => {
        dispatch(updateUserRegisterForm(user))

        try {
           const response = await registerApi(user) 
            toast.success(response.data)
            navigate('/login')
        } catch (error) {
            console.log('error in registerApi', error)
            toast.error(error.response.data)
            
        }
    };

    return(
        <div className='signup-page'>
            <h1 className='heading small-margin'>Sign Up</h1>
            <div className='input-fields-side-by-side'>
                <InputField className='side-medium-margin' name='' type='text' placeholder='Greek for Geeks' id='businessName' label='Business Name' onChange={onChange} />
                <SelectField className='side-medium-margin'  options={RoleOptions} label="Role" id='role' onChange={onChange} />
                <InputField className='side-medium-margin'  type='text' label='Username' id='username' placeholder='John Doe' onChange={onChange} />
                <InputField className='side-medium-margin'  type='email' label='Email' id='email' placeholder='john.doe@email.com' onChange={onChange} />
                <InputField className='side-medium-margin'  type='password' label="Password" id='password' placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' onChange={onChange} />
            </div>
            <button className='small-margin submit-button' onClick={onRegister}>Register</button>
            <RedirectToSignupOrLogin text="If already user," path='/login' redirectLinkText='login' />
        </div>
    )
}

export default SignUpPage