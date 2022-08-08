import {Solver} from "./hex_to_filter.js";

let preset_color=[]
let delete_ind=0
let temp_colors=document.querySelectorAll("input[name=color_input]")
let temp_colors_squares=document.querySelectorAll("div[class=show_color]")
let del_colors=document.querySelectorAll("label[class=select_scheme_label]")
let del_radio=document.querySelectorAll("input[name=color_scheme_options]")
let del_spans=document.querySelectorAll("span[class=select_scheme")
let del_button=document.querySelector("button[class=delete_scheme_button]")
let body_element=document.querySelector("body")
let color_names=document.querySelectorAll("div[class=color_name]")

function validate_hex(hex) {
    let hex_regex=/#[0-9a-fA-F]{6}/
    let is_valid = hex_regex.test(hex) && (hex.length == 7)
    return is_valid
}
function validate_filter(filter) {
    let is_valid = filter=="1" || filter=="0"
    return is_valid
}
function open_name_popup(){
    document.querySelector("button[class=save_scheme]").addEventListener("click", function(){
        let avl_colors=[]
        let err_num = 0
        if (validate_filter(temp_colors[0].value)){
            avl_colors.push(temp_colors[0].value)
            error_msgs[0].className="no_error"
        }
        else{
            err_num+=1
            error_msgs[0].className="error"
        }
    
        for(let i=1; i<temp_colors.length; i++){
            if(validate_hex(temp_colors[i].value)){
                avl_colors.push(temp_colors[i].value)
                error_msgs[i].className="no_error"
            }
            else{
                err_num+=1
                error_msgs[i].className="error"
            }
        }
    
        //open name popup
        if (err_num==0){
            name_popup.style.display="flex";
            body_element.style.overflow="hidden";
            name_popup.setAttribute("aria-hidden", "false")
    
            const icon_filter=new Solver(avl_colors[20]).solve()
            const main_text_filter=new Solver(avl_colors[1]).solve()
            const main_hover_bg_filter=new Solver(avl_colors[9]).solve()
            const popup_text_filter=new Solver(avl_colors[7]).solve()
            avl_colors.push(icon_filter, main_text_filter, main_hover_bg_filter, popup_text_filter)
    
            preset_color=avl_colors
        }
    })
}

//initialize page
body_element.onload=function(){

    chrome.storage.local.get(["selected_color_scheme_index", "color_schemes", "scheme_order"], function(data){
        
        let color_list=data.color_schemes[data.scheme_order[data.selected_color_scheme_index]];
        temp_colors[0].value=color_list[0]
        temp_colors_squares[0].style.backgroundColor=(color_list[0]=="1" ? "#000000":"#FFFFFF")
        temp_colors[0].addEventListener("input", function(){
            if(temp_colors[0].value=="1"){
                temp_colors_squares[0].style.backgroundColor="#000000"
            }
            else if(temp_colors[0].value=="0"){
                temp_colors_squares[0].style.backgroundColor="#FFFFFF"
            }
            else{
                temp_colors_squares[0].style.backgroundColor="#FF0000"
            }
        })
        for(let i=1; i<temp_colors.length; i++){
            temp_colors[i].value=color_list[i]
            temp_colors_squares[i].style.backgroundColor=color_list[i]
            temp_colors[i].addEventListener("input", function(){
                temp_colors_squares[i].style.backgroundColor=temp_colors[i].value
            })
        }

        // colors and names of delete colors
        for(let i=6; i<data.scheme_order.length; i++){
            del_colors[i-6].style.backgroundColor=data.color_schemes[data.scheme_order[[i]]][3]
            del_radio[i-6].removeAttribute("disabled")
            color_names[i-6].innerHTML=data.scheme_order[i]
            del_spans[i-6].addEventListener("click", function(){
                del_button.style.display="flex"
                delete_ind=i
            })
        }
        for(let i=data.scheme_order.length; i<11; i++){
            del_colors[i-6].style.backgroundColor="#232323"
            del_radio[i-6].setAttribute("disabled","")
            color_names[i-6].innerHTML="Nullity Void"
        }

        if(data.scheme_order.length==11){
            document.querySelector("div[class^=preset_amt]").className="preset_amt error"
        }
        else{
            open_name_popup()
        }
    })
}

