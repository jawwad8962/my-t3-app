import nodemailer from 'nodemailer'

export async function sendLoginEmail({email, url, token}:{
    email: string,
    url: string,
    token: string
}){
    const account = await nodemailer.createTestAccount()

    const transporte = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth:{
            user: account.user,
            pass: account.pass,
        }
    })

    const emailObj = await transporte.sendMail({
        from: '"Jawwad Ahmed" <jawwad@gmail.com>',
        to: email,
        subject: "Login OTP for your account",
        html: `Login by clicking this link <a href="${url}/login#token=${token}">HERE</a>`
    })

    console.log(`Preview URL : ${nodemailer.getTestMessageUrl(emailObj)}`);
    
}

export function encodeToken(data: string){
    return Buffer.from(data, 'utf-8').toString('base64')
}

export function decodeToken(data: string){
    return Buffer.from(data, 'base64').toString('utf-8')
}