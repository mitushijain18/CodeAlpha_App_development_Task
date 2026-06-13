let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
{
question:"What is AI?",
answer:"Artificial Intelligence"
},
{
question:"What is ML?",
answer:"Machine Learning"
}
];

let currentCard = 0;

function saveCards(){
localStorage.setItem(
"flashcards",
JSON.stringify(flashcards)
);
}

function displayCard(){

if(flashcards.length === 0){

document.getElementById("question").innerText =
"No Flashcards Available";

document.getElementById("answer").innerText = "";

document.getElementById("current").innerText = 0;

document.getElementById("total").innerText = 0;

return;
}

document.getElementById("question").innerText =
flashcards[currentCard].question;

document.getElementById("answer").innerText = "";

document.getElementById("current").innerText =
currentCard + 1;

document.getElementById("total").innerText =
flashcards.length;
}

function showAnswer(){

if(flashcards.length === 0) return;

document.getElementById("answer").innerText =
flashcards[currentCard].answer;
}

function nextCard(){

if(flashcards.length === 0) return;

currentCard++;

if(currentCard >= flashcards.length){
currentCard = 0;
}

displayCard();
}

function prevCard(){

if(flashcards.length === 0) return;

currentCard--;

if(currentCard < 0){
currentCard = flashcards.length - 1;
}

displayCard();
}

function addCard(){

let question =
document.getElementById("newQuestion").value.trim();

let answer =
document.getElementById("newAnswer").value.trim();

if(question === "" || answer === ""){

alert("Please fill all fields");

return;
}

flashcards.push({
question,
answer
});

saveCards();

document.getElementById("newQuestion").value = "";
document.getElementById("newAnswer").value = "";

renderList();
displayCard();
}

function editCard(index){

let newQuestion =
prompt(
"Edit Question",
flashcards[index].question
);

if(newQuestion === null) return;

let newAnswer =
prompt(
"Edit Answer",
flashcards[index].answer
);

if(newAnswer === null) return;

flashcards[index].question = newQuestion;
flashcards[index].answer = newAnswer;

saveCards();

renderList();
displayCard();
}

function deleteCard(index){

if(!confirm("Delete this flashcard?"))
return;

flashcards.splice(index,1);

if(currentCard >= flashcards.length){
currentCard = flashcards.length - 1;
}

if(currentCard < 0){
currentCard = 0;
}

saveCards();

renderList();
displayCard();
}

function renderList(){

let list =
document.getElementById("flashcardList");

list.innerHTML = "";

flashcards.forEach((card,index)=>{

let div =
document.createElement("div");

div.className = "flashcard-item";

div.innerHTML = `
<div>
<strong>${card.question}</strong>
</div>

<div class="actions">
<button onclick="editCard(${index})">
✏ Edit
</button>

<button onclick="deleteCard(${index})">
🗑 Delete
</button>
</div>
`;

list.appendChild(div);

});
}

renderList();
displayCard();