//temporarily save scheme
let error_msgs=document.querySelectorAll("div[class$=error]")
let flash_msg=document.querySelector("div[id=saved_flash_msg]")
document.querySelector("button[class=test_scheme]").addEventListener("click", function(){
    let avl_colors=[]
    let err_num = 0
    if (validate_filter(temp_colors[0].value)){
        avl_colors.push(temp_colors[0].value)
        error_msgs[0].className="no_error"
    }
    else{
        err_num+=1
        error_msgs[0].className="error"
    }

    for(let i=1; i<temp_colors.length; i++){
        if(validate_hex(temp_colors[i].value)){
            avl_colors.push(temp_colors[i].value)
            error_msgs[i].className="no_error"
        }
        else{
            err_num+=1
            error_msgs[i].className="error"
        }
    }

    //save to storage
    if (err_num==0){
        const icon_filter=new Solver(avl_colors[20]).solve()
        const main_text_filter=new Solver(avl_colors[1]).solve()
        const main_hover_bg_filter=new Solver(avl_colors[9]).solve()
        const popup_text_filter=new Solver(avl_colors[7]).solve()
        avl_colors.push(icon_filter, main_text_filter, main_hover_bg_filter, popup_text_filter)

        chrome.storage.local.set({selected_color_scheme_index: 5})
        chrome.storage.local.get(["color_schemes"], function(data){
            let schemes=data.color_schemes;
            schemes["Nullity Temporalis"]=avl_colors;
            chrome.storage.local.set({color_schemes: schemes})
        })

        flash_msg.className="saved_flash_msg show"
        setTimeout(function(){
            flash_msg.className="saved_flash_msg hide"
        }, 50)
    }
})

//close name popup
let name_popup=document.querySelector("div[class=popup_cover]")

document.querySelector("div[class=close]").addEventListener("click", function(){
    name_popup.style.display="none";
    body_element.style.overflow="visible";
    name_popup.setAttribute("aria-hidden", "true")
})


//add scheme to preset list
let new_scheme_name=document.querySelector("input[name=preset_name]")
document.querySelector("input[name=save_button]").addEventListener("click", function(){
    console.log('aaaa')
    console.log(preset_color)
    let new_name=new_scheme_name.value.trim()
    if (new_name.length==0){
        new_name="Nullity Prime"
    }
    else if(new_name=="Nullity Prime" || new_name=="Nullity Void"){
        new_name="Nullity Septis"
    }

    chrome.storage.local.get(["selected_color_scheme_index", "color_schemes", "scheme_order"], function(data){
        let scheme_ord=data.scheme_order
        let color_sche=data.color_schemes
        if(!(scheme_ord.includes(new_name))){
            scheme_ord.push(new_name)
        }
        color_sche[new_name]=preset_color
        chrome.storage.local.set({color_schemes: color_sche})
        chrome.storage.local.set({scheme_order: scheme_ord})
        chrome.storage.local.set({selected_color_scheme_index: scheme_ord.length-1})
    })

    window.location.reload(true);
})

//delete scheme
del_button.addEventListener("click", function(){
    chrome.storage.local.get(["selected_color_scheme_index","color_schemes","scheme_order"], function(data){

        chrome.storage.local.set({selected_color_scheme_index:1})
    
        let scheme_dict = data.color_schemes
        let scheme_list = data.scheme_order
        delete scheme_dict[scheme_list[delete_ind]]
        let new_list = []
        for(let i=0; i<scheme_list.length; i++){
            if(i!=delete_ind){
                new_list.push(scheme_list[i])
            }
        }

        chrome.storage.local.set({color_schemes:scheme_dict})
        chrome.storage.local.set({scheme_order:new_list})
    })
    window.location.reload(true);
})
