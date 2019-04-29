exp=require("express")
mj=require("mongojs")
conn=mj("mongodb://localhost:27017/ProjectManager")

rout=exp.Router()
rout.post('/addProject',function(req,res){
    dt=req.body;
    // console.log(dt)
    conn.projectTable.find().sort({_id:-1}).limit(1,function(err,rs){
        //console.log(rs)
        if(rs.length==0){
            id=1;
        }else{
            id=rs[0]._id;
            id++
        }
        conn.projectTable.save({_id:id,Project:dt.Project,StartDate:dt.StartDate,EndDate:dt.EndDate,Priority:dt.Priority})
    })
    res.send("inserted")
})

rout.get('/getProjects',function(req,res){
    conn.projectTable.find(function(err,result){
        res.send(result)
    });
})

rout.post('/updateProject',function(req,res){
    dt=req.body;
    //console.log(dt)
    conn.projectTable.update(dt[0],{$set:dt[1]})
    res.send("updated")
})

rout.post('/deletUser',function(req,res){
    dt=req.body;
    conn.usersTable.remove(dt)
    res.send("deleted")
})
module.exports=rout;