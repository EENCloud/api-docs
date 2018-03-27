//----------------------------------------------------------------------------------------
// ON DOCUMENT LOAD - FUNCTIONS
//----------------------------------------------------------------------------------------


// Add the Modal 'onmouseover' behavior (dynamically)
$(document).ready(function() {

    // Retrieve each 'definition' class item's 'onclick' value
    $(".definition").each(function(index) {

        // Propagate the 'onclick' value onto 'onmouseover'
        $(this).prop("onmouseover", $(this).prop("onclick"));        // Keeping IE in mind
        $(this).attr("onmouseover", $(this).attr("onclick"));        // All other browsers

    });

});


// Define the Modal (elements)
var modalBase =        '<div id="Modal" class="modal">'
                     + ''
                     + '</div>',
    modalContent =     '<div class="modal-content">'
                     + ''
                     + '</div>',
    modalHeader =      '<div class="modal-header">'
                     + ''
                     + '</div>',
    modalTitle =       '<h2 class="modal-title">'
                     + ''
                     + '</h2>',
    modalClose =       '<span class="modal-close">'      // Define the closing <span> (x)
                     + '&times;'                         // Default: &times;
                     + '</span>',                        // Keep it static for performance
    modalBody =        '<div class="modal-body">'
                     + ''
                     + '</div>',
    modalParagraph =   '<p class="modal-paragraph">'
                     + ''
                     + '</p>';


// Assemble the Modal (structure)
$(document).ready(function() {

    // Focus the document Body
    $("body").append(

        // Add the Modal Base
        modalBase
    );
        $(".modal").append(

            // Add the Modal Content
            modalContent
        );
                $(".modal-content").append(

                    // Add the Modal Header and Body
                    modalHeader,
                    modalBody
                );
                        $(".modal-header").append(

                            // Add the Modal Close Button and Title
                            modalClose,
                            modalTitle
                        );
                        $(".modal-body").append(

                            // Add the Modal Text
                            modalParagraph
                        );

    // Retrieve the default modal color once the header has been assembled
    initcolorCode = RGB2HEX($(".modal-header").css("background-color"));
    // Global Variable (already converted to HEX)

});


// Rework the slate elements | Structure for openModal()
$(document).ready(function() {

    //Find all id(s) beginning with 'DOT-'
    $('[id^="DOT-"]').each(function(index) {

        // Assign a class to the parent (element)
        $(this).parent().attr("class", "definition-source");

        // Warp id to the parent (element)
        $(this).parent().attr("id", this.id);
        $(this).removeAttr("id");

        // Warp display style to the parent (element)
        $(this).parent().attr("style", $(this).attr("style"));
        $(this).removeAttr("style");

        // Close the <def> (element)
        $(this).parent().find('def').append('</def>');

        // Add <br> to the <strong> (element)
        $(this).parent().find('strong').after('<br>');
        //alert($(this).parent().find('def').text());

    });

});


//----------------------------------------------------------------------------------------
// ON SPECIFIC TRIGGER - FUNCTIONS
//----------------------------------------------------------------------------------------


// Open a dynamic content Modal (function call)
function openModal(element) {

    // Display and populate the Modal frame
    var embedTitle = $("#" + element + " " + "strong").html(),
        embedMsg =   $("#" + element + " " + "def").html(),
        embedClose = $(".modal-close").html("&times;");

    customModal(embedTitle, embedMsg);

    // Dynamically replace the close button (uncomment if not using static content)
    //embedClose;

}


// Open a custom Modal (function call)
function customModal(header, body) {

    // Display the Modal frame (only if not wiping content)
    if (header !== "" || body !== "") {

        $(".modal").css("display", "block");

    }

    // Populate the Modal frame
    $(".modal-title").html(header);
    $(".modal-paragraph").html(body);

}


