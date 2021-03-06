# README.md - CPS490 - Capstone I - Team 3

University of Dayton

Department of Computer Science

CPS 490 - Capstone I, Fall 2021

Instructor: Dr. Phu Phung


## Capstone I Project 


# The Messenger Application


# Team members

1.  Jon Moran, moranj13@udayton.edu
2.  John Conroy, conroyj4@udayton.edu
3.  Will Manzella, manzellaw2@udayton.edu
4.  James Oei, oeij01@udayton.edu


# Project Management Information

Management board (private access): <https://trello.com/b/lRZsXKxB/team-3-capstone-i-fall-2021>

Source code repository (private access): <https://bitbucket.org/cps490f21-team3/>


## Revision History

| Date     |   Version     |  Description |
|----------|:-------------:|-------------:|
|09/09/2021|  0.0          | Sprint0 Complete|
|10/05/2021|  1.0          | Sprint1 Complete|
|10/26/2021|  2.0          | Sprint2 Complete|
|12/02/2021|  3.0          | Sprint3 Complete|


# Overview

Our application is a web-based messenger application that will allow users to: 
1. Create an account
	1. Login to an account
2. Users can send:
	1. Private messages 
	2. Public messages
	3. Group messages 
3. Users can: 
	1. Add friends to their account's friends list and view their friends list.	
	3. Change their account information. 
	4. Change the display theme of the page (Darkmode/Lightmode).
	5. Clear the chatroom.
	6. View the current user list, as well as the user's current group chatrooms.

# System Analysis

