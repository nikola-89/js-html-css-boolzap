$(document).ready(function() {
// ***************************
// INVIO MESSAGGIO = CLICK - TASTO ENTER | ICON INPUT SWAP **** START
$('.msg-input input').keyup(
    function() {
        resetIconSend();
    }
);

$('.msg-input input').keydown(
    function() {
        if (event.which == 13) {
            resetIconSend();
            if (sendMessage()) {
                setTimeout(
                    function() {
                        MessageReceived();
                    }, 1000);
            }
        }
    }
);

$('.msgsend-ico').click(
    function() {
        resetIconSend();
        if (sendMessage()) {
            setTimeout(
                function() {
                    MessageReceived();
                }, 1000);
        }
    }
);
// INVIO MESSAGGIO = CLICK - TASTO ENTER | ICON INPUT SWAP **** END

// CHEVRON SHOW/HIDDEN IN BOX MESSAGGIO || BOX CONTATTO**** START
$(document).on("mouseenter mouseleave", ".message", function (e) {
    if (e.type == "mouseenter") {
        $(this).find('.chevron').removeClass('hidden');
    } else {
        $(this).find('.chevron').addClass('hidden');
    }
});

$(document).on("mouseenter mouseleave click", ".contact", function (e) {
    if (e.type == "mouseenter") {
        $(this).find('.chevron').removeClass('hidden');
        if (contactIsSelected(this) == false) {
            $(this).css("background-color", "rgb(245, 245, 245)");
        }
    } else if (e.type == "mouseleave") {
        $(this).find('.chevron').addClass('hidden');
        if (contactIsSelected(this) == false) {
            $(this).css("background-color", "rgba(0, 0, 0, 0)");
        }
    } else {
        $(".contact").css("background-color", "rgba(0, 0, 0, 0)");
        $(this).css("background-color", "rgb(235, 235, 235)");
        contactFocus(this);
    }
});
// CHEVRON SHOW/HIDDEN IN BOX MESSAGGIO **** END

// NASCONDI NOTIFICA **** START
$('.enable-notify-box').click(
    function() {
        $(this).slideUp(200);
    }
);
// NASCONDI NOTIFICA **** END

// ***************************
});

// ***************************
function sendMessage() {
    if($('.msg-input input').val().trim().length !== 0) {
        var newMessage = $('.template .message').clone();
        newMessage.find('.message-text').text($('.msg-input input').val());
        var data = new Date();
        newMessage.find('.message-time').text(addZero(data.getHours()) +':'+ addZero(data.getMinutes()));
        newMessage.addClass('msg-sent');
        $('.msg-conversation').append(newMessage).scrollTop($('.msg-conversation').height());
        $('.msg-input input').val('');
        return true;
    }
    $('.msg-input input').val('');
    return false;
}

function MessageReceived() {
    var newMessage = $('.template .message').clone();
    newMessage.find('.message-text').text('Ok');
    var data = new Date();
    newMessage.find('.message-time').text(addZero(data.getHours()) +':'+ addZero(data.getMinutes()));
    newMessage.addClass('msg-received');
    $('.msg-conversation').append(newMessage).scrollTop($('.msg-conversation').height());
}

function resetIconSend() {
    if ($('.msg-input input').val().length === 0) {
        $('.msg-input input').siblings('.microphone-ico').removeClass('hidden');
        $('.msg-input input').siblings('.msgsend-ico').addClass('hidden');
    } else {
        $('.msg-input input').siblings('.microphone-ico').addClass('hidden');
        $('.msg-input input').siblings('.msgsend-ico').removeClass('hidden');
    }
}

function contactIsSelected(thisContact) {
    if($(thisContact).css("background-color") == "rgb(235, 235, 235)") {
        return true;
    }
    return false;
}

function contactFocus(thisContact) {
    // **********************************************************
    $('.message-box .msg-info-contact .msg-info-contact-name h4').text($(thisContact).find('.contact-name h4').text());
    // **********************************************************
    $('.message-box .msg-info-contact .msg-info-contact-avatar img').attr( 'src', $(thisContact).find('.contact-avatar img').attr('src') );
    // **********************************************************
}

function addZero(number) {
    if(number < 10) {
        number = '0' + number;
    }
    return number;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
