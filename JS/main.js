/*=============================================================
console.log('Hello World!')
// String - ตัวอักษร
let fname = 'John'
console.log('name',fname)
const idcard = '123'

// number 
let age = 30
let height = 150.5
const pi = 3.14
fname = 'Tom'

idcard = '456'

console.log('idcard',idcard)

console.log('name',fname,'age',age)
//console.log('age',age)
=============================================================*/

/*=============================================================
+ บวก
- ลบ
* คูณ
/ หาร
% เศษ mod

condition statement (if,else,switch)
== เท่ากับ , != ไม่เท่ากับ 
> มากกว่า , >= มากกว่าเท่ากับ
< น้อยกว่า , <= น้อยกว่าเท่ากับ
&& และ , || หรือ , ! ไม่
=============================================================*/

/*=============================================================
let number1 = 'Churkan' //String
let number2 = 'Klaikruea'

let number3 = number1+' '+number2
console.log('number3 = ',number3)
=============================================================*/

/*=============================================================
let number1 = 5
let number2 = 3

let condition1 = number1<=number2 // Boolean (true/false)
console.log('condition is = ',condition1)
=============================================================*/

/*=============================================================
let number1=5
let number2=5

//if-else statement
if (number1!=number2){
    console.log('this if')
} else if (number1==number2){
    console.log('this else if')
} else {
    console.log('this else')
}
=============================================================*/

/*=============================================================
Grade
>= 80 A
>= 70 B
>= 60 c
>= 50 D
=============================================================*/

/*=============================================================
let score = prompt('ใส่ตัวเลข : ') //input
if (score>=80) {
    console.log('Grade : A')
} else if (score>=70) {
    console.log('Grade : B')
} else if (score>=60) {
    console.log('Grade : C')
} else if (score>=50) {
    console.log('Grade : D')
} else {
    console.log('Grade : F')
}
=============================================================*/

/*=============================================================
let number1=5
let number2=10

//T = T && T
let condition1 = number1>=3 && number2>=5
console.log('Result of condition1 : ',condition1)

//F = T && F
let condition2 = number1>=3 && number2>=11
console.log('Result of condition2 : ',condition2)

//T = T || F
let condition3 = number1>=3 || number2>=11
console.log('Result of condition3 : ',condition3)

//F = !(T || F)
let condition4 = !(number1>=3 || number2>=11)
console.log('Result of condition4 : ',condition4)
=============================================================*/

/*=============================================================
let number = prompt('ใส่ตัวเลข ')
if (number%2==0) {
    console.log('You are even number.')
} else {
    console.log('You are odd number.')
}

if (!(number%2==0)) {
    console.log('You are odd number.')
} else {
    console.log('You are even number.')
}
=============================================================*/

/*=============================================================
//while
let counter = 0
while (counter <= 9) {
    console.log('Hi')
    //counter = counter + 1
    counter += 1
    //counter++
}

//for
for (let counter = 0; counter<10;counter++ ) {
    console.log('Hi')
}
=============================================================*/

/*=============================================================
//Array
let age1=20
let age2=25
let age3=30

let ages = [20,25,30]

//แทนที่
ages = [200,100,50]

console.log(`age1 age2 age3 ${age1} ${age2} ${age3}`)
console.log('age1 age2 age3',age1,age2,age3)
console.log('array',ages)

//ต่อ Array
ages.push(25)
console.log('push array ',ages)
//ลบ Array ตัวสุดท้าย
ages.pop()
console.log('pop array ',ages)

ages=[20,25,30,35,40]
if(ages.includes(30)){ //ถ้ามี 30 ใน ages = True
    console.log('มีแลข 30 อยู่ใน Array')
}

//เรียง
ages.sort()
console.log(ages)
=============================================================*/

/*=============================================================
//Array แบบ String
let name_list = ['aa','bb','cc']
//Push
name_list.push('dd')
console.log(name_list)
//Pop
name_list.pop()
console.log('pop name_list ',name_list)
console.log('name_list ',name_list.length)
console.log('name_list ',name_list[0])
console.log('name_list ',name_list[1])
console.log('name_list ',name_list[2])

//แสดงผล Array โดยใช้ for
for(let index=0;index<name_list.length;index++) {
    console.log('name_list : ',name_list[index])
=============================================================*/

/*=============================================================
//Object
let age1=30
let name1='aa'
let grade1='A'

let age2=30
let name2='bb'
let grade2='B'

let student=[{
    age: 30,
    name: 'aa',
    grade: 'A'
},{
    age: 35,
    name: 'bb',
    grade: 'B'
}]

//Push
student.push({
    age: 40,
    name: 'cc',
    grade: 'C'
})

//Pop
student.pop()

//console.log(student)
//console.log(student.age)
//console.log(student.name)
//console.log(student.grade)

for(let index=0;index<student.length;index++) {
    console.log('Student No.',index+1)
    console.log('age',student[index].age)
    console.log('name',student[index].name)
    console.log('grade',student[index].grade)
}
=============================================================*/

/*=============================================================
//Function
let score1 = 55
let score2 = 65

let grade =''
function calculat_grade(score){
    if(score>=80){
        grade='A'
    } else if(score>=70) {
        grade='B'
    } else if(score>=60) {
        grade='C'
    } else if(score>=50) {
        grade='D'
    } else {
        grade='F'
    }
    return grade
}

//เรียกใช้ function
let grade1=calculat_grade(score1)
console.log('Grade',grade1)

//Array
let score = [20,30,40,50]

for(let index=0;index<score.length;index++){
    console.log('Score',score[index])
}

//score[0]=score[0]*2
//score[1]=score[1]*2
//score[2]=score[2]*2
//score[3]=score[3]*2

//Shorter
score=score.map((s)=>{
    return s*2
})
score.forEach((s)=>{
    console.log('forEach Score',s)
})

//let newScore=score.filter((s)=>{
//    if(s>=30){
//        return true
//    } else {
//        return false
//    }
//})

let newScore=score.filter((s)=>{
    return s>=30
})

for(let index=0;index<score.length;index++){
    console.log('score',score[index])
    if (score[index]>=30){
        newScore.push(score[index])
    }
}

newScore.forEach((ns)=>{
    console.log('New Score',ns)
})
=============================================================*/


//object function
let students = [
    {
        name:'aa',
        score:50,
        grade:'D'
    },{
        name:'bb',
        score:80,
        grade:'A'
    }
]

let student=students.find((s)=>{
    if(s.name=='aa'){
        return true
    }
})

let doubleScore=students.map((s)=>{
    s.score=s.score*2
    return s
})

let highScore = students.filter((s)=>{
    if (s.score>=120){
        return true
    }
})

console.log(student)
console.log('Double score',doubleScore)
console.log('High score',highScore)