// Close the Modal (various triggers)
$(document).ready(function closeModal() {

    // Press 'ESC' to close the Modal
    $(document).on("keydown" || "keyup", function(event) {    // Multifold triggers [ preventDefault() works only with 'keydown', but 'keyup' is supported across more browsers ]

        if (event.which === 27 || event.keyCode == 27) {      // Multifold event listeners [ 'which' is supported across more browsers, 'keyCode' is for older browsers ]

            // Prevent Default 'key_' behavior
            event.preventDefault();

            // Hide the Modal frame
            $(".modal").css("display", "none");

            // Wipe the content additionally
            customModal("", "");

        }

    });

    // Click anywhere outside to close the Modal
    $(document).click(function(event) {

        if ($(event.target).is(".modal")) {

            // Hide the Modal frame
            $(".modal").css("display", "none");

            // Wipe the content additionally
            customModal("", "");

        }

    });

    // Click on <span> (x) to close the Modal
    $("span").click(function() {

        // Hide the Modal frame
        $(".modal").css("display", "none");

        // Wipe the content additionally
        customModal("", "");

    });

});


// Remove the Modal 'onmouse_' behavior (key trigger)
var onmouse_ =      'onmouseover onmouseenter onmouseleave onhover onmousemove onmouseout',
    onmouse_enable = true;

var hoverTitleON =  'Hover Modals: Enabled',
    hoverMsgON =    'Mouse over Term definitions have been enabled!',
    hoverTitleOFF = 'Hover Modals: Disabled',
    hoverMsgOFF =   'Mouse over Term definitions have been disabled!'
                  + '<br><small>(On-click definitions remain enabled)</small>';


$(document).ready(
    function onmouse_OnOff() {

        // Press 'F8' to toggle 'onmouse_' behavior
        $(document).on("keydown" || "keyup", function(event) {    //Multifold triggers [ preventDefault() works only with 'keydown', but 'keyup' is supported across more browsers ]

            if (event.which === 119 || event.keyCode == 119) {    // Multifold event listeners [ 'which' is supported across more browsers, 'keyCode' is for older browsers ]

                // Prevent Default 'key_' behavior
                event.preventDefault();

                // Edit the 'onmouse_' properties
                if (onmouse_enable === true) {

                    // Keeping IE in mind | Remove 'onmouse_'
                    $(".definition").prop(onmouse_, null);

                    // All other browsers | Remove 'onmouse_'
                    $(".definition").removeAttr(onmouse_);

                    // Use the Modal to relay the disable message
                    $(".modal").css("display", "block");
                    $(".modal-title").html(hoverTitleOFF);
                    $(".modal-paragraph").html(hoverMsgOFF);

                } else if (onmouse_enable === false) {

                    // Add the 'onmouse_' properties
                    $(".definition").each(function(index) {

                        // Keeping IE in mind | Future Feature

                        // All other browsers | Propagate the 'onclick' value onto 'onmouseover'
                        $(this).attr("onmouseover", $(this).attr("onclick"));

                    });

                    // Use the Modal to relay the enable message
                    $(".modal").css("display", "block");
                    $(".modal-title").html(hoverTitleON);
                    $(".modal-paragraph").html(hoverMsgON);

                }

                // Switch the value to opposite
                onmouse_enable = !onmouse_enable

            }

        });

    }

);


// Convert RGB color code to HEX
function RGB2HEX(code) {

    if (code.indexOf("#") > -1) { return code; }    // Failsafe when supplied with HEX

    else { var colorMatch = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(code); return colorMatch ? "#" + (1 << 24 | colorMatch[1] << 16 | colorMatch[2] << 8 | colorMatch[3]).toString(16).substr(1) : code; }

}

// Get current Modal color (work in progress)
function getModalColor() {

    return RGB2HEX("#colorcode");
    //return RGB2HEX($(".modal-header").css("background-color"));
    //return RGB2HEX($(this).parents().find(".modal-header").css("background-color"));

}

//----------------------------------------------------------------------------------------
// ADDITIONAL FUNCTIONALITY
//----------------------------------------------------------------------------------------


var creditsTitle =  'Modal Author',
    creditsMsg =    '&copy; 2017 Rafał Kropidłowski';

var cameraID = '10035428';

var embedContain =  '<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>';    // CSS trick for preserving the 16:9 format

var embedSmall =    '<style>.embed-container { position: relative; padding-bottom: 33.33%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>';    // CSS trick for preserving the custom format (use padding-bottom to adjust height)

var eennowTitle =   'EEN Live Video <sub>[ demo4 ]</sub>',
    eennowMsg =     embedContain + '<div class="embed-container"><iframe src="https://c001.eagleeyenetworks.com/live/index.html?id=' + cameraID + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';

