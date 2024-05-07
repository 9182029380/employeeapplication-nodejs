const express =require('express');
const mongoose=require('mongoose');
const Employee=require('./entity/employee.js')
const app =express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/welcome',(req,res)=>{
    res.send("welcome to my app"); 
})

app.post("/addemployee",async(req,res)=>{
    try{
        const employee=await Employee.create(req.body)
        res.status(200).json(employee)
    }catch(error){
        res.status(500).json(error)
    }
})
app.post("/addemployees", async (req, res) => {
    try {
        // Create a new employee based on the request body
        const newEmployee = await Employee.create(req.body);

        // Fetch the updated list of all employees after adding the new employee
        const allEmployees = await Employee.find(); // Assuming you're using Mongoose

        // Send the updated list of employees as a JSON response
        res.status(200).json(allEmployees);
    } catch (error) {
        // If an error occurs during creation or fetching of employees, send an error response
        console.error("Error adding employee:", error);
        res.status(500).json({ error: "Failed to add employee" });
    }
});


app.get("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ empId: id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({
            empId: employee.empId,
            name: employee.name,
            email: employee.email,
            password: employee.password,
            department: employee.department,
            salary: employee.salary
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOneAndDelete({ empId: id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEmployee = req.body; // Assuming the request body contains the updated employee data

        const employee = await Employee.findOneAndUpdate({ empId: id }, updatedEmployee, { new: true });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


mongoose.set("strictQuery",false)
mongoose.connect("mongodb://127.0.0.1:27017/myapp")
.then(()=>{
    console.log("connected to db");
    app.listen(3000,()=>{
        console.log("server started");
    })
})
.catch((err)=>{
    console.log(err);
})

