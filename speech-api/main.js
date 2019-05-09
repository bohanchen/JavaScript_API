function speech_to_text(){
    //init speech to text API
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true
    recognition.lang = "en-US"
    console.log(recognition)
    let p = document.createElement("p")
    const words =  document.querySelector(".words")
    words.appendChild(p)
    
//    console.log(p)
    
    recognition.addEventListener('result', e=>{
        console.log(e.results[0].isFinal)
        const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
        console.log(transcript)
        if(e.results[0].isFinal){
            p = document.createElement('p')
            words.appendChild(p)
        }
        p.textContent = transcript;
    })
    
    
//    recognition.start();     
}

speech_to_text();

function text_to_speech(){
    
    //init speechSynth API
    const synth = window.speechSynthesis
    
    let voices = []
    
    const getVoices = () =>{
        voices = synth.getVoices()
        console.log(voices)
        
        //Loop through voices and created an option for each one
        voices.forEach(voice => {
            //create option elements
            const option = document.createElement('option');
            //Fill the option with voice and language
            option.textContent = voice.name + '('+voice.lang+')'
            
        })
    }
    getVoices()
    
    if(synth.onvoiceschanged !== undefined){
        synth.onvoiceschanged = getVoices;
    }
    
    //speak
    const speak = ()=>{
        
        if(synth.speaking){
            console.error("Alreay speaking..")
            return
        }
        
//        if(let textInput.value !== ''){
            const speakText = new SpeechSynthesisUtterance("Testing Testing Testing")
//        }
        
        speakText.onend = e =>{
            console.log('Done Speaking... ')
        }
        
        speakText.onerror = e =>{
            console.error('Something went wrong')
        }
        
        const selectedVoice = voiceSelect.selectedOption[0]
        synth.speak(speakText);
    }
    
//    speak()
    
}
text_to_speech()



