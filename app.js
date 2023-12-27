const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdown =document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".button");
const amount = document.querySelector("form input");
const fromcurr= document.querySelector(".form select");
const tocurr= document.querySelector(".to select");
const msg=document.querySelector(".msg p");
//var newOption= document.querySelectorAll(".dropdown option");


for(let select of dropdown){
    for(let code in countryList){
         let newOption=document.createElement("option");
         newOption.innerText=code;
         //newOption.value=code;
         if(select.name === "from" && code === "USD"){
            newOption.selected="selected";
         }else if (select.name === "to" && code === "INR"){
            newOption.selected = "selected";
         }
         select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
     updateflag(evt.target);
    })
}

const updateflag = (element)=>{
    let currnyCode = element.value;
    let countryCode= countryList[currnyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;


}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();   //jo v kam hoga wo hum krege;
    if(amount.value < 1 || amount.value===""){
        amount.value= 1;
    }

    const URL= `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    
    let data = await response.json();
    let newAmount= data[tocurr.value.toLowerCase()];
    let finalAmount = amount.value * newAmount;

    msg.innerText= `${amount.value}${fromcurr.value}=${finalAmount}${tocurr.value}`;
});
