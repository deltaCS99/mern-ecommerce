import bcrpypt from 'bcryptjs'
const users = [
    {
        name:'Admin User',
        email:'admin@example.com',
        password: bcrpypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name:'Sbu',
        email:'sbu@example.com',
        password: bcrpypt.hashSync('123456', 10)
    },
    {
        name:'Amy',
        email:'amy@example.com',
        password: bcrpypt.hashSync('123456', 10)
    },
]

export default users