var eenhistTitle =  'EEN Historic Video <sub>[ demo4 ]</sub>',
    eenhistMsg =    embedSmall + '<div class="embed-container"><iframe width=100% height=600px src="https://login.eagleeyenetworks.com/hist/index.html?id=' + cameraID + '&ts=20170804010010.809&m1=20170804010010.809&m2=20170804011010.809"></div>';

var gmapsTitle =    'Visit New York?',
    gmapsMsg =      embedSmall + '<div class="embed-container"><iframe width=100% height=600px src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387144.0075834208!2d-73.97800349999999!3d40.7056308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY!5e0!3m2!1sen!2sus!4v1394298866288"></div>';

var vimeoTitle =    'Not another llama song...',
    vimeoMsg =      embedContain + '<div class="embed-container"><iframe src="http://player.vimeo.com/video/66140585" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';

var maskTitle =     'It\'s green!',
    maskMsg =       embedContain + '<div class="embed-container"><iframe src="https://giphy.com/embed/ZlDc5yFscr55e" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>';

var aliveTitle =    'It\'s alivee!',
    aliveMsg =      embedContain + '<div class="embed-container"><iframe src="https://giphy.com/embed/11RwocOdukxqN2" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>';

var norseTitle =    'Can contain the norwegian alphabet!',
    norseMsg =      '<a onclick="customModal(ytubeTitle, ytubeMsg)">A &nbsp;&nbsp;&nbsp;	B &nbsp;&nbsp;&nbsp;	C &nbsp;&nbsp;&nbsp;	D &nbsp;&nbsp;&nbsp;	E &nbsp;&nbsp;&nbsp;	F &nbsp;&nbsp;&nbsp;	G &nbsp;&nbsp;&nbsp;	H &nbsp;&nbsp;&nbsp;	I &nbsp;&nbsp;&nbsp;	J &nbsp;&nbsp;&nbsp;	K &nbsp;&nbsp;&nbsp;	L &nbsp;&nbsp;&nbsp;	M &nbsp;&nbsp;&nbsp;	N &nbsp;&nbsp;&nbsp;	O &nbsp;&nbsp;&nbsp;	P &nbsp;&nbsp;&nbsp;	Q &nbsp;&nbsp;&nbsp;	R &nbsp;&nbsp;&nbsp;	S &nbsp;&nbsp;&nbsp;	T &nbsp;&nbsp;&nbsp;	U &nbsp;&nbsp;&nbsp;	V &nbsp;&nbsp;&nbsp;	W &nbsp;&nbsp;&nbsp;	X &nbsp;&nbsp;&nbsp;	Y &nbsp;&nbsp;&nbsp;	Z &nbsp;&nbsp;&nbsp;	Æ &nbsp;&nbsp;&nbsp;	Ø &nbsp;&nbsp;&nbsp;	Å</a>';

var ytubeTitle =    'Alphabet size!',
    ytubeMsg =      embedContain + '<div class="embed-container"><iframe src="https://www.youtube.com/embed/f488uJAQgmw" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';

var featureTitle =  'Modal Features',
    featureMsg =    '<a class="definition" onclick="customModal(eennowTitle, eennowMsg)"><key>Alt</key> + <key>V</key></a> -	EEN Live Video<br>'
                  + '<a class="definition" onclick="customModal(eenhistTitle, eenhistMsg)"><key>Alt</key> + <key>H</key></a> -	EEN Historic Video<br>'
                  + '<a class="definition" onclick="customModal(gmapsTitle, gmapsMsg)"><key>Alt</key> + <key>G</key></a> -	Visit New York?<br>'
                  + '<a class="definition" onclick="customModal(vimeoTitle, vimeoMsg)"><key>Alt</key> + <key>L</key></a> -	Not another llama song...<br>'
                  + '<a class="definition" onclick="customModal(maskTitle, maskMsg)"><key>Alt</key> + <key>M</key></a> -	It\'s green!<br>'
                  + '<a class="definition" onclick="customModal(aliveTitle, aliveMsg)"><key>Alt</key> + <key>A</key></a> -	It\'s alivee!<br>'
                  + '<a class="definition" onclick="customModal(norseTitle, norseMsg)"><key>Alt</key> + <key>N</key></a> -	Norwegian alphabet!<br>'
                  + '<a class="definition" onclick="customModal(colorTitle, colorMsg)"><key>Alt</key> + <key>C</key></a> -	Modal Color<br>'
                  + '<br>'
                  + '<key>F8</key> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Hover Modal Toggle<br>'
                  + '<key>F9</key> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Docu Duck Hunt<br>'
                  + '<br>'
                  + '<a class="definition" onclick="customModal(creditsTitle, creditsMsg)"><key>Alt</key> + <key>R</key></a> - Modal Author<br>';

