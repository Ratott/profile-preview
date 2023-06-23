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

// Fill in background
const bg_div = document.getElementById("responsive_page_template_content").querySelector(".profile_page");
bg_div_animated = bg_div.querySelector(".profile_animated_background");
currentBackground = window.getComputedStyle(bg_div).backgroundImage;
if(currentBackground != "none") {
    node.value = String(currentBackground).replace("url(\"","").replace("\")","");
    createDivs();
    bg_div_animated = bg_div.querySelector(".profile_animated_background");
}  
else {
    node.value = bg_div_animated.firstElementChild.firstElementChild.src;
}


// On new link, change background
node.onkeyup = function(){
    if(isValidLink(node.value)){
        label.textContent = 'Background:';
        label.style.color = "";
        setBackground(node.value);
    } 
    else{
        label.textContent = "Not a valid link!";
        label.style.color = "red";
    }
}

function setBackground(link){
    const fileExtension = link.substr(link.lastIndexOf('.')).toLowerCase();
    if(fileExtension == '.png' || fileExtension == '.jpg' || fileExtension == '.jpeg'){
        bg_div.style.backgroundImage = "url(\"" + link + "\")";
        bg_div_animated.style.display = "none";
    } else if(fileExtension == '.webm' || fileExtension == '.mp4'){
        bg_div_animated.style.display = "";
        bg_div_animated.firstElementChild.pause();
        srcwebm = bg_div_animated.querySelector('[type="video/webm"]');
        srcmp4 = bg_div_animated.querySelector('[type="video/mp4"]');
        if(fileExtension == '.webm'){
            srcwebm.src = link;
            srcmp4.src = "";
        } else if(fileExtension == '.mp4'){
            srcmp4.src = link;
            srcwebm.src = "";
        }
        bg_div_animated.firstElementChild.load();
        bg_div_animated.firstElementChild.play();
        bg_div.style.backgroundImage = "";
    }
}

// ChatGPT generated B)
function isValidLink(link) {
    // Regular expression pattern for URL validation
    const urlPattern = /^(?:https?:\/\/)?(?:www\.)?[^\s.]+\.[^\s]{2,}$/i;
  
    // Test the link against the pattern
    return urlPattern.test(link);
}

function createDivs(){
    const divElement = document.createElement('div');
    divElement.classList.add('profile_animated_background');
    divElement.style = '';

    const videoElement = document.createElement('video');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('poster', '');

    const sourceWebM = document.createElement('source');
    sourceWebM.setAttribute('src', '');
    sourceWebM.setAttribute('type', 'video/webm');

    const sourceMP4 = document.createElement('source');
    sourceMP4.setAttribute('src', '');
    sourceMP4.setAttribute('type', 'video/mp4');

    videoElement.appendChild(sourceWebM);
    videoElement.appendChild(sourceMP4);

    divElement.appendChild(videoElement);

    bg_div.insertBefore(divElement,bg_div.firstChild);
}