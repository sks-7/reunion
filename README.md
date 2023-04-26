## Getting Started 


- to Start your machine You write `npm i ` to install all packages and all 



- And i also  ptovide ` this link:=https://ill-slacks-slug.cyclic.app/` ** it is deployed link** when you open this link you See `welcome to my website` this.

- Other than that use :- `http://localhost:8080` this for testing as well .


---

- first you have to to login use `/api/api/authenticate` then you got token then you have to set the token like this `Authorization - Bearer your token`


--- 

then you have to perform opration

- To follow the user use `/api/follow/:id` this end point you give the id of the user that you want to follow then you can see followings section that user id that you follow and in the followrs sections the user that following you. 


- To unfollow the user use `/api/unfollow/:id` this end point you give the `id` of the user that you want to unfollow that you found in the followings section , when ever you give the id then in the user is removings from the the user that is unfollow the folowing user and the in the followrs section is also deleted the id of that user who have unfoloowed the user.

- to get the user details and following and the followers details use `/api/user` this end points 

 ### Note :  YOU USE THIS END POINT WHEN YOU HAVE TO AUTHENTICATED USER USE `authenticateToken` IN BETWEEN THE END POINT LIKE THIS GETING THE USER `/api/user', authenticateToken, async (req, res)`;


 --- 

 # About post


 - To make the post use `/api/posts` this end point give ` title, description` in the body to make a post.


 - To delete a post `/api/delete/:id` this end point give the post id that you want to delete.


 - To Like the post `/api/like/:id` Again give the id of the post that you want to like.


 - To Unlike  the post `/api/unlike/:id` Again give the id of the post that you want to unlike.

 - To add a comment use `/api/comment/:id` You have to give the id of the post where you have to add comment.


  It will give you the comment id if new comment is added

  - To get the single post details  use `/api/posts/:id` this end point It will give you `"_id","comment","user":`, id id the comment id the in the user it will give you the user id so you can know that which use is commenting your post and the comment details .

  - To get the all post details use `/api/all_posts` this end point  it will give the whole post details which user is created with all the details. 


  this is things which I impliment .

  - # I Hope you like this #

 
