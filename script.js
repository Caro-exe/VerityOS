dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("askme"));
function dragElement(element) {
  var intX = 0;
  var intY = 0;
  var curX = 0;
  var curY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDrag;
  } else {
    
    element.onmousedown = startDrag;
  }

  function startDrag(e) {
    e = e || window.event;
    e.preventDefault();
    intX = e.clientX;
    intY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    curX = intX - e.clientX;
    curY = intY - e.clientY;
    intX = e.clientX;
    intY = e.clientY;

    var topbar = document.getElementById("top");
    var minimumTop = topbar.getBoundingClientRect().bottom + window.scrollY;
    var minimumLeft = window.scrollX;

    var maximumTop = Math.max(
      minimumTop, window.scrollY + window.innerHeight - element.offsetHeight

    );
    var maximumLeft = Math.max(
      minimumLeft, window.scrollX +  window.innerWidth - element.offsetWidth
    );

    var nextTop = element.offsetTop - curY;
    var nextLeft = element.offsetLeft - curX;


    element.style.top = Math.min(maximumTop, Math.max(minimumTop, nextTop)) + "px";

    element.style.left = Math.min(maximumLeft, Math.max (minimumLeft, nextLeft)) + "px";
    
  }



  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDrag;
  } else {
    
    element.onmousedown = startDrag;
  }

  function startDrag(e) {
    e = e || window.event;
    e.preventDefault();
    intX = e.clientX;
    intY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    curX = intX - e.clientX;
    curY = intY - e.clientY;
    intX = e.clientX;
    intY = e.clientY;

    var topbar = document.getElementById("top");
    var minimumTop = topbar.getBoundingClientRect().bottom + window.scrollY;
    var minimumLeft = window.scrollX;

    var maximumTop = Math.max(
      minimumTop, window.scrollY + window.innerHeight - element.offsetHeight

    );
    var maximumLeft = Math.max(
      minimumLeft, window.scrollX +  window.innerWidth - element.offsetWidth
    );

    var nextTop = element.offsetTop - curY;
    var nextLeft = element.offsetLeft - curX;


    element.style.top = Math.min(maximumTop, Math.max(minimumTop, nextTop)) + "px";

    element.style.left = Math.min(maximumLeft, Math.max (minimumLeft, nextLeft)) + "px";
    
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function centerWindow(element) { 
  element.style.left = window.scrollX + (window.innerWidth - element.offsetWidth) / 2 + "px"; 
  element.style.top = window.scrollY + (window.innerHeight - element.offsetHeight) / 2 + "px"; 
}

var biggestIndex = 1;

var welcomeScreen = document.querySelector("#welcome")
var welcomeScreenOpen = document.getElementById("openW");
var welcomeScreenClose = document.getElementById("closeWs")
var topBar = document.getElementById("top");
var veritySpeech = document.getElementById("veritySpeech");
var nextSpeech = document.getElementById("nextSpeech");
var vInstaller = document.getElementById("vInstaller");
var installButton = document.getElementById("installVerity");
var installProgress = document.getElementById("installProgress");
var installStatus = document.getElementById("installStatus");
var verityHelper = document.getElementById("verityHelper");
var terms = document.getElementById("terms");
var installationStarted = false; 
const today = new Date().toLocaleDateString()

document.getElementById('current-date').textContent = today; 


var askScreen = document.querySelector("#askme")

var askScreenClose = document.querySelector("#closeAsk")

askScreenClose.addEventListener("click", function() {
  closeWs(askScreen);

  document.getElementById("askIcon").classList.remove("selected");
});

function closeWs(element) {
  element.style.display = "none"
}
function openW(element) {
    element.style.display = "flex";
    centerWindow(element);
    handleWindowTap(element);
}

welcomeScreenClose.addEventListener("click", function() {
    closeWs(welcomeScreen);
}); 
welcomeScreenOpen.addEventListener("click", function() {
    openW(welcomeScreen)
});

var selectedIcon = undefined 

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined; 
}

function handleIconTap (element) {
    selectIcon(element);
    openW(askScreen);
}
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => handleWindowTap(element))
}



function handleWindowTap(element) {
  element.style.display = "flex"
  biggestIndex++;
  element.style.zIndex = biggestIndex; 
  topBar.style.zIndex = biggestIndex + 1;
}



function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  dragElement(screen)
}


centerWindow(welcomeScreen);

document.getElementById("vInstallerClose").addEventListener("click", function() {
  closeWs(vInstaller);

  document.getElementById("installerIcon").classList.remove("selected");
});



var questions = [
  {question: "What's this?",
  answer: "This is just a regular OS! You're just having a regular day playing Minecraft! You should talk to your friends"},
  {question:"Everything fine?",
    answer:"Everythings fine. "
  }
]


var verityspeech = [
  {q: "Hello?",
    a: "Hello! It's me Verity! Your personal helper friend! I know everything! Ask me anything",
    sound: "sfx/Hello!.mp3"
  },
  {q: "Do you really know everything?", a: "Of course! Test me!"} ,
  {q: "What's two plus two?",
    a: "four"
  },
  {q: "What's the capital of France?",
    a:"Paris!"
  },
  {q: "What's the blast radius of a creeper?",
    a: "3x4 blocks depending on difficulty!"
  },
  {q: "what sound does a cow make?",
    a:"mooo"
  },
  {q:"why did the chicken cross the road?",
    a: "to get to the other side!"
  },
  {q:"What's your favorite song?",
    a: "Let me show you.",
    sound: "sfx/ending.mp3",
    sprite: "images/veritySmile.webp"

  }
]