var colorTitle =    'Modal Colors',
    colorMsg =      'Pressing <key>Alt</key> + <key>C</key> will each time generate a random color and apply it <key>' + getModalColor() + '</key>' + ' | Alternatively press <a class="definition" onclick="resetModal()"><key>Reset</key></a>';


// Press 'Alt + Key' to toggle any View
function InvokeModal(key, title, body) {

    $(document).on("keydown" || "keyup", function(event) {    //Multifold triggers [ preventDefault() works only with 'keydown', but 'keyup' is supported across more browsers ]

        // Listen for Alt + keyPress events
        if (event.altKey && event.which === key || event.altKey && event.keyCode == key) {    // Multifold event listeners [ 'which' is supported across more browsers, 'keyCode' is for older browsers ]

            // Prevent Default 'key_' behavior
            event.preventDefault();

            // Feed the customModal() function
            customModal(title, body);

        }

    });

}


// Press 'Alt + Key' to change the Modal header color
function colorModal(key, title, body) {

    $(document).on("keydown" || "keyup", function(event) {    //Multifold triggers [ preventDefault() works only with 'keydown', but 'keyup' is supported across more browsers ]

        // Listen for Alt + keyPress events
        if (event.altKey && event.which === key || event.altKey && event.keyCode == key) {    // Multifold event listeners [ 'which' is supported across more browsers, 'keyCode' is for older browsers ]

            // Prevent Default 'key_' behavior
            event.preventDefault();

                // Generate a random color code
                var colorCode = RGB2HEX("#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}));    // Also converting to HEX should it be necessary

                // Change the Modal color (CSS)
                $(".modal-header").css("background-color", colorCode);

            // Feed the customModal() function
            customModal(title, 'Pressing <key>Alt</key> + <key>C</key> will each time generate a random color and apply it <key>' + colorCode + '</key>' + ' | Alternatively press <a class="definition" onclick="resetModal()"><key>Reset</key></a>');

        }

    });

}

function resetModal() {

    // Reset the Modal color (CSS)
    $(".modal-header").css("background-color", initcolorCode);

    // Feed the customModal() function the reset message
    customModal(colorTitle, 'Pressing <key>Alt</key> + <key>C</key> will each time generate a random color and apply it <key>' + initcolorCode + '</key>' + ' | Modal color reset complete!');

}


//----------------------------------------------------------------------------------------
// INVOKE - FUNCTION CALLS
//----------------------------------------------------------------------------------------


// And this is how we can apply Invoke
InvokeModal(81, featureTitle, featureMsg);       // Invoke with (Alt + Q)
InvokeModal(86, eennowTitle, eennowMsg);         // Invoke with (Alt + V)
InvokeModal(72, eenhistTitle, eenhistMsg);       // Invoke with (Alt + H)
InvokeModal(71, gmapsTitle, gmapsMsg);           // Invoke with (Alt + G)
InvokeModal(76, vimeoTitle, vimeoMsg);           // Invoke with (Alt + L)
InvokeModal(77, maskTitle, maskMsg);             // Invoke with (Alt + M)
InvokeModal(65, aliveTitle, aliveMsg);           // Invoke with (Alt + A)
InvokeModal(78, norseTitle, norseMsg);           // Invoke with (Alt + N)
colorModal(67, colorTitle, colorMsg);            // Invoke with (Alt + C)
// Hover Modals Placeholder                      // Invoke with (F8)
// Eat Docu Placeholder                          // Invoke with (F9)
InvokeModal(82, creditsTitle, creditsMsg);       // Invoke with (Alt + R)


//----------------------------------------------------------------------------------------
// NOTE - DO NOT USE THE TERM 'live' IN THE ABOVE VARIABLE NAMES
//----------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------
// TEMPORARY CONTENT - DELETE AT WILL
//----------------------------------------------------------------------------------------
