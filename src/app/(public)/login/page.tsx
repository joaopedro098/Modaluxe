import {LoginForm} from "@/components/ui/form-sign-up"

export default function LoginPage(){
    return(
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 sm:text-[5rem]">
                    Login
                </h1>
                <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-md">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}