var speechIndex = 0;

function showNextQuestion() {
  if(speechIndex < verityspeech.length) {
    nextSpeech.textContent = verityspeech[speechIndex].q;
    nextSpeech.disabled = false; 
  } else {
    nextSpeech.textContent = "...";
    nextSpeech.disabled = true;
  }
}

function setQAcontent(index) {
  var QAcontent = document.querySelector("#QAcontent")
  QAcontent.innerHTML = questions[index].answer;

}
setQAcontent(0)

function addtoSideBar(index){
  var sideBar = document.querySelector("#sidebar");
  var QA = questions[index];
  var button = document.createElement("button");
  button.textContent = QA.question;

  button.addEventListener("click", function() {
    setQAcontent(index);
  });
  sideBar.appendChild(button);
}

for (var i = 0; i < questions.length; i++) {
  addtoSideBar(i);
}

nextSpeech.addEventListener("click", function() {
  if (speechIndex >= verityspeech.length) return;
  var dialogue = verityspeech[speechIndex];

  veritySpeech.textContent = dialogue.a;
  if(dialogue.sound) {
    var sound = new Audio(dialogue.sound);

    sound.play().catch(function(error){
      console.log("sounds didn't play", error);
    });
  }
  if(dialogue.sprite){
    document.getElementById("verityCharacter").src = dialogue.sprite;
  }
  speechIndex++;
  showNextQuestion(); 

})

speechIndex = 0;

installButton.addEventListener("click", function() {
  if (!terms.checked || installationStarted) return; 

  installationStarted = true;
  terms.disabled = true;
  installButton.disabled = true;
  installStatus.classList.remove("rainbow");
  installStatus.textContent = "Preparing your Computer Companion";

  var progress = 0; 

  var installTimer = setInterval(function() {
    progress += 5;
    installProgress.value = progress; 

    if (progress >= 100) {
      clearInterval(installTimer);

      installStatus.textContent = "Verity is here!";
      installButton.textContent = "Installed";
      verityHelper.style.display = "flex";
      
      speechIndex = 0; 
      veritySpeech.textContent = "Talk to me!";
      showNextQuestion(); 
    }
  }, 150);    
  
});

terms.addEventListener("change", function() {
  if(installationStarted) return;
  installButton.disabled = !terms.checked; 

  if(terms.checked) {
    installStatus.textContent = "Ready to install :D";
    installStatus.classList.add("rainbow");
  } else 
  {
    installStatus.textContent = "Please accept the terms";
    installStatus.classList.remove("rainbow");
  }

});

function updateTime() { 
  var currentTime = new Date().toLocaleString();

  document.querySelectorAll(".tyme").forEach(function(clock){
    clock.textContent = currentTime;
  });
} 

updateTime();
setInterval(updateTime, 1000);

var chatStory = {
  start: {
    messages: "hey dude ive got this really cool mod i think you should use it in your next youtube video",
    replies: [
      { text:"oh cool", next:"ik"},
      { text:"really", next:"yes"}
    ]
  },
  ik: {
    messages: "ikr? I already sent ya the installer OS, im pretty sure you already have it installed",
    replies: [
      { text:"thanks bro", next:"np"},
      { text:"huh where", next:"here"}
    ]
  },
  yes: {
    messages: "Yeah! install it!11! I send it over already!",
    replies: [
      { text:"alright! alright!", next:"nexttime"},
      { text:"where", next:"here"}
    ]
  },
  np: {
    messages: "np homie, anyway open the goshdarn thing already",
    replies: [
      { text:"on it!", next:"nexttime"}
    ]
  },
  here: {
    messages: "dude! it's the icon with the box! It says open me! ",
    replies: [
      { text:"on it!", next:"nexttime"}
    ]
  },
  nexttime: {
    messages: "We should totally hang out one of these days btw",
    replies: [
      { text:"Yeah sure when?", next:"scary"}
    ]
  },
  scary: {
    messages: "... actually never mind",
    replies: [
      { text:"what happened dude?", next:"ghosting"}
    ]
  },
  ghosting: {
    messages: "...",
    replies: [
      { text:"hello?", next:"bloc"}
    ]
  },
  bloc: {
    messages: "This User Has Blocked You",
    replies: []
  },
}

var chatMessages = document.getElementById("chatMessages");
var chatReplies = document.getElementById("chatReplies");

function addChatMessage(text, mine, blocked) {
  var message = document.createElement("p");

  message.className = "chatMessage";
  if(blocked) {
    message.classList.add("blockedMessage");
  }

  if (mine) {
    message.classList.add("mine");
  }

  message.textContent = (mine ? "You: " : "Twixxel: ")  + text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;} 
  function showChatStep(stepName) {
    var step = chatStory[stepName];

    addChatMessage(step.messages, false, stepName == "bloc");
    chatReplies.replaceChildren();

    step.replies.forEach(function(reply) {
      var button = document.createElement("button");
      button.textContent = reply.text;
      button.addEventListener("click", function() {
        addChatMessage(reply.text, true);
        showChatStep(reply.next);
      });

      chatReplies.appendChild(button);
   });
}
document.getElementById("chatClose").addEventListener("click", function() {
  closeWs(document.getElementById("chat"));
});


initializeWindow("welcome");
initializeWindow("askme");
initializeWindow("vInstaller");
initializeWindow("chat");
showChatStep("start");

