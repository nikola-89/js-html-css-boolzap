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

// CHEVRON SHOW/HIDDEN IN BOX MESSAGGIO **** START
$(document).on("mouseenter mouseleave", ".message", function (e) {
    if (e.type == "mouseenter") {
        $(this).find('.chevron').removeClass('hidden');
    } else {
        $(this).find('.chevron').addClass('hidden');
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
    if($('.msg-input input').val().length !== 0) {
        var newMessage = $('.template .message').clone();
        newMessage.find('.message-text').text($('.msg-input input').val());
        var data = new Date();
        newMessage.find('.message-time').text(addZero(data.getHours()) +':'+ addZero(data.getMinutes()));
        newMessage.addClass('msg-sent');
        $('.msg-conversation').append(newMessage).scrollTop($('.msg-conversation').height());
        $('.msg-input input').val('');
        return true
    }
    return false
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

function addZero(number) {
    if(number < 10) {
        number = '0' + number;
    }
    return number;
}
