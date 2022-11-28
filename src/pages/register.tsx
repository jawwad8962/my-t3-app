import Link from "next/link";
import {useForm} from "react-hook-form";
import { trpc } from '../utils/trpc';
import { CreateUserInput } from '../server/user.schema';
import { useRouter } from "next/router";

function RegisterPage(){
    const router = useRouter()
    const {handleSubmit, register} = useForm<CreateUserInput>()
    const {mutate, error} = trpc.users.registerUser.useMutation({
        onSuccess:() => {
            router.push('/login')
        }
    })

    function onSubmit(values: CreateUserInput){
        mutate(values)
    }

    return <>
    <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
    <form className=' flex items-center justify-center bg-black/75' onSubmit={handleSubmit(onSubmit)}>
     <div className='space-y-4 p-3 justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]' style={{padding:"100px"}}>
        {error && error.message}
        <h1 className="text-5xl font-extrabold text-center tracking-tight text-gray-300 sm:text-[5rem]">Register</h1>
        <input type="email" placeholder="example@example.com"
        className='w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50'
        {...register('email')}/>
        <input type="text" placeholder="Jon Doe"
        className='w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50'
        {...register('name')}/>
        <button type="submit" className='rounded-md bg-blue-400 p-2 text-sm text-gray-200 transition hover:bg-blue-500'>Register</button>
        <Link href='/login' className='rounded-md bg-blue-400 p-2 ml-3 text-gray-200 transition hover:bg-blue-500'>Login
        </Link>
        </div>
    </form>
    </div>
    </>
}

export default RegisterPage