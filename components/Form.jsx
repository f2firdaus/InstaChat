"use client";
import { EmailOutlined, Person, PersonOutline } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from 'next-auth/react'
const Form = ({ type }) => {
  const router=useRouter()

  const onSubmit = async (data) => {
    // const api = '/api/auth/register';
    if (type === "register") {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          router.push('/')
          toast.success('registered')
        }
        
      } catch (error) {
        toast.error('Something went wrong', error)
      }
    }
    if (type === 'login') {
      const response = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (response.ok) {
        router.push('/chats')
      }
      if (response.error) {
        toast.error("Invalid Password")
      }
    }
    
  };
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  return (
    <div className="auth">
      <div className="content">
        <Image src="/assets/logo.png" alt="logo" width={200} height={200} />
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
              <div className="input">
                <input
                  {...register('username', {
                    required: 'Username is required',
                    validate: (value) => {
                      if (value.length < 3) {
                        return 'username must be more than three characters'
                      }
                    },
                  })}
                  type="text"
                  name="username"
                  id=""
                
                  defaultValue=''
                  className="input-field"
                  placeholder="username"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}
          <div>
          <div className="input">
            <input
              {...register('email', {
                required: 'Email is required'
              })}
              type="email"
              placeholder="Email"
              name="email"
                className="input-field"
                defaultValue=''
          
            />
            <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
                <p className="text-red-500">{ errors.email.message}</p>
              )}
          </div>
          <div>
          <div className="input">
            <input
              {...register('password', {
                required: 'Password is required',
                validate: (value) => {
                  if (value.length < 5 && !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)) {
                    return 'password should be more than 5 characters and contain atleast  one special character'
                  }
                }
              })}
              defaultValue=''
              type="password"
              placeholder="Password"
              className="input-field"
              name="password"
              
            />
            <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
                <p className="text-red-500">{ errors.password.message}</p>
              )}
            </div>
          <button className="button" type="submit">
            {type === "register" ? "Join Free" : "Let's Chat"}
          </button>
        </form>
        {type === "register" ? (
          <Link href="/" className="link">
            <p className="text-center">
              Already have an account? Sign In Here{" "}
            </p>
          </Link>
        ) : (
          <Link href="/register" className="link">
            <p className="text-center">Don&#39;t Have An Account ? Sign Up Here</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;
