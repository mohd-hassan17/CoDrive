"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";


type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName:
            formType === "sign-up"
                ? z.string().min(2).max(50)
                : z.string().optional(),
    });
};


const AuthForm = ({ type }: { type: FormType }) => {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState(null);


    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        setLoading(true);
        setErrorMessage("")
        try {

            const user = type === 'sign-up' ?
            await createAccount({ fullName: values.fullName || "", email: values.email })
            : await signInUser({email: values.email})
            
            setAccountId(user.accountId)
        } catch (error) {
            setErrorMessage("Failed to create account. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form flex items-center justify-center">
                    <h1 className="form-title ">
                        {type === "sign-in" ? "LogIn" : "Sign Up"}
                    </h1>
                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="shad-form-item w-[300px] lg:w-[370px]">
                                        <FormLabel className="shad-form-label pl-1 pb-1">Full Name</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter your full name"
                                                className="shad-input border"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>

                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item w-[300px] lg:w-[370px]">
                                    <FormLabel className="shad-form-label pl-1 pb-1">Email</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            className="shad-input border"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>

                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="form-submit-button w-[150px] lg:w-[200px] flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <Image
                                src="/assets/icons/loader.svg"
                                alt="Submitting…"      /* helps screen‑readers */
                                width={24}
                                height={24}
                                className="animate-spin"
                            />
                        ) : (
                            (type === "sign-up" ? "Sign Up" : "Sign In")
                        )}
                    </Button>

                    {errorMessage && <p className="error-message">*{errorMessage}</p>}

                    <div className="body-2 flex justify-center">
                        <p className="text-light-100">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="ml-1 font-medium text-brand"
                        >
                            {" "}
                            {type === "sign-in" ? "Sign Up" : "Login"}
                        </Link>
                    </div>
                </form>
            </Form>

            {/* OTP */}
            {accountId && <OTPModal email={form.getValues("email")} accountId={accountId} />}
        </>
    )
}


export default AuthForm;