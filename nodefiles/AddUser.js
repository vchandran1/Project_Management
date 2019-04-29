exp=require("express")
mj=require("mongojs")
conn=mj("mongodb://localhost:27017/ProjectManager")

rout=exp.Router()
rout.post('/addUser',function(req,res){
    dt=req.body;
    conn.usersTable.find().sort({_id:-1}).limit(1,function(err,rs){
        console.log(rs)
        if(rs.length==0){
            id=1;
        }else{
            id=rs[0]._id;
            id++
        }
        conn.usersTable.save({_id:id,firstName:dt.firstName,lastName:dt.lastName,empId:dt.empId,projectId:"",taskId:""})
    })
    res.send("inserted")
})

rout.get('/getUsers',function(req,res){
    conn.usersTable.find(function(err,result){
        res.send(result)
    });
})

rout.post('/update',function(req,res){
    dt=req.body;
    //console.log(dt)
    conn.usersTable.update(dt[0],{$set:dt[1]})
    res.send("updated")
})

rout.post('/deletUser',function(req,res){
    dt=req.body;
    conn.usersTable.remove(dt)
    res.send("deleted")
})
module.exports=rout;