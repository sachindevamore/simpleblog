# home page
**************************************
url (GET)  : http://<ip>:3000/user/register
**************************************
# Register user
url (POST) : http://<ip>:3000/user/register,
body: { 
        "user":"sachin",
        "password":"sachin123",
        "email":"sachindevamore@gmail.com"
}
**************************************
# Login
url (POST) : http://<ip>:3000/user/login
req.body   : {
        "user":"sachin",
        "password":"sachin123",
        "email":"sachindevamore@gmail.com"
}
res.body :
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic2FjaGluIiwicGFzc3dvcmQiOiJzYWNoaW4xMjMiLCJlbWFpbCI6InNhY2hpbmRldmFtb3JlIiwiaWF0IjoxNjI5NjE2NzI1LCJleHAiOjE2Mjk2MjAzMjV9.l_g3EBnBw9lI2fzarMag1nLbIwW1J9tLtlOpanANY5o",
    "msg": "Successfully Logged In"
}
**************************************
# Get users
url (GET) : http://<ip>:3000/user/getusers?user=sachin
query : {
    user: sachin
}
res.body : {
        "user":"sachin",
        "password":"sachin123",
        "email":"sachindevamore@gmail.com"
}
***************************************
# Edit User
url (PUT) : http://<ip>:3000/user/edit?user=sachin1000&password=sachin123&email=dummygmail.com

***************************************
# Blog post
url (POST): http://<ip>:3000/blog/post
req.body  : {
    "postid":100,
    "title":"NODE JS",
    "post":"NODE js is interpreter for javascript"
}
***************************************
# Add Comment
url (POST): http://<ip>:3000/blog/addcomment
{
    "author" :"sachin", 
    "postid":"101", 
    "comment":"Good javascript"
}
***************************************
# Get post 
url (GET) : http://<ip>:3000/blog/get/post?postid=*&author=sachin
**note** : postid '*' to get all posts, value for postid to get perticular post.
res.body ;
{
    "100": {
        "title": "NODE JS",
        "post": "NODE js is interpreter for javascript"
    },
    "101": {
        "title": "JS",
        "post": "js is javascript"
    }
}
***************************************
# Get commens
url (GET) : http://<ip>:3000/blog/get/comments?author=sachin

res.body = [
    {
        "person": "sachin",
        "postno": "100",
        "comment": "Good Article"
    },
    {
        "person": "sachin",
        "postno": "101",
        "comment": "Good javascript"
    },
    {
        "person": "sachin",
        "postno": "101",
        "comment": "Good javascript"
    }
]