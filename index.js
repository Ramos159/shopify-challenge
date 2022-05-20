function createResponseHtml(prompt,response){
    let htmlString = `
    <div class="response"><div class="response-prompt">
        <div class="response-title">
            <p>Prompt:</p>
        </div>
        <div class="human-prompt">
            <p>${prompt}</p>
        </div>
    </div>
    <br>
    <div class="response-response">
        <div class="response-title">
            <p>Response:</p>
        </div>
        <div class="ai-response">
            <p>${response}</p>
        </div>
    </div>
</div>`

    document.querySelector(".responses-container").insertAdjacentHTML("afterbegin",htmlString)
};

function pressClear(event){
    event.preventDefault();
    const responseList = document.querySelector(".responses-container");
    while(responseList.firstChild()){
        responseList.removeChild(responseList.lastChild);
    }
}

function pressSubmit(event){
    event.preventDefault();
    // get textarea value
    const promptString = document.querySelector(".textarea").value;

    // check if its empty, if it is return
    if(!promptString){
        return;
    }
        
    const data = {
        prompt:promptString
    };
    
    fetch("http://localhost:3000/getResponse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response)=>response.json())
    .then((responseData)=>{
        createResponseHtml(promptString,responseData);
    });
};

window.onload = (event) =>{
    document.querySelector(".submit-button").addEventListener("click", pressSubmit);
    document.querySelector(".clear-button").addEventListener("click", pressClear);
};