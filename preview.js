// input box
const node = document.createElement("input");
node.type = "text";
node.name = "a";
node.id = "background_area";
node.style.width = "75%";
node.onclick = function () {
    this.select();
}
// label for input box
const label = document.createElement('label');
label.textContent = 'Background:';
label.for="background_area";
label.style.userSelect = "none";

// check if input is already made 
const parent = document.getElementById("global_header"); 
const textarea = parent.querySelector('#background_area');
if(!textarea) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.marginLeft = "77%";
    div.style.paddingBottom = "5px";
    parent.appendChild(div);
    div.appendChild(label);
    div.appendChild(node);
}

// change global header height
parent.firstElementChild.style.height = "79px";

// Fill in input on loading
const bg_div = document.getElementById("responsive_page_template_content").lastElementChild;
currentBackground = window.getComputedStyle(bg_div).backgroundImage;
node.value = String(currentBackground).replace("url(\"","").replace("\")","");

// On new link, change background
node.onkeyup = function(){
    if(isValidLink(node.value)){
        label.textContent = 'Background:';
        label.style.color = "";
        bg_div.style.backgroundImage = "url(\"" + node.value + "\")";
    } 
    else{
        label.textContent = "Not a valid link!";
        label.style.color = "red";
    }
}

// ChatGPT generated B)
function isValidLink(link) {
    // Regular expression pattern for URL validation
    const urlPattern = /^(?:https?:\/\/)?(?:www\.)?[^\s.]+\.[^\s]{2,}$/i;
  
    // Test the link against the pattern
    return urlPattern.test(link);
  }