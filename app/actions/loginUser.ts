'use server'
export async function handleLogin(formData: FormData) {
    const { email, password } = Object.fromEntries(formData)

}