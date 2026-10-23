let synth = window.speechSynthesis;
let isSpeaking = false;

function toggleSpeech() {
    const iconCircle = document.querySelector(".icon-circle");
    
    // 1. Grab your page title and the content text
    const pageTitle = document.title || "";
    const contentText = document.getElementById("content") ? document.getElementById("content").innerText : "";
    
    // 2. Combine them so it reads the title first, then the body text
    const textToRead = `${pageTitle}. ${contentText}`;

    if (!synth) {
        alert("Text-to-speech is not supported in this browser.");
        return;
    }

    if (!isSpeaking) {
        let utterance = new SpeechSynthesisUtterance(textToRead);
        
        utterance.rate = 1.0; 
        utterance.pitch = 1.0; 

        // When speech finishes, reset the button back to play
        utterance.onend = function () {
            isSpeaking = false;
            iconCircle.innerText = "▶";
        };

        synth.speak(utterance);
        isSpeaking = true;
        iconCircle.innerText = "◼"; // Changes to a stop square while playing
    } else {
        synth.cancel();
        isSpeaking = false;
        iconCircle.innerText = "▶";
    }
}