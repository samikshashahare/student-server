import express, { application } from 'express'
const app = express()
app.use(express.json());

const students = []

app.get('/health', (req, res) => {
    res.json(
        { status: 'all good ! , all set !' }
    )
})

app.get('/students', (req, res) => {
    res.json({
        success: true,
        data: students,
        message: 'student data fetched successfully'
    })
})

app.post('/students', (req, res) => {

    const { name, age, mobile, email } = req.body
    const id = Math.floor(Math.random() * 10000) + 1;

    if (!name) {
        res.json({
            message: 'name is required'
        })
    }

    if (!age) {
        res.json({
            message: 'age is required'
        })
    }
    if (!mobile) {
        res.json({
            message: 'mobile is required'
        })
    }
    if (!email) {
        res.json({
            message: 'email is required'
        })
    }

    const newStudent = {
        id: id,
        name: name,
        age: age,
        mobile: mobile,
        email: email
    }

    /* const newStudent ={
        id,
        name,
        age,
       mobile,
        email
     }*/

    students.push(newStudent);

    res.json(
        {
            success: true,
            data: newStudent,
            message: 'new student added successfuly'
        }
    )

});

app.get('/student', (req, res)=>{
    const { id } = req.query
let student = null

students.forEach((stud)=>{
    if(stud.id == id){
       student = stud;

    }
})

if(student == null){
    return res.json({
        success:false,
        message:'student not found'
    })
}

res.json({
    success:true,
    data:student,
    message : 'successfully fetched student'
})

});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})