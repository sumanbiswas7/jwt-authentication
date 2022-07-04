interface User {
    email: String
    password: String
}
const users: User[] = [
    {
        "email": "suman@gmail.com",
        "password": "$2b$05$IoT9eamKn9wB1FP/XtZr4uKwL2V8ZvPjm57CRqHkJYOjKSEn9AhK6"
    },
    {
        "email": "mohamed@gmail.com",
        "password": "$4f$05$ZdaTyHh0X1My777NklucbehqqHlmXvWNF7tKR8zk7x4jj7JjfQlG4"
    },
    {
        "email": "rahul@gmail.com",
        "password": "$8b$05$ZdaTyHh0X1My777NklucbehqqHlmXvWNF7tKR8zk7x4jj7JjfQlTm"
    }
]

export { User }
module.exports = { users }