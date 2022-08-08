let toggle=document.querySelector("input[name=toggle_button]")
let checkboxes=document.querySelectorAll('input[type="radio"]')
let logo_bg=document.querySelector("div[class=svg_bg]")
let logo_fg=document.querySelector("path[class=logo_1]")
let logo_eye=document.querySelectorAll("path[class=logo_2]")
let selected_text=document.querySelector("h2[class=selected_color_text]")
let color_names=document.querySelectorAll("div[class=color_name]")

chrome.storage.local.get(["selected_color_scheme_index", "color_schemes", "scheme_order"], function (data) {
  let buttons=document.getElementsByClassName("select_scheme_label")
  let schemes=data.color_schemes
  let order=data.scheme_order
  
  for(let i=0; i<order.length; i++){
    buttons[i].style.backgroundColor=schemes[order[i]][3]
    color_names[i].innerHTML=order[i]
    if (buttons[i].hasAttribute("checked")){
      checkboxes[i].removeAttribute("checked")
    }
    
    checkboxes[i].addEventListener('click', function() {
      chrome.storage.local.set({selected_color_scheme_index: i})
      logo_bg.style.backgroundColor=schemes[order[i]][18]
      logo_fg.style.fill=schemes[order[i]][6]
      logo_fg.style.stroke=schemes[order[i]][9]
      for(let j=0; j<logo_eye.length; j++){
        logo_eye[j].style.fill=schemes[order[i]][20]
      }

      selected_text.innerHTML=order[i]
    })
  }

  for(let i=order.length; i<11; i++){
    buttons[i].style.backgroundColor="#232323"
    checkboxes[i].setAttribute('disabled', '')
    color_names[i].innerHTML="Nullity Void"
  }

  checkboxes[data.selected_color_scheme_index].setAttribute('checked', '')
  logo_bg.style.backgroundColor=schemes[order[data.selected_color_scheme_index]][18]
  logo_fg.style.fill=schemes[order[data.selected_color_scheme_index]][6]
  logo_fg.style.stroke=schemes[order[data.selected_color_scheme_index]][9]
  for(let j=0; j<logo_eye.length; j++){
    logo_eye[j].style.fill=schemes[order[data.selected_color_scheme_index]][20]
  }
 
  selected_text.innerHTML=order[data.selected_color_scheme_index]
})

// sets toggle state to previously stored state
chrome.storage.local.get({toggle_state: false}, function(data){
  toggle.checked=data.toggle_state
});

//toggle dark mode when clicking the toggle button; only works on the tab you're on (check)
toggle.addEventListener('click', function(){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        var active_tab=tabs[0]
        var message={
          toggled: toggle.checked
        }

        //stores current toggle state
        chrome.storage.local.set({toggle_state: toggle.checked})
        chrome.tabs.sendMessage(active_tab.id, message)
    });
});

//opens up the options page in another tab upon clicking the options button
document.querySelector("div[class=options_button]").addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
  } 
  else {
      window.open(chrome.runtime.getURL('option_files/options.html'));
    }
});

