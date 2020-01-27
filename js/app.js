$(document).ready(function() {
    // ***************************
    // ARRAY CONTATTI ****
    var contactsIdArray = [
        { name : 'Bill Gates',
        id : 1000,
        img : 'img/contact-1.jpg',
        isSelected : false,
        msg : []
        },
        { name : 'Guido van Rossum',
        id : 1001,
        img : 'img/contact-2.jpg',
        isSelected : false,
        msg : []
        },
        { name : 'George Francis Hotz',
        id : 1002,
        img : 'img/contact-3.jpg',
        isSelected : false,
        msg : []
        },
    ];
    // ***************************
    // CREAZIONE BOX CONTATTI da Array |||
    for (var i = 0; i < contactsIdArray.length; i++) {
        // *************************
        var templateContact = $('.template .contact').clone();
        // | img contatto
        templateContact.find('.contact-avatar img').attr('src', contactsIdArray[i].img);
        // | nome contatto
        templateContact.find('.contact-name h4').text(contactsIdArray[i].name);
        // | orario ultimo messaggio contatto
        templateContact.find('.contact-name small').text('00:00');
        // | ultimo messaggio contatto
        templateContact.find('.contact-last-message p').text('TEXT');
        // | assegnazione id contatto
        templateContact.attr('contact-id', contactsIdArray[i].id);
        // ---> append
        $('.contacts-list').append(templateContact);
    }
    // ***************************
    // INPUT CERCA CONTATTI |||
    $(".finder input").on("keyup", function() {
        var searchStr = $(this).val().toLowerCase().trim();
        $('.contact-name h4').each(
            function() {
                if ($(this).text().toLowerCase().indexOf(searchStr) == -1) {
                    $(this).parents('.contact').hide();
                } else {
                    $(this).parents('.contact').show();
                }
            }
        );
    });
    // ***************************
    // INVIO MESSAGGIO = CLICK - TASTO ENTER | ICON INPUT SWAP |||
    $('.msg-input input').keyup(
        function() {
            resetIconSend();
        }
    );
    // ***************************
    $('.msg-input input').keydown(
        function() {
            if (event.which == 13) {
                resetIconSend();
                if (sendMessage(contactsIdArray)) {
                    setTimeout(
                        function() {
                            incomingMessage(contactsIdArray);
                        }, 1000);
                }
            }
        }
    );
    // ***************************
    $('.msgsend-ico').click(
        function() {
            resetIconSend();
            if (sendMessage(contactsIdArray)) {
                setTimeout(
                    function() {
                        incomingMessage(contactsIdArray);
                    }, 1000);
            }
        }
    );
    // ***************************
    // CHEVRON SHOW/HIDDEN IN BOX MESSAGGIO || BOX CONTATTO |||
    $(document).on("mouseenter mouseleave", ".message", function(e) {
        if (e.type == "mouseenter") {
            $(this).find('.chevron').removeClass('hidden');
        } else {
            $(this).find('.chevron').addClass('hidden');
        }
    });
    // ***************************
    $(document).on("mouseenter mouseleave click", ".contact", function(e) {
        if (e.type == "mouseenter") {
            $(this).find('.chevron').removeClass('hidden');
            for (var i = 0; i < contactsIdArray.length; i++) {
                if (!contactsIdArray[i].isSelected) {
                    // | rimuove colore sfondo box tutti i contatti
                    $('.contact').removeClass('contact-mouseenter');
                    $('.contact').removeClass('contact-mouseleave');
                    // | colore sfondo box contatto
                    $(this).addClass('contact-mouseenter');
                }
            }
        } else if (e.type == "mouseleave") {
            $(this).find('.chevron').addClass('hidden');
            for (var i = 0; i < contactsIdArray.length; i++) {
                if (!contactsIdArray[i].isSelected) {
                    // | rimuove colore sfondo box tutti i contatti
                    $('.contact').removeClass('contact-mouseenter');
                    $('.contact').removeClass('contact-mouseleave');
                    // | colore sfondo box contatto
                    $(this).addClass('contact-mouseleave');
                }
            }
        } else {
            for (var i = 0; i < contactsIdArray.length; i++) {
                // | reset isSelected to false in array
                $(contactsIdArray[i].isSelected = false);
                // | rimuove colore sfondo box tutti i contatti
                $('.contact').removeClass('contact-click');
                if (contactIdFinder(this) == contactsIdArray[i].id) {
                    // | schermata conversazione reset
                    messageBoxReset();
                    // | isSelected true in array
                    $(contactsIdArray[i].isSelected = true);
                    // | nome contatto tramite id - schermata conversazione
                    $('.msg-info-contact-name h4').text(contactsIdArray[i].name);
                    // | img contatto tramite id - schermata conversazione
                    $('.msg-info-contact-avatar img').attr('src', contactsIdArray[i].img);
                    // | restore messaggi contatto da array - schermata conversazione
                    $(contactsIdArray[i].msg).each(
                        function() {
                            $('.msg-conversation').append(this).scrollTop($('.msg-conversation').height());
                        }
                    );
                }
            }
        // | colore sfondo box contatto
        $(this).addClass('contact-click');
        // | allert connessione telefono add hidden
        $('.stay-connected-phone').addClass('hidden');
        // | schermata conversazione remove hidden
        $('.message-box').removeClass('hidden');
        }
    });
    // ***************************
    // NASCONDI NOTIFICA |||
    $('.enable-notify-box').click(
        function() {
            $(this).slideUp(200);
        }
    );
    // ***************************
});