![Architecture](https://i.ibb.co/XpDx0nR/boop-Architecture.png)

## User Requirements

- Users will login using a username and password which will give them access to their account
- Once loggined into their account users can send messages into private or public chats
- Users will be notified of the typing status of their recipients
- Users can delete messages
- Users can create groups/rooms of desired recipients


## Use cases


![Use-Case](https://i.ibb.co/F3fhtWc/use-case-capstone1-drawio.png)

User Create Account:
- When using the messenger application, the first page is the user login page. The user login page will consist of two text boxes and two buttons, one for username, one for password, a button to submit credentials, and a button to create a new user. If the credentials are accepted using the new user button, the user will be taken to the main messenger page. 

User Login:
- When using the messenger application, the first page is the user login page. The user login page will consist of two text boxes and a button, one for username, one for password, a button to submit credentials, and a button to create a new user. If the credentials are accepted using the login button, the user will be taken to the main messenger page.

User Private Message:
- When trying to send a private message, user will use the recipient text box to input a private users username. Once the recipients username is specified and the confirm recipient button is clicked, the user can then type out their message and send it using the send button.

Join/Create Group Message:
- When trying to join or create a group message, the user can input the group name into the join group chat 

Public/Private Group Message:
- User can set a group chat as public or private

User Group Message: 
- When trying to send a group message, will be able to communicate through text to that specific group

Show Password:
- When trying to login, a user can select a checkbox to show password

Toggle Darkmode/Lightmode:
- User can select a button to toggle between lightmode and darkmode for all UI


# System Design

![Interaction_Diagram](https://i.ibb.co/6PbsvBg/System-Design.png)

## Use-Case Realization

![Sprint-1 Use Cases](https://i.gyazo.com/573da3ee2c50598b6f2361bc9a55a686.png)

## Database

## User Interface

Login Page: 
- Contains a Login and Password text box with a JOIN button
- Contains a show password checkbox for showing password when signing in
- Contains a register user link

Register User Page:
- Contains a username and password textbox for registering a new user with a Join button

Chat Page: 

- Public Chat (user clicks on "PUBLIC" button):
	
	-Displays the option to add a friend
	
	-Displays online users
	
	-has a message box to type in & a SEND button
	
	-Displays when a user is typing
	
	-Has a CLEAR MESSAGES button for the user to clear the current info in their chat box


- Private Chat (user clicks on "PRIVATE" button):
	
	-Displays the option to add a friend
	
	-Displays online users
	
	-has a recipient box to type a username to send a message to
	
	-has a message box to type in & a SEND button (sends to recipient)
	
	-Displays when a user is typing
	
	-Has a CLEAR MESSAGES button for the user to clear the current info in their chat box
	
- Group Chat:
	-Displays the option to add a friend to a chat
	
	-Displays online users
	
	-Displays who is typing
	
	-Allows users to send messages to multiple individuals in a group chat
	
	-Has a CLEAR MESSAGES button

# Implementation

0. For each new sprint cycle, update the implementation of your system (break it down into subsections). It is helpful if you can include some code snippets to illustrate the implementation


SPRINT 1 IMPLEMENTATION:


Login (updated Sprint 2)

Backend: The ChatServer checks the login info and then compares it with information from messengerdb.js. It checks to see if the information is valid (exists in database); if it is valid it will allow the user to login --> if not then it notifies the user if there is an error. It also welcomes the user into the chat and logs records the username and password. Lastly it logs the username into the UserList array. 


![login](https://i.ibb.co/KxyPnz1/LOGIN.png)

![login2](https://i.ibb.co/S30WNnn/Data-Layer.png)

![login3](https://i.ibb.co/rpk0xdK/loginDB.png)



Frontend: Users are prompted to input their username and password and then it is sent to the server to verify. If successfully authenticated the login div is hidden and the landing page and add friend divs are shown.

![login_front1](https://i.ibb.co/W6YS9hF/loginfront2.png)
![login_front2](https://i.ibb.co/W6YS9hF/loginfront2.png)



Public Chat

Backend: The message is received from the front end and process by the backend. If the user is authenicated then the server returns the message notofyinbng all users who sent it.

![public](https://i.ibb.co/4pBtzgz/Screenshot-177.png)


Frontend: A text field promts the user for the desired message and is then sent back to the server. It is then recepted from the server and displayed to the public chat window.

![public_front](https://i.ibb.co/JcWJf74/Screenshot-181.png)



Private Chat

Backend: Traverses socketId and chekcs if the username matches the intended recipient. If it does then the message is sent to oonly that user. The message is sent to the chatServer and the the ChatServer sends it back letting the recipient know which user it came from. If the intended recipients is not a registered user than it notifies the user and no message is sent. 

![private](https://i.ibb.co/nfSRpGh/Screenshot-176.png)


Frontend: The front end has a text box to prompt the user for the recipients user name and another for the intended message. These two fields are sent to the chatServer and then a new message is recieved from the server and displayed to both users in the private chat.

![private_front](https://i.ibb.co/KVhB73L/Screenshot-182.png)



Add User as a Friend

Backend: the desired username is compared to the active user list and if it matches a username it adds that user as a friend and sends the message back to the index.html page. If a user is not found then it tells the frontend that it was a failure and to input a valid username.

![friend](https://i.ibb.co/71ttBwp/Screenshot-173.png)


Frontend: A text box appears in which a user types in the desired username of the user they want to add as a friend. Successfull or unsuccessful requests are communicated through public chat window

![friend_front](https://i.ibb.co/VHJcXvv/Screenshot-180.png)


Disconnected User

Backend: listens for an event in which the user closes that tab and notifies the user. It also searches the userlIst for the user and removes it from the array.

![friend](https://i.ibb.co/Rb0hvGm/Screenshot-172.png)



Clear Chat

Frontend

![clear](https://i.ibb.co/27z43SC/Screenshot-184.png)



SPRINT 2 IMPLEMENTATION:


Registration

Backend: If the username does not exist and is new, then the information (username and password) are inputted as new data into the database; as long as the information is a unique username (at least 5 characters long) and a password (at least 6 characters, contains an upper case letter, lower case letter, and number). If the username already exists then don't input duplicate data into the database.



![registerBack1](https://i.ibb.co/LvPzPxr/register-back-end1.png)

![registerBack2](https://i.ibb.co/2WkVM9X/register-back-end2.png)


Frontend: The user inputs a unique username (at least 5 characters long) and a password (at least 6 characters, contains an upper case letter, lower case letter, and number), they'll be forwarded to the login screen.

![registerFront1](https://i.ibb.co/0FKJ5TJ/register-front-end.png)



Logout

Frontend: The user hits the "Logout" button which then initiates the page to reset and disconnects them.

![logout](https://i.ibb.co/wzw8PMm/logout.png)



Unhide Password

Frontend: The user clicks on a checkbox that toggles the option to unhide or hide their password on their screen.

![UnhidePassword](https://i.gyazo.com/94aacc21863b93f0ed4f481507e7e816.png)



Dark Mode / Light Mode Option

Frontend: The user can click "Dark Mode" or "Light Mode" buttons to toggle the color scheme of the current displayed webpage. Light mode is the default scheme.

![DarkLight](https://i.gyazo.com/cc993075734a27b1985963c8b13cd46e.png)

![DarkLight](https://i.gyazo.com/8ae0f7285f9282ae990f9d0d22265483.png)

![DarkLight](https://i.gyazo.com/b9b41d75c487b86560569a2a981f7209.png)



Group Chat 

Frontend: Group Chat consists of 4 divs, a div for creating group chats and displaying debug information, a div for adding members to a group, a div for joining a group, and a div for the chatroom.

![groupHub](https://i.ibb.co/FKwqt7n/1-group-Hub.png)

The groupHub div has an input and button for creating groups, as well as a div for displaying server messages.


![addMemberToGroup](https://i.ibb.co/CMcJ5yc/2-add-Member-To-Group.png)

The addMemberToGroup div has 2 inputs and a button for adding a particular member to a particular group.


![joinGroup](https://i.ibb.co/QHM3Zhp/3-join-Group.png)

The joinGroup div has a chatList div which displays the group chats a user belongs to, and has an input and button to join a particular group chat, if they are a member.


![groupUI](https://i.ibb.co/MfpMnZ5/4-group-UI.png)

The groupUI div contains the actual group chatroom. It contains a chat input field as well as a send and clear chat button. Its functions include typing, disconnect, and chat notifications.



Backend: Group Chat uses 5 socketclient.on() functions, and 6 general functions. A group is an object with two variables: name & members[]. The server has a groupList[] variable to track the groups being created, and each socket has a groups[] and currentGroup variable to track which groups a user belongs to, and which group chat they are currently in.

![createGroup](https://i.ibb.co/P54m83R/1-create-Group.png)

Given a group name, calls the createGroupChat function, afterward a socket now is a member of the group, the group has been added to their groups[], and the group has been added to groupList[].


![addMember](https://i.ibb.co/Lx81rGZ/2-add-Member.png)

Given a groupName and memberName, the function checks whether both the member and group exists. If so, the desired group object is passed to the addToGroupChat function, along with the member's name.


![getGroupChats](https://i.ibb.co/dfBtwX4/3-get-Group-Chats.png)

This on() function emits a displayGroupChats() call to return a list of groups that a socket belongs to, to be displayed in the frontend. 


![isUserInGroup](https://i.ibb.co/x5hFQ3w/4-is-User-In-Group.png)

This on() function returns T/F whether the desired group exists, and if the user belongs to this group. If true, also sets desired group as a user's currentGroup.


![gChat](https://i.ibb.co/vLR1S8p/5-gChat.png)

This on() function is responsible for sending messages to each member in the group. It also makes sure to not send a message to someone in the group that has disconnected.


![createGroupChat](https://i.ibb.co/Sm5y1bk/1-create-Group-Chat.png)

This function checks whether the given group name already exists. If not, then a group object is created. The creator is immediately added to the group's members, and the group is added to the creator's groups[]. The group's name is also added to groupList[].


![addToGroupChat](https://i.ibb.co/TLp6SJM/2-add-To-Group-Chat.png)

This function checks if a member is already in a group. If not, the member is added to the group's members[], and the group object is added to the member's groups[]. The member will now see the group in their groupList, and the creator will be notified they added the member.


![addGroupToGroups](https://i.ibb.co/tQ1QvkW/3-add-Group-To-Groups.png)

This function checks whether a member is already in a group. If so, the group will be overwritten with the new members[] variable. If not, the group will be added onto the member's groups[]


![hasGroup](https://i.ibb.co/Vv84BqM/4-has-Group.png)

This function returns T/F whether a member is part of a group or not.


![overwriteGroup](https://i.ibb.co/M13vVjN/5-overwrite-Group.png)

This function finds the desired group in a member's groups[], and overwrites it with the updated version of that group.


![getMemberSocket](https://i.ibb.co/gzFFjBm/6-get-Member-Socket.png)

This function is given a socket username and returns its socket



Login Validation

Backend and Frontend: These functions were added into the index, ChatServer and messengerdb. These functions are called before transmitting the data to the next data layer. This ensures that a user has a valid login at every stage of the process.

![ValidationBackend1](https://i.ibb.co/PDDDjsr/Screenshot-222.png)


![storeLoadPublicChat](https://i.ibb.co/pKT5Pn3/1.png)

The storePublicChat method stores public chat messages in the database with their relevant data, such as receiver, timestamp, time, and the message. The loadChatHistory method loads public chat messages previously stored in the database into the html, displaying the time and chat message.


![storeLoadPrivateChat](https://i.ibb.co/Y3LnR6L/2.png)

The storePrivateChat method stores private chat messages in the database with their relevant data, such as receiver, timestamp, time, and the message. The loadPrivateChatHistory method loads private chat messages previously stored in the database into the html, displaying the time and chat message.


![storeLoadGroupChat](https://i.ibb.co/f9vsKvX/3.png)

The storeGroupChat method stores Group chat messages in the database with their relevant data, such groupName, timestamp, time, and the message. The loadGroupChatHistory method loads group chat messages previously stored in the database into the html, displaying the time and chat message.


![loadChatinChatServer](https://i.ibb.co/XVz1p7h/4.png)

This method calls the loadChatHistory method with a username, and returns the relevant chat history and emits to the index.html file.


![loadChatinIndex](https://i.ibb.co/F5qWH6R/5.png)

This is the code in the index.html file that is given the chat history and displays it in the html.


![XSSExample](https://i.ibb.co/WGcmrtw/6.png)

The 3rd line in this screenshot shows the XSS prevention code which has been inserted all over our code. Anywhere a textbox allows input, and this input enters our code, this XSSFilter is inserted at the beginning of this text???s journey.


![encryptCheckLogin](https://i.ibb.co/B6vCr1G/7.png)

The checkLogin method has been updated to verify that the username exists, then it returns true or false depending on if the encrypted password matches the plaintext password. 


![encryptRegistration](https://i.ibb.co/WzzVZSz/8.png)

When registering a new account, the new password is encrypted through hashing before being stored in the database.


![pipeline](https://i.ibb.co/42Vs06z/9.png)

This is the bitbucket-pipelines.yml file showing our successful implementation of Docker and the pipeline.



0. Specify the development approach of your team, including programming languages, database, development, testing, and deployment environments. 

This project is being created by all four members. Each member is assigned tasks from the trello board and work on the according to the Gantt Chart. The front end of the site is created using html5 with styling done in CSS. The backend is created using javaScript, more specifically Node.js for the server. All editing is done in Google Cloud Shell Editor. Code is shared with each other using bitbucket, utilizing git commands to push and pull code. The site is deployed through heroku for free.

## Deployment

We deployed out application via Heroku. Heroku allows us to have our web application actively running.

# Software Process Management

Jon Moran will serve as scrum manager this sprint. All use cases and tasks are on a trello board and we divided up the task so that everyone has something to complete each week. Everyday at our weekly meeting we discuss any stoppages or if any one needs any help completing their tasks.

![Trello](https://i.ibb.co/BGSGc7z/Software-Process-Management.png)


Trello Board Cards were created by team members with each use case serving as a card. In addition there is a goal for when we should complete each task. The goal timelines is more easily veiwed in the Gantt chart below. Once someone begins a task it will be moved to in progress and then upon completion moved to the completed list of the corresponding sprint.
Also, include the Gantt chart reflects the timeline from the Trello board. _(Main focus of Sprint 0)_

![Gantt](https://i.ibb.co/6mSS6KJ/Software-Process-Management-Gantt.png)

Each task is in a certain order. The basic steps are first so that we can build off of them for a future task. Each task is scheduled for a week and each team member was assigned a task to do that week. Timeline is subject to change if need be. 


## Scrum process

### Sprint 0

Duration: 08/26/2021 - 09/09/2021

#### Completed Tasks: 

1. Create Use Case Diagram
2. Plan System Design
3. Create System Diagram
4. Create README.md and update with team information
5. Finish Presentation for Spring 1 preparation

#### Contributions: 

1.  Jon Moran, 10-14 hours, contributed in planning, the overall overview, use cases, the slides/presentation
2.  John Conroy, 10-14 hours, contributed in planning, meeting scheduling, deployment, the slides/presentation
3.  James Oei, 10-14 hours, contributed in planning, deployment, system design, features, the slides/presentation
4.  Will Manzella, 10-14 hours, contributed in planning, organization, use cases, the slides/presentation

#### Sprint Retrospective:


Sprint 0 was a really great experience for all of us. It not only introduced to Agile Development and how to plan/develop a sophisticated project, but it showed us how to be professionally organized and work as a group. We were very efficient in planning, but we fell through when it came to maintaining that energy towards progressivley putting out plan into action (except the presentation).
Our retrospective meeting aided us in reflecting on our own indivudal performance through Sprint 0 and also our performance as a cooperative team. 

|            Good              |                      Could have been better                |                      How to improve?                      |
|------------------------------|:----------------------------------------------------------:|----------------------------------------------------------:|
| communication, presentation  |  More focus on this project, maintain progress constantly  |  better time management, set more time to work together   |


-------------------------------------------------------------------------------
### Sprint 1 - COMPLETE

Duration: 09/09/2021 - 10-05-2021

#### Completed Tasks: 

1. Create Login UI
2. Create Public message page
3. Create Private message page
4. Implement CSS
5. Display/ send and recieve messages
6. Maintain userlist
7. Send and recieve messages from a specific user
8. Add users as friends
9. Clear Chat
10. Notify others when a user disconnects

#### Contributions: 

1.  Jon Moran, 10-14 hours, contributed in planning, the overall overview, use cases, the slides/presentation
2.  John Conroy, 10-14 hours, contributed in planning, meeting scheduling, deployment, the slides/presentation
3.  James Oei, 10-14 hours, contributed in planning, deployment, system design, features, the slides/presentation
4.  Will Manzella, 10-14 hours, contributed in planning, organization, use cases, the slides/presentation


#### Sprint Retrospective:

Sprint 1 became a greater time crunch due to the increased workload from sprint 0 as well as busier schedules and time mismanagement. Fortunately, even through all of that adversity, our team was able to come together and dedicate important time to completing sprint 1. 
Everyone worked together to fulfill their roles and the project progressed smoothly. We learned how through small feature additions, many unintentional bugs can be producted which is frustrating. 

| Good                                       |   Could have been better    |  How to improve?  |
|--------------------------------------------|:---------------------------:|------------------:|
|  Working together and focusing on the task |  Preplanning for task ideas |  Time management  |


-----------------------------------------------------------------------------
### Sprint 2 - COMPLETE

Duration: 10/05/2021-10/26/2021

#### Completed Tasks: 

Functional

1. Users need to login with username/password. Invalid username/password cannot be logged in

2. Anyone can register for a new account to log in.

3. Only logged-in users can send/receive messages (any)

4. Logged-in users can logout

5. Logged-in users can create a group chat (more than 2 members)

6. Logged-in users in a group chat can send/receive messages from the group

7. Seperated chat window for group chat

8. Two use cases of your team choice

	(a) Use case:  show password feature on login page

	(b) Use case: user can switch between dark mode and light mode


Non-functional requirements

1. All data must be validated in all layers before sending/checking/forwarding

2. All data must be sanitized in client-side before displaying

3. Enter in an input to send data, clear data after sending

Latest Commit Link: https://bitbucket.org/cps490f21-team3/cps490-project-team3/commits/ac6f6e33c9e5c8d59e335585cdc83d1d1c55eb3f

#### Contributions: 

1.  Jon Moran, 9-13 hours, Developer, contributed in planning, documentation, use cases(logout functionality), the slides/presentation
2.  John Conroy, 9-13 hours, Developer, contributed in planning, meeting scheduling, use cases(group chat functionality, DB login/authentication), the slides/presentation
3.  James Oei, 9-13 hours, Product Owner, contributed in planning, system design, features, use cases(group chat functionality), the slides/presentation
4.  Will Manzella, 9-13 hours, Scrum Master, contributed in planning, organization, CSS and UI, use cases(show password, darkmode/lightmode), the slides/presentation

#### Sprint Retrospective:

Sprint 2 went a lot smoother in most aspects compared to previous sprints, but with midterms and busy schedules it was still hard to get to meet as often. We encountered multiple issues with the CSS; this included getting the external CSS to function properly and also our use case of darkmode/lightmode took a bit of debugging to get to work.
However, regardless of the bugs and issues we were very successful in working productively and as a team to complete our tasks. Collaboration was important especially when we had to put our minds together to solve the functionality of adding a "group chat".

|          Good           |              Could have been better                |        How to improve?        |
|-------------------------|:--------------------------------------------------:|------------------------------:|
| Teamwork, Communication |  Organizing our ideas for "mock ups" of use cases  |  Better use case preparation  |



-----------------------------------------------------------------------------
### Sprint 3 - Completed

Duration: 10/29/2021-12/02/2021

#### Completed Tasks: 

Functional
1. All messages, including public, private, group chats, will be stored in the dat
2. Logged-in users can view chat history from public, private, group chats after l
3. Logged-in users can edit their account with additional information such as Full
4. Users can create and keep connections with other users, e.g., friendships
5. Two addition requirements from your team
	(a) Use case: "Boop Buddy" Feature - users get assigned another random user to chat with for the day
Non-functional requirements
1. The system must be secure and defend against simple web attacks
 - All data must be validated in all layers before sending/checking/forwarding
 - All data must be sanitized in client-side before displaying
2. Passwords must be hashed in the database
3. Deployment with DevOps CI/CD
 - Dockerfile for the application
 - Setup a pipeline for continuous deployment

Latest Commit Link: https://bitbucket.org/cps490f21-team3/cps490-project-team3/commits/25d6d7bd4e00a9aa9819044fd39daaa29e7c21ad

#### Contributions: 

1.  Jon Moran, 8-10 hours, Product Owner, contributed in planning, documentation, use cases(logout functionality), the slides/presentation
2.  John Conroy, 9-14 hours, Developer, contributed in planning, meeting scheduling, use cases(group chat functionality, DB login/authentication), the slides/presentation
3.  James Oei, 9-14 hours, Developer, contributed in planning, system design, features, use cases(group chat functionality), the slides/presentation
4.  Will Manzella, 9-14 hours, Scrum Master, contributed in planning, organization, CSS and UI, use cases(show password, darkmode/lightmode), the slides/presentation

#### Sprint Retrospective:

Sprint 3 was a bit rushed. Many of us were dealing with illnesses throughout the Sprint which affected our productivity. As fas as the actual development process went this was by far the best we have worked together as a team. We knew what each of our strengths were and delegated work to the right individuals. We worked very well as a team which is a good sign for future projects that may come around.

|          Good           |              Could have been better                |        How to improve?        |
|-------------------------|:--------------------------------------------------:|------------------------------:|
| Teamwork, Communication |  				Time Management					   |  Meeting daily to talk		   |



-----------------------------------------------------------------------------

