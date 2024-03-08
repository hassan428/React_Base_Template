import { InputAdornment, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Input_field } from '../component/Input_field'
import { Btn } from '../component/Btn'
import { TbPasswordUser } from "react-icons/tb";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/slices/userLoggedSlice';
import { SiNamecheap } from 'react-icons/si';
import { auth, provider } from '../config/firebaseConfig';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';






export const LogIn = () => {
    const store = useSelector((store) => store.logged.userDetails.username);
    const [logIn, setLogIn] = useState({})
    const [errMsg, setErrMsg] = useState("")
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // handle input fields

    const input_value = (value, id) => {
        setLogIn({ ...logIn, [id]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault()


        if (store === logIn.username) {
            signInWithEmailAndPassword(auth, logIn.email, logIn.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // console.log(errorMessage);

                    switch (errorCode) {
                        case 'auth/user-not-found':
                            setErrMsg('User not found');
                            break;
                        case 'auth/wrong-password':
                            setErrMsg('Incorrect password');
                            break;
                        default:
                            setErrMsg('Error:', errorMessage);
                            break;
                    }


                });
        } else {

            Swal.fire({
                icon: "error",
                iconColor: "red",
                title: "Oops...",
                text: "username is not correct! Please try again.",
                confirmButtonColor: "rgb(22 163 74)", //  btn color
                background: "rgb(134 239 172)",  // navbar color
                color: "black",
            });
        }
    };




    const LogINGoole = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // console.log(user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
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
                        Log IN
                    </Typography>

                    <form onSubmit={onSubmit} className='p-2'>


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
                                onclick={LogINGoole}
                                startIcon={<FcGoogle />}
                                text="Log in with Google"
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
                                Don't have an account?
                                <Link to="/signup" style={{ color: "rgb(107 33 168)" }}> SignUp</Link>
                            </Typography>
                        </div>


                        {/* Log in Button */}
                        <Btn
                            tooltip_text="Login"
                            type="submit"
                            text="Login"
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







    return (
        <>
            <div className="min-h-screen flex justify-center items-center">

                <Paper elevation={24} square sx={{
                    height: "100%",
                    bgcolor: "rgb(220 252 231)",
                    borderRadius: 5,
                    m: "10px",
                    border: "10px solid rgb(22 163 74)",
                    "@media(max-width: 500px)": {
                        border: "5px solid rgb(22 163 74)",
                    },
                    // fontSize: "x-large",

                }}>

                    <Typography variant='h4'
                        sx={{
                            "@media(max-width: 500px)": {
                                fontSize: "xx-large",
                            },
                            fontSize: "50px",
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            p: 1,
                            textAlign: "center",
                            fontWeight: "bold",
                            bgcolor: "rgb(22 163 74)",
                        }} >
                        Log IN
                    </Typography>

                    <form onSubmit={onSubmit} className='p-2'>


                        {/* User Name */}
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






                        <div className="sm:flex flex-row-reverse justify-between  mb-2">


                            <div className="text-right mb-2">
                                <Typography variant='p'
                                    sx={{
                                        fontSize: "small",
                                        mb: 10,
                                        textAlign: "center",
                                        // bgcolor: "rgb(107 33 168)",
                                        // color: "white"
                                    }} >
                                    Don't have an account?
                                    <Link to="/signup" style={{ color: "rgb(107 33 168)" }}> Signup</Link>
                                </Typography>
                            </div>


                            <div>

                                <Btn
                                    tooltip_text="Google"
                                    onclick={LogINGoole}
                                    text="Log In with Google"
                                    // text="Google"
                                    sx={{
                                        ml: 0,
                                        fontSize: "medium",
                                        textTransform: "capitalize",
                                        "@media(max-width: 500px)": {
                                            mx: 0.5,
                                        },
                                        fontWeight: "bold",
                                        borderBottomRightRadius: 5,
                                        borderBottomLeftRadius: 5,
                                    }}

                                />
                            </div>

                        </div>




                        <Btn
                            tooltip_text="Login"
                            type="submit"
                            text="Login"
                            sx={{
                                ml: 0,
                                "@media(max-width: 500px)": {
                                    mx: 0.5,
                                },
                                width: "100%",
                                fontWeight: "bold",
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




