//GENERAL INFO: have to reload extension and page for colors to change on popup
//create style object
var doc_style = document.createElement('style')

//darken a hex color by some factor
function darken (hex, dark_factor){
  let r_val=Math.round(parseInt(hex.slice(1,3),16)*dark_factor)
  let g_val=Math.round(parseInt(hex.slice(3,5),16)*dark_factor)
  let b_val=Math.round(parseInt(hex.slice(5),16)*dark_factor)

  let r_hex=r_val.toString(16)
  let g_hex=g_val.toString(16)
  let b_hex=b_val.toString(16)
  return `#${r_hex}${g_hex}${b_hex}`
}

//preset color_schemes
let default_dark=['1', '#CCCCCC', '#CCCCCC', '#121212', '#EEEEEE', '#BBBBBB', '#090909', '#CCCCCC', '#CCCCCC', '#232323', '#B5B5B5', '#CCCCCC', '#232323', '#DDDDDD', '#AbAbAb', '#343434', '#C5C5C5', '#777777', '#454545', '#CCCCCC', '#CCCCCC', '#545454', '#AAAAAA', '#000000', '#090909', 'brightness(0) saturate(100%) invert(90%) sepia(3%) saturate(10%) hue-rotate(3deg) brightness(94%) contrast(85%);', 'brightness(0) saturate(100%) invert(94%) sepia(0%) saturate(27%) hue-rotate(131deg) brightness(90%) contrast(82%);', 'brightness(0) saturate(100%) invert(14%) sepia(10%) saturate(14%) hue-rotate(25deg) brightness(100%) contrast(103%);', 'brightness(0) saturate(100%) invert(69%) sepia(0%) saturate(2776%) hue-rotate(337deg) brightness(123%) contrast(83%);']
let default_abyss=['1', '#1fccb5', '#1cc0aa', '#0e0c26', '#22e6a5', '#158c7c', '#0a081a', '#19a677', '#1cc0aa', '#231c59', '#1fcc92', '#1cc0aa', '#0f0c26', '#1cba85', '#1fcc92', '#271e61', '#21de9f', '#19a677', '#2f2473', '#1fcc92', '#1cc0aa', '#382b8c', '#19a677', '#191440', '#0e081a', 'brightness(0) saturate(100%) invert(55%) sepia(94%) saturate(375%) hue-rotate(122deg) brightness(93%) contrast(89%);', 'brightness(0) saturate(100%) invert(55%) sepia(100%) saturate(345%) hue-rotate(123deg) brightness(100%) contrast(91%);', 'brightness(0) saturate(100%) invert(10%) sepia(21%) saturate(7395%) hue-rotate(237deg) brightness(92%) contrast(97%);', 'brightness(0) saturate(100%) invert(53%) sepia(27%) saturate(6297%) hue-rotate(129deg) brightness(92%) contrast(80%);']
let default_fire=['1', '#f2c83f', '#ffa742', '#660803', '#fcdc6d', '#b3942e', '#4d0000', '#f2c83f', '#d4af37', '#660000', '#b3942e', '#d4af37', '#400000', '#fcdc6d', '#c47418', '#660904', '#cca935', '#a66214', '#750b05', '#f2c83f', '#ffa742', '#8c0d06', '#b3942e', '#990c05', '#4d0000', 'brightness(0) saturate(100%) invert(74%) sepia(77%) saturate(793%) hue-rotate(324deg) brightness(99%) contrast(104%);', 'brightness(0) saturate(100%) invert(79%) sepia(65%) saturate(513%) hue-rotate(346deg) brightness(99%) contrast(91%);', 'brightness(0) saturate(100%) invert(15%) sepia(19%) saturate(6451%) hue-rotate(339deg) brightness(94%) contrast(125%);', 'brightness(0) saturate(100%) invert(91%) sepia(88%) saturate(1557%) hue-rotate(324deg) brightness(100%) contrast(90%);']
let default_forest=['1', '#c5ab84', '#a97142', '#182e14', '#e6c89a', '#a97142', '#0b1708', '#a97142', '#c5ab84', '#214718', '#cc8850', '#c5ab84', '#12240f', '#ba7c49', '#8c5d37', '#2b5926', '#e6995a', '#593b23', '#386e2e', '#c5ab84', '#a97142', '#295222', '#998567', '#20401b', '#0b1708', 'brightness(0) saturate(100%) invert(49%) sepia(11%) saturate(2174%) hue-rotate(345deg) brightness(93%) contrast(87%);', 'brightness(0) saturate(100%) invert(86%) sepia(7%) saturate(1632%) hue-rotate(352deg) brightness(82%) contrast(85%);', 'brightness(0) saturate(100%) invert(22%) sepia(55%) saturate(491%) hue-rotate(63deg) brightness(93%) contrast(100%);', 'brightness(0) saturate(100%) invert(45%) sepia(37%) saturate(703%) hue-rotate(345deg) brightness(98%) contrast(81%);']
let default_ocean=['1', '#c9c8cc', '#bab2d9', '#071933', '#e2e1e6', '#bab2d9', '#0e1521', '#aea7cc', '#c9c8cc', '#1f304d', '#c4bce6', '#c9c8cc', '#101826', '#c8baff', '#a984b3', '#1f304d', '#b4a8e6', '#84688c', '#2b4166', '#b0afb3', '#bab2d9', '#20304d', '#8a898c', '#091f40', '#0e1521', 'brightness(0) saturate(100%) invert(78%) sepia(19%) saturate(356%) hue-rotate(212deg) brightness(91%) contrast(92%);', 'brightness(0) saturate(100%) invert(94%) sepia(7%) saturate(92%) hue-rotate(214deg) brightness(87%) contrast(86%);', 'brightness(0) saturate(100%) invert(13%) sepia(89%) saturate(474%) hue-rotate(179deg) brightness(92%) contrast(88%);', 'brightness(0) saturate(100%) invert(78%) sepia(14%) saturate(505%) hue-rotate(211deg) brightness(87%) contrast(86%);']


