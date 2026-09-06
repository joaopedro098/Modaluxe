import {RegisterForm} from "@/components/ui/form-register"
export default function CadastroPage(){
    return(
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <RegisterForm />
            </div>
        </div>
    )}