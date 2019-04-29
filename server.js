exp =require("express")
bp=require("body-parser")
AddUser=require("./nodefiles/AddUser")
AddProject=require("./nodefiles/AddProject")
AddTask=require("./nodefiles/AddTask")

app=exp();
app.use(bp.json())
app.use("/AddUser",AddUser)
app.use("/AddProject",AddProject)
app.use("/AddTask",AddTask)

app.listen(4020)
console.log("server started port no 4020")