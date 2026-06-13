let workouts =
JSON.parse(localStorage.getItem("workouts")) || [];

let chart;

function saveData(){
localStorage.setItem(
"workouts",
JSON.stringify(workouts)
);
}

function addWorkout(){

const exercise =
document.getElementById("exercise").value;

const duration =
document.getElementById("duration").value;

const calories =
document.getElementById("calories").value;

if(
exercise === "" ||
duration === "" ||
calories === ""
){
alert("Please fill all fields");
return;
}

workouts.push({
exercise,
duration:Number(duration),
calories:Number(calories)
});

saveData();

document.getElementById("exercise").value="";
document.getElementById("duration").value="";
document.getElementById("calories").value="";

renderWorkouts();
updateDashboard();
updateChart();
}

function deleteWorkout(index){

workouts.splice(index,1);

saveData();

renderWorkouts();
updateDashboard();
updateChart();
}

function renderWorkouts(){

const list =
document.getElementById("workoutList");

list.innerHTML="";

workouts.forEach((workout,index)=>{

const div =
document.createElement("div");

div.className="workout-item";

div.innerHTML=`
<div>
<strong>${workout.exercise}</strong>
<br>
${workout.duration} min |
${workout.calories} cal
</div>

<button onclick="deleteWorkout(${index})">
🗑 Delete
</button>
`;

list.appendChild(div);

});
}

function updateDashboard(){

document.getElementById("totalWorkouts")
.innerText = workouts.length;

let totalMinutes = 0;
let totalCalories = 0;

workouts.forEach(workout=>{

totalMinutes += workout.duration;
totalCalories += workout.calories;

});

document.getElementById("totalMinutes")
.innerText = totalMinutes;

document.getElementById("totalCalories")
.innerText = totalCalories;

let progress =
Math.min(totalMinutes,300) / 300 * 100;

document.getElementById("progressBar")
.style.width = progress + "%";
}

function updateChart(){

const labels =
workouts.map(
(workout,index)=>`Workout ${index+1}`
);

const calories =
workouts.map(
workout=>workout.calories
);

const ctx =
document.getElementById("fitnessChart");

if(chart){
chart.destroy();
}

chart = new Chart(ctx,{
type:"bar",
data:{
labels:labels,
datasets:[{
label:"Calories Burned",
data:calories
}]
},
options:{
responsive:true
}
});
}

function toggleTheme(){

document.body.classList.toggle("dark");

if(
document.body.classList.contains("dark")
){
localStorage.setItem("theme","dark");
}
else{
localStorage.setItem("theme","light");
}
}

function loadTheme(){

const theme =
localStorage.getItem("theme");

if(theme === "dark"){
document.body.classList.add("dark");
}
}

loadTheme();

renderWorkouts();
updateDashboard();
updateChart();