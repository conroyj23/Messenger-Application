const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbJack:oroXINBEBT8uLFdk@messengerdb.heiib.mongodb.net/boop?retryWrites=true&w=majority";
const mongodbclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db = null;
const bcrypt = require("bcryptjs")
mongodbclient.connect( (err,connection) => {
    if(err) throw err;
    console.log("Connected to the MongoDB cluster!");
    db = connection.db();
})
const dbIsReady = ()=>{
    return db != null;
};
const getDb = () =>{
    if(!dbIsReady())
        throw Error("No database connection");
    return db;
}
function validateUsername(username){
    return (username && username.length > 4);
}
function validatePassword(password){
    //a validation requiring the password must be 6 chars or longer
    //must contain at least one digit, one lower case, and one UPPERCASE
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password); 
}
const  checklogin = async (username,password)=>{
    //your implementation
    if(validatePassword(password)&&validateUsername(username)){
        var users = getDb().collection("users");
        var user = await users.findOne({username:username});
        if (user!=null && user.username==username){
            console.log("Debug>messengerdb.checklogin-> userNAME found:\n" +
            JSON.stringify(user))
            return bcrypt.compareSync(password, user.password)
        }
        else {
            return false
        }
    }
}

const addUser = async (username,password)=>{
    //your implementation
    if(validatePassword(password)&&validateUsername(username)){
        var users = getDb().collection("users");
        var user = await users.findOne({username:username});
        if (user!=null && user.username==username){
            console.log(`Debug>messengerdb.addUser: Username '${username}' exists!`);
            return "UserExist";
        }
        else {
            //HASHING PASSWORDS IMPLEMENTATION
            var hashedpassword = bcrypt.hashSync(password,10);
            const newUser = {"username": username,"password" : hashedpassword}
            try{
                const result = await users.insertOne(newUser);
                if(result!=null){
                    console.log("Debug>messengerdb.addUser: a new user added: \n", result);
                    return "Success";
                }
            }catch{
                console.log("Debug>messengerdb.addUser: error for adding '" +
                username +"':\n", err);
                return "Error";
            }
        }
    }
}

const storePublicChat = (receiver,message)=>{
    console.log("DEBUG>> Storing Public message to MongoDB");
    //TODO: validate the data
    var date = new Date();
    var time = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"});

    let timestamp = Date.now();
    let chat = {receiver: receiver, message:message, timestamp:timestamp, chat_time:time};
    try{
        const inserted = getDb().collection("public_chat").insertOne(chat);
        if(inserted!=null){
            console.log("Debug>messengerdb.storePublicChat: a new chat message added: \n", JSON.stringify(chat));
    }
    }catch{
        console.log("Debug>messengerdb.storePublicChat: error for adding '" +
            JSON.stringify(chat) +"'\n");
    }
}
const loadChatHistory = async (receiver, limits=100)=> {
    var chat_history = await getDb().collection("public_chat").find(
        {receiver:receiver}).sort({timestamp:-1}).limit(limits).toArray();
        //print debug info e.g., using JSON.stringify(chat_history)
        if (chat_history && chat_history.length > 0) return chat_history
}

const storePrivateChat = (receiver,message)=>{
    console.log("DEBUG>> Storing Private message to MongoDB");
    //TODO: validate the data
    var date = new Date();
    var time = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"});
    let timestamp = Date.now();
    let chat = {receiver: receiver, message:message, timestamp:timestamp, chat_time:time};

    try{
        const inserted = getDb().collection("private_chat").insertOne(chat);
        if(inserted!=null){
            console.log("Debug>messengerdb.storePrivateChat: a new chat message added: \n", JSON.stringify(chat));
    }
    }catch{
        console.log("Debug>messengerdb.storePrivateChat: error for adding '" +
            JSON.stringify(chat) +"'\n");
    }
}
const loadPrivateChatHistory = async (receiver, limits=100)=> {
    var chat_history = await getDb().collection("private_chat").find(
        {receiver:receiver}).sort({timestamp:-1}).limit(limits).toArray();
        //print debug info e.g., using JSON.stringify(chat_history)
        if (chat_history && chat_history.length > 0) return chat_history
}

