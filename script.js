


const API_KEY = "";


const resumeInput = document.getElementById("resumeInput");
const dropArea = document.getElementById("dropArea");
const fileName = document.getElementById("fileName");
const analyzeBtn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");
const resultSection = document.getElementById("resultSection");
const themeBtn = document.getElementById("themeBtn");

let resumeText = "";
let selectedFile = null;


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if(document.body.classList.contains("light")){
        icon.className = "fa-solid fa-sun";
    }
    else{
        icon.className = "fa-solid fa-moon";
    }

});

resumeInput.addEventListener("change",(e)=>{

    selectedFile = e.target.files[0];

    if(selectedFile){

        fileName.innerText = selectedFile.name;

    }

});

dropArea.addEventListener("dragover",(e)=>{

    e.preventDefault();

    dropArea.style.borderColor="#22c55e";

});

dropArea.addEventListener("dragleave",()=>{

    dropArea.style.borderColor="#38bdf8";

});

dropArea.addEventListener("drop",(e)=>{

    e.preventDefault();

    dropArea.style.borderColor="#38bdf8";

    selectedFile=e.dataTransfer.files[0];

    resumeInput.files=e.dataTransfer.files;

    fileName.innerText=selectedFile.name;

});

analyzeBtn.addEventListener("click",async()=>{

    if(!selectedFile){

        alert("Please upload a resume.");

        return;

    }

    loading.classList.remove("hidden");

    resultSection.classList.add("hidden");

    resumeText = await extractPDFText(selectedFile);

    await analyzeResume(resumeText);

});


async function extractPDFText(file){

    const arrayBuffer=await file.arrayBuffer();

    const pdf=await pdfjsLib.getDocument(arrayBuffer).promise;

    let text="";

    for(let i=1;i<=pdf.numPages;i++){

        const page=await pdf.getPage(i);

        const content=await page.getTextContent();

        const pageText=content.items.map(item=>item.str).join(" ");

        text+=pageText+" ";

    }

    return text;

}


async function analyzeResume(text){

const prompt=`

You are an expert ATS Resume Analyzer.

Analyze this resume.

Return ONLY JSON.

{

"resumeScore":90,

"atsScore":88,

"skills":["HTML","CSS"],

"missingSkills":["NodeJS"],

"strengths":[
"Good Projects"
],

"weaknesses":[
"No Certifications"
],

"suggestions":[
"Improve Summary",
"Add Github"
],

"interviewTips":[
"Prepare OOPS",
"Explain Projects"
]

}

Resume:

${text}

`;

try{

const response=await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

contents:[

{

parts:[

{

text:prompt

}

]

}

]

})

}

);

const data=await response.json();

const output=data.candidates[0].content.parts[0].text;

displayResult(output);

}

catch(error){

loading.classList.add("hidden");

alert("Something went wrong.");

console.log(error);

}

}


function displayResult(responseText) {

    loading.classList.add("hidden");
    resultSection.classList.remove("hidden");

    try {

    
        let cleanText = responseText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleanText);

        document.getElementById("resumeScore").innerText =
            result.resumeScore || 0;

        document.getElementById("atsScore").innerText =
            result.atsScore || 0;

        updateCircle(
            document.querySelectorAll(".circle")[0],
            result.resumeScore || 0
        );

        updateCircle(
            document.querySelectorAll(".circle")[1],
            result.atsScore || 0
        );

        addList("skillList", result.skills);

        addList("missingSkillList", result.missingSkills);

        addList("strengthList", result.strengths);

        addList("weaknessList", result.weaknesses);

        addList("suggestionList", result.suggestions);

        addList("tipList", result.interviewTips);

    }
    catch (err) {

        console.log(err);

        alert("Unable to read AI response.");

    }

}

function addList(id, array) {

    const ul = document.getElementById(id);

    ul.innerHTML = "";

    if (!array || array.length === 0) {

        ul.innerHTML = "<li>No Data</li>";

        return;

    }

    array.forEach(item => {

        const li = document.createElement("li");

        li.innerText = item;

        ul.appendChild(li);

    });

}


function updateCircle(circle, score) {

    let degree = (score / 100) * 360;

    circle.style.background =
        `conic-gradient(
        #38bdf8 ${degree}deg,
        #1e293b ${degree}deg
    )`;

}

const style = document.createElement("style");

style.innerHTML = `

body.light{

background:#f5f7fb;

color:#111827;

}

body.light .upload-card,

body.light .card,

body.light .score-card{

background:white;

color:#111827;

}

body.light nav h2,

body.light .hero h1,

body.light .card h3{

color:#111827;

}

body.light .hero p,

body.light li,

body.light footer,

body.light .file-name{

color:#4b5563;

}

`;

document.head.appendChild(style);


document.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        analyzeBtn.click();

    }

});


console.log("AI Resume Analyzer Loaded Successfully");
