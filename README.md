# home page
**************************************
url (GET)  : http://<ip>:3000/
**************************************
# Register user
* Registration of user takes
* @user @password @email 
* Middlerware @bodyValidate will validate the body.
* If user already exist throws the error

url (POST) : http://<ip>:3000/user/register,
body: { 
        "user":"sachin",
        "password":"sachin123",
        "email":"email@gmail.com"
}
**************************************
# Login
* Login taken @user @password @email and Verify in DB 
* the user is valid / Registered or not
* If Valid user generate jwt token and send to user

url (POST) : http://<ip>:3000/user/login;
req.body   : {
        "user":"sachin",
        "password":"sachin123",
        "email":"email@gmail.com"
}
res.body :
{
    "token": jwt-Token
    "msg": "Successfully Logged In"
}
**************************************
# Get users
* query @user if user not present send no user found
* else return the requested user.

url (GET) : http://<ip>:3000/user/getusers?user=sachin
query : {
    user: sachin
}
res.body : {
        "user":"sachin",
        "password":"sachin123",
        "email":"email@gmail.com"
}
***************************************
# Edit User
url (PUT) : http://<ip>:3000/user/edit?user=sachin1000&password=sachin123&email=dummygmail.com

***************************************
# Blog post
* For adding post 3 parameters mandotory 
* @post -Actual content of post,
* @titile -Titile of the post,
* @postid -Every post will be having postid, to uniquely identifying.

url (POST): http://<ip>:3000/blog/post
req.body  : {
    "postid":100,
    "title":"NODE JS",
    "post":"NODE js is interpreter for javascript"
}
***************************************
# Add Comment
    
* User needs to provide @param in req body.
* @author - Specify the author of the post
* @postid - Specify the post.
* @comment - Comment for the post
     
url (POST): http://<ip>:3000/blog/addcomment
{
    "author" :"sachin", 
    "postid":"101", 
    "comment":"Good javascript"
}
***************************************
# Get post 
* @author and @postid in query got read the post 
* if @postid == (*) return all the posts.
* pending --> Verify the author and postid present or not 

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
* User need to provide @author 
* in query to get the comments for his all posts.

url (GET) : http://<ip>:3000/blog/get/comments?author=sachin;

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