const storeGroupChat = (message, groupChatName)=>{
    //TODO: validate the data    
    var date = new Date();
    var time = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"});
    let timestamp = Date.now();
    let chat = {message:message, timestamp:timestamp, group_name:groupChatName, chat_time:time};
    try{
        const inserted = getDb().collection("group_chat").insertOne(chat);
        if(inserted!=null){
            console.log("Debug>messengerdb.storeGroupChat: a new chat message added: \n", JSON.stringify(chat));
    }
    }catch{
        console.log("Debug>messengerdb.storeGroupChat: error for adding '" +
            JSON.stringify(chat) +"'\n");
    }
}
const loadGroupChatHistory = async (receiver, group_chat_name, limits=100)=> {
    var chat_history = await getDb().collection("group_chat").find(
        {group_name:group_chat_name}).sort({timestamp:-1}).limit(limits).toArray();
        //print debug info e.g., using JSON.stringify(chat_history)
        if (chat_history && chat_history.length > 0) return chat_history
}

const addFriend = async (username,friend)=>{
    //your implementation
    if(validateUsername(friend)&&validateUsername(username)){
        var users = getDb().collection("users");
        var user = await users.findOne({username:username});
        console.log(user);
        console.log(friend);     
        if (user!=null && user.username==username){
            try{
                const result = await getDb().collection("users").updateOne(
                    {username: username},
                    {$push: {friends: friend}}
                );
                if(result !=null){                
                    console.log(`${username}' has successfully added'${friend}'as a friend`);
                    return "Friend_added";
                }
            }
            catch{
                console.log(`${username}' failed to add'${friend} 'as a friend`);
                return "Friendship failed";
            }
        }
    else{
        console.log(`${username}' could not be found in the database`);
        return "Friendship failed";
    }
        
}
}

const addName = async (username,name)=>{
    //your implementation
    if(validateUsername(username)){
        var users = getDb().collection("users");
        var user = await users.findOne({username:username});
        console.log(user);     
        if (user!=null && user.username==username){
            try{
                const result = await getDb().collection("users").updateOne(
                    {username: username},
                    {$set: {name: name}}
                );
                if(result !=null){                
                    console.log(`${username}' has successfully updated their name to '${name}'`);
                    return "Name_added";
                }
            }
            catch{
                console.log(`${username}' failed to update their name to '${friend} '`);
                return "Name failed";
            }
        }
    else{
        console.log(`${username}' could not be found in the database`);
        return "Name failed";
    }
        
}
}

const addNumber = async (username,number)=>{
    //your implementation
    if(validateUsername(username)){
        var users = getDb().collection("users");
        var user = await users.findOne({username:username});
        if (user!=null && user.username==username){
            try{
                const result = await getDb().collection("users").updateOne(
                    {username: username},
                    {$set: {phonenumber: number}}
                );
                if(result !=null){                
                    console.log(`${username}' has successfully updated their phone number to '${number}'`);
                    return "Number_added";
                }
            }
            catch{
                console.log(`${username}' failed to update their number to '${number} '`);
                return "Number failed";
            }
        }
    else{
        console.log(`${username}' could not be found in the database`);
        return "Number failed";
    }
        
}
}

const addEmail = async (username,email)=>{
    //your implementation
    if(validateUsername(username)){
        var users = getDb().collection("users");
        var user = await users.findOne({username:username});
        if (user!=null && user.username==username){
            try{
                const result = await getDb().collection("users").updateOne(
                    {username: username},
                    {$set: {email: email}}
                );
                if(result !=null){                
                    console.log(`${username}' has successfully updated their email to '${email}'`);
                    return "Email";
                }
            }
            catch{
                console.log(`${username}' failed to update their email to '${email} '`);
                return "Email failed";
            }
        }
    else{
        console.log(`${username}' could not be found in the database`);
        return "Email failed";
    }
        
}
}

module.exports = {checklogin, addUser, addName, addEmail, addNumber, storePublicChat, loadChatHistory, storeGroupChat, storePrivateChat, loadGroupChatHistory, loadPrivateChatHistory, addFriend};
