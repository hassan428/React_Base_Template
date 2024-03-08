
import { InputAdornment, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Input_field } from '../component/Input_field'
import { Btn } from '../component/Btn'
import { TbPasswordUser } from "react-icons/tb";
import { MdDateRange, MdMarkEmailUnread } from "react-icons/md";
import { SiNamecheap } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserDetails, loginSuccess } from '../store/slices/userLoggedSlice';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from '../config/firebaseConfig';
import { FcGoogle } from "react-icons/fc";
import { sendData } from '../component/firebaseMethod';



export const SignUp = () => {
    const [signUp, setSignUp] = useState({})
    const [errMsg, setErrMsg] = useState("")
    const dispatch = useDispatch();
    // const navigate = useNavigate()

    // handle input fields
    const input_value = (value, id) => {
        setSignUp({ ...signUp, [id]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault()
        if (signUp.password == signUp.confirmPassword) {

            createUserWithEmailAndPassword(auth, signUp.email, signUp.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user.uid);
                    dispatch(getUserDetails(signUp));
                    sendData({ ...signUp }, user.uid)

                    // dispatch(loginSuccess(true))
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    // console.log(errorCode)
                    const errorMessage = error.message;

                    switch (errorCode) {
                        case 'auth/email-already-in-use':
                            setErrMsg('Email already in use')
                            break;
                        case 'auth/weak-password':
                            setErrMsg('Password should be at least 6 characters')
                            break;
                        default:
                            setErrMsg('Error:', errorMessage)
                            break;
                    }

                    // ..
                });

        } else {
            Swal.fire({
                icon: "error",
                iconColor: "red",
                title: "Oops...",
                text: "Your password does not match! Please check your confirmation password.",
                confirmButtonColor: "rgb(22 163 74)", //  btn color
                background: "rgb(134 239 172)",  // navbar color
                color: "black",
            });
        }
    };


    const SignUpGoole = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user.uid);
                const data = { email: user.email, username: user.displayName }
                dispatch(getUserDetails(data));
                sendData({ ...data }, user.uid)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // setErrMsg(errorMessage)
                // console.log(errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                switch (errorCode) {
                    case 'auth/popup-closed-by-user':
                        setErrMsg('Popup closed by user');
                        break;
                    case 'auth/cancelled-popup-request':
                        setErrMsg('Popup request cancelled');
                        break;
                    case 'auth/popup-blocked':
                        setErrMsg('Popup blocked by browser');
                        break;
                    default:
                        setErrMsg(errorMessage);
                        break;
                }


                // ...
            });


    }





    return (
        <>
            <div className="min-h-screen flex justify-center items-center ">

                <Paper elevation={24} square sx={{
                    // width: "60%",
                    height: "100%",
                    bgcolor: "rgb(220 252 231)",
                    borderRadius: 5,
                    m: "10px",
                    border: "5px solid black",
                    // "@media(max-width: 500px)": {
                    //     border: "5px solid black",

                    // },
                    // fontSize: "x-large",

                }}>

                    <Typography variant='h4'
                        sx={{
                            "@media(max-width: 500px)": {
                                fontSize: "xx-large",
                            },
                            fontSize: "50px",
                            borderBottom: "5px solid black",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            p: 1,
                            textAlign: "center",
                            fontWeight: "bold",
                            bgcolor: "rgb(134 239 172)",
                        }} >
                        Sign UP
                    </Typography>

                    <form onSubmit={onSubmit} className='p-2'>
                        {/* First & Last Name */}
                        <div className="flex items-center ">
                            <Input_field
                                placeholder="First Name"
                                id="firstName"
                                input_value={input_value}
                                classname="mx-2"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SiNamecheap className='text-lg' />
                                    </InputAdornment>}
                            />
                            <Input_field
                                placeholder="Last Name"
                                id="lasttName"
                                input_value={input_value}
                                classname="mx-2"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SiNamecheap className='text-lg' />
                                    </InputAdornment>}
                            />
                        </div>
                        <Input_field

                            placeholder="Username"
                            id="username"
                            input_value={input_value}
                            classname="mx-2"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SiNamecheap className='text-lg' />
                                </InputAdornment>}
                        />

                        {/* Date of Birth */}
                        <Input_field
                            type="date"
                            placeholder="Date of Birth"
                            id="birthDate"
                            input_value={input_value}
                            classname="mx-2 my-1"
                            startAdornment={
                                <InputAdornment position="start">
                                    <MdDateRange className='text-lg' />
                                </InputAdornment>}
                        />

                        {/* Email*/}
                        <Input_field
                            type="email"
                            placeholder="Enter Email"
                            id="email"
                            input_value={input_value}
                            classname="mx-2 my-1"
                            startAdornment={
                                <InputAdornment position="start">
                                    <MdMarkEmailUnread className='text-lg' />
                                </InputAdornment>}
                        />

                        {/* Password */}
                        <Input_field
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            input_value={input_value}
                            classname="mx-2 my-1"
                            startAdornment={
                                <InputAdornment position="start">
                                    <TbPasswordUser className='text-lg' />
                                </InputAdornment>}
                        />

                        {/* Confirm Password */}
                        <Input_field
                            type="password"
                            placeholder="Enter  Confirm Password"
                            id="confirmPassword"
                            input_value={input_value}
                            classname="mx-2"
                            startAdornment={
                                <InputAdornment position="start">
                                    <TbPasswordUser className='text-lg' />
                                </InputAdornment>}
                        />

                        {/* error Message */}
                        <Typography variant='p'
                            sx={{
                                fontSize: "small",
                                mb: 10,
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "red",
                            }} >
                            {errMsg}
                        </Typography>



                        {/* Google */}
                        <div className='text-center'>
                            <Btn
                                tooltip_text="Google"
                                onclick={SignUpGoole}
                                startIcon={<FcGoogle />}
                                text="Sign Up with Google"
                                sx={{
                                    bgcolor: "rgb(134 239 172)",
                                    width: "100%",
                                    mx: 0,
                                    my: 1,
                                    p: 0,
                                    fontSize: "large",
                                    textTransform: "capitalize",
                                    "@media(max-width: 500px)": {
                                        mx: 0,
                                    },
                                    fontWeight: "bold",
                                    borderBottomRightRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    border: "2px solid black",
                                }}

                            />
                        </div>





                        {/* Already have an accounts */}
                        <div className='text-center mb-1'>
                            <Typography variant='p'
                                sx={{
                                    mb: 10,
                                    fontSize: "medium",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }} >
                                Already have an account?
                                <Link to="/" style={{ color: "rgb(107 33 168)" }}> Login</Link>
                            </Typography>
                        </div>



                        {/* Sign Up Button */}
                        <Btn
                            tooltip_text="SignUP"
                            type="submit"
                            text="Sign UP"
                            sx={{
                                mx: 0,
                                "@media(max-width: 500px)": {
                                    mx: 0,
                                },
                                fontSize: "larger",
                                p: 0,
                                width: "100%",
                                fontWeight: "bold",
                                border: "2px solid black",
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                            }}

                        />

                    </form>

                </Paper>

            </div>
        </>
    )
}