// ***************************
function sendMessage(arrayContact) {
    if ($('.msg-input input').val().trim().length !== 0) {
        // | creazione data corrente
        var data = new Date();
        // *************************
        var templateMessage = $('.template .message').clone();
        // | assegnazione testo input al messaggio
        templateMessage.find('.message-text').text($('.msg-input input').val());
        // | assegnazione data corrente
        templateMessage.find('.message-time').text(addZero(data.getHours()) + ':' + addZero(data.getMinutes()));
        // | aggiunta classe
        templateMessage.addClass('msg-sent');
        // | push del messaggio nell'array del contatto selezionato
        for (let i = 0; i < arrayContact.length; i++) {
            if (arrayContact[i].isSelected) {
                arrayContact[i].msg.push(templateMessage);
            }
        }
        // | push del messaggio nella schermata conversazione | scrollbar ultimo messaggio
        $('.msg-conversation').append(templateMessage).scrollTop($('.msg-conversation').height());
        // | reset input
        $('.msg-input input').val('');
        return true;
    }
    // | reset input
    $('.msg-input input').val('');
    return false;
};

function incomingMessage(arrayContact) {
    // | creazione data corrente
    var data = new Date();
    // *************************
    var templateMessage = $('.template .message').clone();
    // | assegnazione testo input al messaggio
    templateMessage.find('.message-text').text('ok');
    // | assegnazione data corrente
    templateMessage.find('.message-time').text(addZero(data.getHours()) + ':' + addZero(data.getMinutes()));
    // | aggiunta classe
    templateMessage.addClass('msg-received');
    // | push del messaggio nell'array del contatto selezionato
    for (let i = 0; i < arrayContact.length; i++) {
        if (arrayContact[i].isSelected) {
            arrayContact[i].msg.push(templateMessage);
        }
    }
    // | push del messaggio nella schermata conversazione | scrollbar ultimo messaggio
    $('.msg-conversation').append(templateMessage).scrollTop($('.msg-conversation').height());
};

function messageBoxReset() {
    $('.msg-conversation .message').each(
        function() {
            $(this).remove();
        }
    );
}

function resetIconSend() {
    if ($('.msg-input input').val().length === 0) {
        $('.msg-input input').siblings('.microphone-ico').removeClass('hidden');
        $('.msg-input input').siblings('.msgsend-ico').addClass('hidden');
    } else {
        $('.msg-input input').siblings('.microphone-ico').addClass('hidden');
        $('.msg-input input').siblings('.msgsend-ico').removeClass('hidden');
    }
};

function contactIdFinder(thisElement) {
    return $(thisElement).attr('contact-id');
}

function addZero(number) {
    if (number < 10) {
        number = '0' + number;
    }
    return number;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