//initializing chrome storage
chrome.storage.local.get(null, function(items) {
  var key_list = Object.keys(items);
  console.log(key_list);
  if(!(key_list.includes("scheme_order"))){
    console.log("not there")
    chrome.storage.local.set({selected_color_scheme_index: 0})
    chrome.storage.local.set({scheme_order: ["Fall Into Darkness", "Enraptured by the Abyss","Vermillion Immolation of Krakatoa","Verdant Blight of Gaia","Cerulean Maelstrom of Erasmus","Nullity Temporalis"]})
    chrome.storage.local.set({color_schemes: {"Fall Into Darkness": default_dark, "Enraptured by the Abyss":default_abyss, "Vermillion Immolation of Krakatoa":default_fire,"Verdant Blight of Gaia":default_forest,"Cerulean Maelstrom of Erasmus":default_ocean,"Nullity Temporalis":default_dark}})
    chrome.storage.local.set({toggle_state: false})
    console.log("now it's there")
  }
  else{
    console.log("already there")
  }
})

//create a style string
function make_style(){
  chrome.storage.local.get(["selected_color_scheme_index", "color_schemes", "scheme_order"], function(color_data){
    let color_list=color_data.color_schemes[color_data.scheme_order[color_data.selected_color_scheme_index]]

    let doc_invert = color_list[0];

    let main_bg = color_list[3]
    let sub_bg = color_list[6]
    let main_hover_bg = color_list[9]
    let popup_bg_1 = color_list[12]
    let popup_bg_2 = color_list[15]
    let popup_hover_bg_1 = color_list[18]
    let popup_hover_bg_2 = color_list[21]
    let comment_bg = color_list[23]
    let ruler_bg = color_list[24]
    
    let main_text = color_list[1]
    let main_hover_text = color_list[4]
    let popup_text_1 = color_list[7]
    let popup_text_2 =color_list[10]
    let popup_hover_text_1 = color_list[13]
    let popup_hover_text_2 = color_list[16]
    let comment_text_1 = color_list[19]
    let comment_text_2 = color_list[22]

    let main_border = color_list[2]
    let popup_border = color_list[5]
    let ruler_div = color_list[8]
    let ruler_num = color_list[11]
    let scroll_bg = color_list[14]
    let scroll_hover_bg = color_list[17]
    let icon_color = color_list[20]

    let icon_color_filter = color_list[25]
    let main_text_filter = color_list[26]
    let main_hover_bg_filter = color_list[27]
    let popup_text_1_filter = color_list[28]

    let main_text_darkened=darken(main_text, 0.8)
    let popup_text_1_darkened=darken(popup_text_1, 0.8)
    let comment_text_1_darkened = darken(comment_text_1, 0.8)

    
    //document canvas
    // doc_style.innerHTML=`.kix-page-paginated {filter: invert(${doc_invert});}`
    let style_string=`.kix-page-paginated {filter: invert(${doc_invert});}`

    //main
    style_string+=`.kix-appview-editor {background-color: ${main_bg} !important;}`

    //scrollbar
    style_string+=`.docs-gm ::-webkit-scrollbar-thumb {background-color: ${scroll_bg} !important;}`+
    `::-webkit-scrollbar-thumb:hover {background-color: ${scroll_hover_bg} !important}`

    //top
    style_string+=`#docs-chrome {background-color: ${sub_bg} !important;}`+
    `.docs-titlebar-buttons {background-color: ${sub_bg} !important;}`

    //menu bar
    style_string+=`.goog-menu, .goog-menuitem {background-color: ${sub_bg} !important;color: ${main_text} !important;}`+ //all list bg and color
    `.goog-menuitem-icon {background-color: ${sub_bg} !important;}`+ //all list icon bg
    `.menu-button {color: ${main_text} !important;}`+
    `.goog-menuitem-highlight .goog-menuitem-content, .goog-control-hover, .goog-control-open {color: ${main_hover_text} !important;}`+
    `.goog-menuitem-highlight>* {color: ${main_hover_text} !important;}`+
    `.goog-option>* {color: ${main_text} !important;}`+
    `.docs-gm .goog-menuitem-highlight{border: none; background-color: ${main_hover_bg} !important; color: ${main_hover_text} !important;}`+
    `.docs-omnibox-input {background-color: ${sub_bg} !important; border: 1px solid ${main_text} !important; color: ${main_text} !important;}`+
    `.docs-omnibox-input::placeholder {color: ${main_text_darkened} !important;}`+
    // `#docs-docos-commentsbutton {background-color: yellow !important;}`+
    `#docs-meet-in-editors-entrypointbutton {background: ${sub_bg}; border: 1px solid ${main_border} !important}`+
    `.docs-title-input, .docs-title-input-label {background-color: ${sub_bg} !important; color: ${main_text} !important;}`+
    `.docs-title-input:hover {border-color: transparent !important;}`+
    `.docs-gm .docs-titlebar-badge:hover, .docs-titlebar-badge.goog-flat-button-focused, .docs-titlebar-badge.goog-control-focused, .goog-control-focused .docs-titlebar-badge {background-color: ${main_hover_bg} ;outline: none;}`+
    `.docs-title-save-label {color: ${main_text_darkened} !important;}`+
    `.docs-gm #docs-titlebar-share-client-button .jfk-button {background: ${sub_bg}; border: 1px solid ${main_border} !important; color: ${icon_color} !important;}`+
    `.docs-gm #docs-titlebar-share-client-button .jfk-button.jfk-button-hover {background: ${main_hover_bg} !important;}`+
    `.docs-material #docs-docos-commentsbutton.jfk-button.jfk-button-hover, .docs-gm .docs-menubar .goog-control-hover, .docs-gm .docs-menubar .goog-control-open {background-color: ${main_hover_bg} !important;}`+
    `.docs-gm .docs-material.goog-menu .apps-menuitem.goog-option-selected .goog-menuitem-checkbox, .docs-material .docs-icon, .docs-material .goog-color-menu-button-indicator .docs-icon, .docs-material .sketchy-toolbar-color-menu-button .goog-toolbar-menu-button-caption .docs-icon {filter: ${icon_color_filter} !important;}`+
    `.docs-material .docs-icon {background: transparent !important;}`+
    `.docs-gm .docs-title-input:focus {border: 2px solid ${main_text} !important;}`+
    `.docs-title-input {border: 2px solid transparent !important;}`+
    `.apps-share-sprite {filter: ${icon_color_filter} !important;}`+
    // `.docs-material #docs-titlebar-share-client-button .jfk-button.jfk-button-clear-outline {color: red !important; border-color: green !important;}`+
    `.docs-parent-collections-container:hover {background-color: ${main_hover_bg};}`+
    `.docs-parent-collections-container-folder-name {color: ${icon_color};}`+
    `.docs-gm .goog-menuitem-accel, .docs-gm .goog-menuitem-disabled .goog-menuitem-accel {color: ${main_text_darkened};}`+
    `.docs-gm .goog-menuitem-accel:hover, .docs-gm .goog-menuitem-disabled .goog-menuitem-accel:hover {color: ${main_hover_text} !important;}`+
    `#docs-meet-in-editors-entrypointbutton.goog-flat-menu-button-hover {background: ${main_hover_bg} !important;}`+
    `.docs-omnibox-autocomplete .ac-renderer {background-color: ${sub_bg};}`+
    `.docs-gm .docos-streampane-header {background-color: ${popup_bg_1} !important; border-bottom: 1px solid ${popup_border} !important;}`+
    `.docs-gm .docos-new-comment-button.jfk-button-disabled, .docos-enable-docs-header .docos-stream-view-height {background: ${popup_bg_1};}`+
    `.docs-gm.docos-xeditor .docos-streamdocoview-content {background-color: ${comment_bg}; border-radius: 6px;}`+
    `.docos-xeditor .docos-streamdocoview-header-container, .docs-gm.docos-xeditor .docos-streamdocoview {border: 2px solid transparent; background: ${popup_bg_2};}`+
    `.docs-gm.docos-xeditor .docos-streamdocoview:hover {background-color: ${popup_hover_bg_1}; border: 2px solid ${popup_hover_bg_1} !important;}`+
    `.docos-xeditor .docos-streamdocoview:hover .docos-streamdocoview-header-container {background-color: ${popup_hover_bg_1}; color: ${popup_hover_text_1} !important;}`+
    `.docs-gm.docos-xeditor .docos-streamdocoview-authorname-timestamp .docos-streamdocoview-author {color: ${comment_text_1};}`+
    `.docs-gm.docos-xeditor .docos-streamdocoview-authorname-timestamp .docos-streamdocoview-timestamp {color: ${comment_text_2};}`+
    `.docos-streamdocoview-body, .docos-streamreplyview-body {color: ${comment_text_1};}`+
    `.docos-xeditor .streamdocoview-header-quote-container, .docos-xeditor .streamdocoview-header-divider-container, .docos-xeditor .streamdocoview-header-location-container.header-with-quote {color: ${popup_text_2};}`+
    `.docs-gm .docos-streamdocoview-input-pane .docos-input-textarea {border: 1px solid ${comment_text_1_darkened}; color: ${comment_text_1}; background-color: ${comment_bg};}`+
    `.docos-input-contenteditable:empty:before {color: ${comment_text_1_darkened} !important;}`+
    `.docs-gm.docos-xeditor .docos-input-typing>.docos-input-textarea {background-color: ${comment_bg};}`+
    `.docs-gm .docos-streamdocoview-input-pane .docos-input-textarea:focus {border: 2px solid ${comment_text_1};}`+
    `.docos-xeditor .docos-streampane-content .docos-comment-text.docos-comment-header-title {color: ${popup_text_1};}`+
    `.docos.docs-gm.docos-xeditor .docos-streamdocoview.docos-docoview-active {border: 2px solid ${popup_hover_bg_1}}`+
    `.docos-xeditor .docos-streamdocoview.docos-docoview-active .docos-streamdocoview-header-container {background-color: ${popup_hover_bg_1} !important;}`+
    `.docs-gm.docos-xeditor .streamdocoview-no-header.docos-streamdocoview {border: 1px solid ${popup_bg_2};}`+
    `.docs-gm .docos-streamreplyview .docos-action-text {color: ${comment_text_2}; opacity: 1;}`+
    `.docos.docs-gm.docos-xeditor .streamdocoview-no-header.docos-streamdocoview.docos-docoview-active {border: 1px solid ${popup_hover_bg_1};}`+
    `span[style="font-weight:bold"] {color: ${comment_text_1};}`+
    `span[style="white-space:pre-line;color:#777;font-style:italic"] {color: ${comment_text_2} !important;}`+
    `.docs-gm.docos-xeditor .docos-new-comment-icon-path, .docs-gm.docos-xeditor .docos-gm-notification-icon-path {fill: ${icon_color};}`+
    `.docs-gm.docos-xeditor .docos-new-comment-button.jfk-button-hover, .docs-gm.docos-xeditor .docos-notification-settings .goog-flat-menu-button.goog-flat-menu-button-hover {background-color: ${popup_hover_bg_2};}`+
    `.docs-gm .docos-streampane-container .streampane-dragger:hover {background-color: ${popup_hover_bg_2}; border-radius: 0 0 4% 4%/100%;}`+
    `.docs-gm .docos-streampane-container .streampane-dragger {border-color: ${popup_border}; border-radius: 0 0 4% 4%/100%; background-color: ${popup_hover_bg_2};}`+
    `.docs-gm .docos-filter-settings .docs-material-menu-button-flat-default, .docs-gm .docos-filter-settings .docs-material-menu-button-flat-default-focused {color: ${popup_text_1}; background: ${popup_bg_1} !important; border: 1px solid ${popup_border};}`+
    `.docs-gm .docos-filter-settings .docs-material-menu-button-flat-default-hover {color: ${popup_hover_text_2} !important; background: ${popup_hover_bg_2} !important;}`+
    `.docs-gm .docos-filter-settings .docs-material-menu-button-flat-default-focused .docs-material-menu-button-flat-default-dropdown-icon, .docs-gm .docos-filter-settings .docs-material-menu-button-flat-default-dropdown-icon {fill: ${popup_text_1};}`+
    `.docs-gm .docos-filter-settings .docs-material-menu-button-flat-default-hover .docs-material-menu-button-flat-default-dropdown-icon {fill: ${popup_hover_text_2};}`+
    `.docos.docs-gm .jfk-button.jfk-button-action.jfk-button-disabled, .docos.docs-gm .jfk-button.jfk-button-action {background-color: ${comment_bg}; color: ${comment_text_1};}`+
    `.docos.docs-gm .jfk-button.jfk-button-standard {color: ${comment_text_1}; background: ${comment_bg}; border-color: ${comment_text_1} !important;}`+ 
    `.docos.docs-gm .jfk-button.jfk-button-action.jfk-button-hover {color: ${popup_hover_text_2} !important; background: ${popup_hover_bg_2} !important;}`+
    `.docos.docs-gm .jfk-button.jfk-button-standard.jfk-button-hover {color: ${popup_hover_text_2}; background: ${popup_hover_bg_2}; border-color: ${popup_hover_text_2} !important;}`+
    `.goog-dimension-picker div.goog-dimension-picker-highlighted {filter: ${main_hover_bg_filter} !important;}`+
    `.goog-dimension-picker-unhighlighted {filter: ${icon_color_filter} !important;}`+
    `.gb_A:hover {background-color: ${main_hover_bg} !important;}`+
    `docs-parent-collections-container-text {color: transparent;}`+
    `.docos.docs-gm .jfk-button.jfk-button-action.jfk-button-disabled, .docos.docs-gm .jfk-button.jfk-button-action, .docos.docs-gm .jfk-button.jfk-button-action.jfk-button-hover {border-color: ${comment_text_1} !important;}`+
    `.docos.docs-gm.docos-xeditor .docos-streamdocoview.docos-docoview-active {background: ${popup_hover_bg_1}}`+
    `.docos.docs-gm .jfk-button-hover {background-color: ${popup_hover_bg_2};}`

    //comment
    style_string+=`.docs-suggestion-button.jfk-button-disabled .docs-material .docs-icon-img, .docs-gm .docos-icon-overflow-three-dots, .docs-suggestion-button:not(.jfk-button-disabled) .docs-material .docs-icon-img {filter: ${icon_color_filter};}`+
    `.docs-gm .docos-anchoreddocoview .docos-anchoredreplyview, .docs-gm .docos-anchoreddocoview .docos-replyview-first.docos-anchoredreplyview, .docs-gm .docos-anchoreddocoview-internal {background-color: ${comment_bg};}`+
    `.docs-gm .docos-anchoreddocoview .docos-anchoredreplyview {border-color: ${comment_text_1};}`+
    `.docs-gm .docos-layout-anchored-auto-resize .docos-anchoreddocoview {background: ${popup_bg_2} !important;}`+
    `.docs-gm .docos-anchoredreplyview .docos-anchoredreplyview-body, .docs-gm .docos-anchoredreplyview-header .docos-anchoredreplyview-author {color: ${comment_text_1};}`+
    `.docs-gm .docos-anchoredreplyview-header .docos-anchoredreplyview-timestamp {color: ${comment_text_2};}`+

    `.docs-gm .docos-anchoreddocoview-input-pane {background-color: ${comment_bg}; border-top: 1px solid ${comment_bg};}`+
    `.docs-gm .docos-input-textarea {border: 1px solid transparent; border-radius: 4px; color: ${comment_text_1} !important;background: ${comment_bg}; border-color: ${comment_text_1_darkened}}`+
    `.docs-gm .docos-input-textarea:focus {border: 2px solid ${comment_text_1};}`+
    `.docos-showrepliesbutton-collapsed {color: ${comment_text_1}; background: ${comment_bg};}`+
    `.docs-gm .docos-anchoreddocoview .docos-showrepliesbutton-collapsed-internal {background: ${comment_bg};}`+
    `.docos-anchoreddocoview .docos-showrepliesbutton-line {border-top: 1px solid ${comment_text_1};}`

    //instant bubble
    style_string+=`#docs-instant-bubble {border: 1px solid ${popup_border};background: ${popup_bg_1};}`+
    `#docs-instant-bubble:hover {background: ${popup_bg_1};}`+
    `.instant-button:hover {background: ${popup_hover_bg_1};}`

    //ruler
    style_string+=`.docs-ruler {background-color: ${ruler_bg} !important;border-bottom: 1px solid ${ruler_bg} !important;}`+
    `.docs-ruler-face {background-color: ${ruler_bg} !important;}`+
    `.docs-vertical-ruler {border-right: 1px solid ${ruler_bg} !important;}`+
    `.docs-gm .docs-horizontal-ruler .docs-ruler-face-minor-division, .docs-gm .docs-horizontal-ruler .docs-ruler-face-major-division {border-left: 1px solid ${ruler_div};}`+
    `.docs-ruler-face-number {color: ${ruler_num} !important;}`+
    `.docs-gm .docs-vertical-ruler .docs-ruler-face-minor-division, .docs-gm .docs-vertical-ruler .docs-ruler-face-major-division{border-top: 1px solid ${ruler_div};}`

    //outline
    style_string+=`.navigation-widget {background-color: ${popup_bg_1} !important;}`+
    `.navigation-widget-hat-title, .navigation-item-content {color: ${popup_text_2} !important;}`+
    `.outline-refresh.navigation-widget-unified-styling .location-indicator-highlight.goog-button-hover,.outline-refresh.navigation-widget-unified-styling .location-indicator-highlight.navigation-item.goog-button-hover .navigation-item-level-0 {color: ${popup_hover_text_1} !important; background-color: ${popup_hover_bg_1} !important; border-radius: 5px !important;}`+
    `.outline-refresh.navigation-item.goog-button-hover, .outline-refresh .navigation-item.goog-button-hover .navigation-item-level-0 {color: ${popup_hover_text_1} !important; background-color: ${popup_hover_bg_1} !important; border-radius: 5px !important;}`+
    `.navigation-widget-header {color: ${popup_text_1} !important}`+
    `.kix-smart-summary-text-container {color: ${popup_text_1} !important}`+
    `.kix-smart-summary-view .jfk-button:focus, .kix-smart-summary-view .jfk-button:hover {background-color: ${popup_hover_bg_2} !important}`+
    `.kix-smart-summary-view-separator {background-color: ${popup_text_1} !important;}`+
    `.kix-smart-summary-text-container.kix-smart-summary-edit-summary-text-input {border-color: ${popup_text_1};}`+
    `.kix-smart-summary-text-container.kix-smart-summary-edit-summary-text-input::placeholder {color: ${popup_text_1_darkened} !important;}`

    //explore
    style_string+=`.docs-explore-sidebar-title {border-top: 1px solid ${popup_border};border-color: ${popup_border} !important;}`+
    `.docs-explore-sidebar>* {background-color: ${popup_bg_1} !important;color: ${popup_text_1} !important;}`+
    `.docs-explore-searchbar-labelinput, .docs-explore-searchbar-ac-row {background-color: ${popup_bg_2} !important;color: ${popup_text_1} !important;}`+ //placeholder?
    `.docs-sidebar-gm-titlebar-icon-button:hover {background-color: ${popup_hover_bg_2};}`+

    `.docs-explore-tabbar-tab-selected .docs-explore-tabbar-tab-label {color: ${popup_text_1};}`+
    `.docs-explore-tabbar-tab-selected {border-bottom: 2px solid ${popup_text_1};}`+
    `.docs-explore-tabbar-tab-label {color: ${popup_text_2};}`+
    `.docs-gm .docs-explore-web-serp {filter: invert(${doc_invert});}`+
    `.docs-explore-widget{background-color: ${popup_bg_1} !important;}`+
    `.docs-explore-widget-open .docs-explore-widget-text {opacity: 1; color: ${icon_color}}`+
    `.docs-gm .docs-gm-sidebar-icon-path {fill: ${icon_color};}`+
    `.docs-explore-card {background-color: ${popup_bg_1};}`+
    `.docs-gm .docs-explore-card-title-heading, .docs-gm .docs-explore-card-more-button {color: ${popup_text_1};}`+
    `.docs-explore-topicitem-title {color: ${popup_text_1};}`+
    `.docs-explore-topicitem-generator-text {color: ${popup_text_2};}`+
    `.docs-explore-sidebar {background-color: ${popup_bg_1};}`+
    `.docs-explore-searchbar-ac-renderer {border-bottom: 1px solid ${popup_border};border-top: 2px solid ${popup_border};}`+
    `path[class="undefined"] {fill: ${icon_color};}`+
    `.docs-explore-topicitem.goog-control-hover {background-color: ${popup_hover_bg_1};}`+
    `.docs-explore-topicitem {border-bottom: 1px solid ${popup_border}; background-color: ${popup_bg_2};}`

    //addons
    style_string+=`.companion-app-switcher-container, .docs-companion-app-switcher-container {background-color: ${popup_bg_1} !important;border: none !important;}`+ 
    `.app-switcher-button-icon-container {background-color: ${popup_bg_2};}`+
    `.app-switcher-button-icon-container:hover {background-color: ${popup_hover_bg_1} !important;}`+
    `.app-switcher-button-hover .app-switcher-button-icon-background, .app-switcher-button-open.app-switcher-button-icon-background, .companion-theme-light .app-switcher-button-selected .app-switcher-button-icon-background, .companion-theme-light .app-switcher-button-focused .app-switcher-button-icon-background {background-color: transparent !important}`+
    `.agca-gab-yellow .agca-gab-icon-selection-indicator {background-color: ${popup_hover_bg_2} !important;}`+
    `.agca-gab-blue .agca-gab-icon-selection-indicator {background-color: ${popup_hover_bg_2} !important;}`+
    `.companion-app-switcher-separator, .companion-app-switcher-add-on-container::before {border-top: 1px solid ${popup_border};}`+
    `.companion-shell-guest {filter: invert(${doc_invert});}`+
    `.app-switcher-button-icon {fill: ${icon_color};}`

    //special character popup
    style_string+=`.modal-dialog, .modal-dialog div, .modal-dialog input[type="text"] {background-color: ${popup_bg_1} !important;}`+
    `.modal-dialog input[type="text"] {background-color: transparent !important;}`+
    `.modal-dialog .goog-flat-button {border: 1px solid ${popup_border} !important;}`+
    `.docs-gm .modal-dialog-content {color: ${popup_text_1};}`+
    `.modal-dialog .modal-dialog-title-text, .modal-dialog .goog-flat-menu-button-caption {color: ${popup_text_1} !important;}`+
    `.goog-char-picker-grid .goog-flat-button-hover, .goog-char-picker-grid .goog-flat-button-focus {background-color: ${popup_hover_bg_1} !important; color: ${popup_hover_text_1} !important;}`+
    `.modal-dialog input[type="text"]::placeholder {color: ${popup_text_1_darkened} !important;}`+
    `.ita-cp-search {border: 1px solid ${popup_text_1_darkened};}`+
    `.ita-cp-search.ita-cp-focus {border: 1px solid ${popup_text_1};}`+
    `.ita-cp-hwt-hint {border: transparent 3px dashed !important;}`+
    `.ita-cp-input {color: ${popup_text_1} !important;}`+
    `.goog-char-picker-unicode {color: ${popup_text_2};}`+
    `.goog-char-picker-name {color: ${popup_text_2};}`+
    `.goog-char-picker-char-zoom {color: ${popup_text_1};}`+
    `.goog-char-picker-hovercard {border: solid 5px ${popup_border} !important; background-color: ${popup_bg_1} !important;}`+
    `.docs-gm .modal-dialog .goog-flat-menu-button, .docs-gm .docs-material-gm-dialog .goog-flat-menu-button, .docs-gm .kix-tablesidebar-control .goog-flat-menu-button, .docs-gm .sketchy-shape-effects-shadow-tile .goog-flat-menu-button {border: 1px solid ${popup_text_1};}`+
    `.ita-cp-charpicker .goog-char-picker-grid, .ita-cp-hwt {border: 1px solid ${popup_border};}`

    //shortcuts; command + /
    style_string+=`.apps-shortcutshelpcontentimpl-container {background-color: ${popup_bg_1};}`+
    `.apps-shortcutshelppopup {border: 1px solid ${popup_border};}`+
    `.apps-actiondatawidget-content-header, .apps-shortcutshelpcontentimpl-dialog-title {color: ${popup_text_1};}`+
    `.apps-actiondatawidget-shortcut-key, .apps-actiondatawidget-shortcut-desc {color: ${popup_text_2};}`+
    `.apps-shortcutshelpcontentimpl-header {    border-bottom: 1px solid ${popup_border};}`+
    `.apps-shortcutshelpcontentimpl-sidebar {border-right: 1px solid ${popup_border};}`+
    `.apps-shortcutshelpcontentimpl-tearoff-link-container {border-top: 1px solid ${popup_border};}`+
    `.apps-shortcutshelpcontentimpl-link {color: ${popup_text_1} !important;}` +
    `.apps-navigationwidget {color: ${popup_text_1};}`+
    `.apps-navigationwidget-item-hover {color: ${popup_hover_text_1} !important; background-color: ${popup_hover_bg_1};}`+
    `.apps-navigationwidget-item-selected {color: ${popup_hover_text_1}; background-color: ${popup_hover_bg_1};}`+
    `.apps-shortcutshelpcontentimpl-search {background-color: ${popup_bg_1}; border: 1px solid ${popup_text_1_darkened};}`+
    `.apps-shortcutshelpcontentimpl-input::placeholder {color: ${popup_text_1_darkened};}`+
    `.apps-shortcutshelpcontentimpl-search-icon svg {fill: ${popup_text_1};}`+
    `.apps-shortcutshelpcontentimpl-search-focused {border: 1px solid ${popup_text_1};}`+
    `.apps-shortcutshelpcontentimpl-input {color: ${popup_text_1};}`+
    `.apps-shortcutshelpcontentimpl-ac-renderer {background: ${popup_bg_1}; border: 1px solid ${popup_text_1}; color: ${popup_text_1};}`+ //change colors to main ones if needed
    `.apps-shortcutshelpcontentimpl-ac-renderer .ac-active {background-color: ${popup_hover_bg_1}; color: ${popup_hover_text_1};}`+
    `.apps-shortcutshelppopup-close svg {fill: ${icon_color};}`

    //toolbar
    style_string+=`.docs-fontmenu .docs-fonts-section-header {color: ${main_text};}`+
    `#docs-toolbar-wrapper {background-color: ${sub_bg} !important;border-top: 1px solid ${main_border} !important;border-bottom: 1px solid ${main_border} !important;}`+
    `.docs-material .goog-toolbar-button, .docs-material .goog-toolbar-combo-button, .docs-material .goog-toolbar-menu-button {background-color: ${sub_bg}}`+
    `.docs-gm .goog-toolbar-separator.goog-inline-block {border-left: 1px solid ${icon_color};}`+
    `.docs-gm .docs-material .goog-toolbar-combo-button-open, .docs-gm .docs-material .goog-toolbar-menu-button-open, #docs-toolbar-mode-switcher.edit-mode, #docs-toolbar-mode-switcher.suggest-mode , #titlebar-mode-indicator-container>.docs-material-menu-button-flat-primary {background: ${sub_bg}; color: ${icon_color}; border: 1px solid ${icon_color} !important;}`+
    `.docs-material .goog-toolbar-menu-button, .docs-gm .goog-toolbar-combo-button-input {color: ${icon_color}}`+
    `.goog-toolbar[role="toolbar"] .docs-font-size-inc-dec-action-button.goog-toolbar-button, #fontSizeSelect.docs-font-size-inc-dec-combobox {border-color: ${icon_color} !important;}`+
    `.goog-menuitem.docs-submenuitem {border-bottom: 1px solid ${main_border};}`+
    `.docs-gm .goog-toolbar-combo-button-input:focus {border: 2px solid ${main_text} !important; color: ${main_text}; background: ${sub_bg};}`+
    `.docs-gm .docs-material .goog-toolbar-button-checked {background-color: ${main_hover_bg}; color: ${main_hover_text};}`+
    `.docs-material.docs-toolbar-more-toolbar {background: ${sub_bg};}`+
    `.docs-gm .docs-material .docs-toolbar-button-split-sympathy-hover, .docs-gm .docs-material .goog-toolbar-combo-button-hover, .docs-gm .docs-material .goog-toolbar-button-hover, .docs-gm .docs-material .goog-toolbar-menu-button-hover {background-color: ${main_hover_bg} !important;}`+
    `.docs-listpreset-palette {filter: invert(${doc_invert});}`+
    `.docs-gm .docs-material .docs-toolbar-button-split-right.goog-toolbar-button-hover, .docs-gm .docs-material .docs-toolbar-button-split-right.goog-toolbar-menu-button-hover, .docs-gm .docs-material .docs-toolbar-button-split-right.docs-toolbar-button-split-sympathy-hover, .docs-gm .docs-material .docs-toolbar-button-split-left+.docs-toolbar-button-split-right.goog-toolbar-menu-button-open, .docs-gm .docs-material .docs-toolbar-split-create-button+.docs-toolbar-button-split-right {border-left-color: transparent !important;}`+
    `.goog-toolbar-combo-button-hover .goog-toolbar-combo-button-input {border-right: 1px solid transparent !important;}`+
    `.docs-gm .docs-material .goog-toolbar-menu-button-open {color: ${icon_color};}`+
    `#docs-toolbar-mode-switcher.edit-mode .goog-toolbar-menu-button-dropdown {border-top-color: ${icon_color};}`+
    `#docs-meet-in-editors-entrypointbutton.goog-flat-menu-button .goog-flat-menu-button-dropdown {border-color: ${icon_color} transparent;}`

    //equation
    style_string+=
    `.docs-material #docs-equationtoolbar {background: ${sub_bg}; border-bottom: 1px solid ${main_border};}`+
    `.docs-gm .goog-toolbar-button-inner-box, .docs-material .goog-toolbar-button {color: ${main_text};}`+
    `.docs-material .goog-toolbar-button-hover {color: ${main_text}; background-color: ${main_hover_bg} !important;}`+
    `.kix-equation-toolbar-icon {filter: ${main_text_filter};}`+
    `.kix-equation-toolbar-palette-item {border: 0.5px solid ${main_border};}`+
    `.kix-equation-toolbar-palette-icon {filter: ${main_text_filter};}`

    //image all options
    style_string+=`.kix-embedded-entity-bubble.docs-bubble {background-color: ${popup_bg_1};}`+
    `.kix-embedded-entity-options .docs-material-gm-select-caption {color: ${icon_color};}`+
    `.docs-bubble .docs-bubble-button.jfk-button:hover, .docs-bubble .docs-bubble-button.jfk-button:focus, .docs-bubble .docs-bubble-button.jfk-button.goog-toolbar-button-checked, .docs-material-gm-select-open.docs-material-gm-select-focused .docs-material-gm-select-outer-box, .docs-material-gm-select-hover .docs-material-gm-select-outer-box {background-color: ${popup_hover_bg_2};}`+
    `body > div.docs-tiled-sidebar.docs-material.docs-format-options-sidebar > div.docs-tiled-sidebar-header > div.docs-tiled-sidebar-icon-container > div > svg > path {fill: ${icon_color};}`+
    `.docs-gm .docs-tiled-sidebar-header {color: ${popup_text_1}; background-color: ${popup_bg_1}; border-bottom: 1px solid ${popup_border}; border-top: 1px solid ${popup_border};}`+
    `.docs-sidebar-tile {border-bottom: 1px solid ${popup_border} !important; background: ${popup_bg_1}; color: ${popup_text_1};}`+
    `.docs-gm .docs-tiled-sidebar-scroll {background: ${popup_bg_1};}`+
    `.docs-tiled-sidebar {background: ${popup_bg_1} !important; border-left: 1px solid ${popup_border};}`+
    `.docs-tiled-sidebar-disabled .docs-tiled-sidebar-disabled-message {color: ${popup_text_1};}`+
    `.docs-gm .docs-sidebar-tile-header {color: ${popup_text_1};}`+
    `.docs-gm .goog-zippy-expanded.docs-sidebar-tile-header, .docs-sidebar-tile-header-cursor:hover {background-color: ${popup_hover_bg_1}; color: ${popup_hover_text_1} !important;}`+
    `.docs-gm .docs-sidebar-tile-controls {background-color: ${popup_bg_2};}`+
    `.docs-number-input-unit, .docs-labeled-button-label, .docs-number-input-label {color: ${popup_text_2};}`+
    `.docs-material-button-hover.docs-material-button-flat-default {background-color: ${popup_hover_bg_1};}`+
    `.docs-material-gm-labeled-checkbox-checkbox.docs-material-gm-labeled-checkbox-checked {background-color: ${popup_bg_2}; border: 2px solid ${popup_text_1};}`+
    `.docs-number-input-up-button, .docs-number-input-down-button, .docs-material-gm-labeled-checkbox-checkbox.docs-material-gm-labeled-checkbox-checked:before {filter: ${popup_text_1_filter}; opacity: 1;}`+
    `.docs-number-input-container input {color: ${popup_text_1}; border-bottom: 1px solid ${popup_text_1}; background: ${popup_bg_2};}`+
    `.docs-number-input-container input:hover {border-bottom-color: ${popup_hover_bg_1};}`+
    `.docs-number-input-container input:focus {border-bottom: 2px solid ${popup_hover_bg_1};}`+
    `.docs-sidebar-tile-input-label, .docs-material-gm-labeled-checkbox .docs-material-gm-labeled-checkbox-label {color: ${popup_text_1}}`+
    `.docs-material-gm-select-caption {color: ${popup_text_1};}`+
    `.docs-material-gm-select {border-radius: 4px;}`+
    `.docs-material-gm-select-outer-box {border: 1px solid ${popup_text_1};}`+
    `.docs-material-button-hairline-default.docs-material-button {border: 1px solid ${popup_text_1_darkened} !important; background: ${popup_bg_2};}`+
    `.docs-sidebar-palette .docs-sidebar-palette-button-container.goog-control-selected .docs-sidebar-palette-button {border: 2px solid ${popup_text_1} !important;}`+
    `.docs-material-button-hairline-default.docs-material-button-hover {background: ${popup_hover_bg_1};}`+
    `.docs-material-button-disabled.docs-material-button-flat-default, .docs-gm .goog-zippy-expanded.docs-sidebar-tile-header:focus {background-color: ${popup_hover_bg_1};}`+
    `.docs-sidebar-tile .jfk-radiobutton-label {color: ${popup_text_1};}`+

    `.docs-sidebar-tile .jfk-radiobutton-checked.jfk-radiobutton-focused .jfk-radiobutton-radio, .docs-sidebar-tile .jfk-radiobutton-checked:not(.jfk-radiobutton-disabled):not(.jfk-radiobutton-focused) .jfk-radiobutton-radio {border: 2px solid ${popup_text_1};}`+
    `.docs-sidebar-tile .jfk-radiobutton-radio {border: 2px solid ${popup_text_1_darkened};}`+
    `.docs-sidebar-tile .jfk-radiobutton:hover .jfk-radiobutton-radio {border: 2px solid ${popup_text_1};}`+
    `.jfk-radiobutton-checked .jfk-radiobutton-radio::after {filter: ${popup_text_1_filter}; background: ${popup_text_1};}`+
    `.docs-icon-img-container.docs-icon-img.docs-icon-chevron-left-24, .docs-material .docs-icon-chevron-right-24 {filter: ${icon_color_filter};}`+
    `.docs-sidebar-tile-label {color: ${popup_text_1};}`+
    `.docs-material-slider-track-off {background-color: ${icon_color}; opacity: 0.4;}`+
    `.docs-material-slider-thumb-grabber {background-color: ${icon_color};border-color: ${icon_color};}`+

    `.docs-material-slider-track-on {background-color: ${icon_color};}`+
    `.docs-gm .docs-image-effect-adjustment-reset-button.jfk-button-standard {background: ${popup_bg_2}; border: 1px solid ${popup_text_1} !important; color: ${popup_text_1};}`+
    `.docs-gm .docs-image-effect-adjustment-reset-button.jfk-button-hover:focus, .docs-gm .docs-image-effect-adjustment-reset-button.jfk-button-hover, .docs-gm .docs-image-effect-adjustment-reset-button:focus {background: ${popup_hover_bg_1}; border: 1px solid ${popup_text_1} !important; color: ${popup_hover_text_1};}`+
    `.docs-material-gm-labeled-checkbox-focused .docs-material-gm-labeled-checkbox-checked+.docs-material-gm-labeled-checkbox-circle, .docs-material-gm-labeled-checkbox-hover .docs-material-gm-labeled-checkbox-checked+.docs-material-gm-labeled-checkbox-circle, .docs-material-gm-labeled-checkbox-hover .docs-material-gm-labeled-checkbox-circle {background-color: ${popup_text_1};}`+
    `.docs-material-gm-labeled-checkbox-focused .docs-material-gm-labeled-checkbox-circle {background-color: transparent;}`+
    `.docs-material-gm-labeled-checkbox-checkbox {border: 2px solid ${popup_text_1_darkened};}`+
    `.docs-sidebar-tile .jfk-radiobutton-checked:not(.jfk-radiobutton-disabled):not(.jfk-radiobutton-focused) .jfk-radiobutton-radio, .docs-sidebar-tile .jfk-radiobutton-checked:not(.jfk-radiobutton-disabled):not(.jfk-radiobutton-focused):hover .jfk-radiobutton-radio {border: 2px solid ${popup_text_1};}`

    doc_style.innerHTML=style_string
  })
}

//toggles dark mode
function receiver(message, sender, sendResponse){
  if (message.hasOwnProperty('toggled')){
    if (message.toggled) {
      make_style()
      document.head.append(doc_style);
    }
    else{
      document.head.removeChild(doc_style);
    }
  }
}

//automatically applies darkmode when refreshing a doc which had dark mode enabled
chrome.storage.local.get("toggle_state", function(toggle_data){
  if (toggle_data.toggle_state){
    make_style();
    document.head.append(doc_style);
  };
})

//makes it so you don't have to retoggle every time
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if(`${key}`=="selected_color_scheme_index"){
      make_style();
    }
  }
});

// executes toggle function
chrome.runtime.onMessage.addListener(receiver)