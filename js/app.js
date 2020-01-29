$(document).ready(function() {
    // ************************************************
    // *arr-->obj(contacts)-->arr(msg)-->obj(msg detail)
    // ************************************************
    var thisSelectedMessageToDelete;
    // ***************************
    // ARRAY CONTATTI ****
    var contactsIdArray = [
        { 'name' : 'Bill Gates',
        'id' : 1000,
        'img' : 'img/contact-1.jpg',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'Linus Benedict Torvalds',
        'id' : 1100,
        'img' : 'https://i.imgur.com/hammpug.jpg',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'Guido van Rossum',
        'id' : 1001,
        'img' : 'img/contact-2.jpg',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'George Francis Hotz',
        'id' : 1002,
        'img' : 'img/contact-3.jpg',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'BoolBOT',
        'id' : 1003,
        'img' : 'https://i.imgur.com/FCGEGYo.png',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'BoolBOT',
        'id' : 1004,
        'img' : 'https://i.imgur.com/FCGEGYo.png',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'BoolBOT',
        'id' : 1005,
        'img' : 'https://i.imgur.com/FCGEGYo.png',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'BoolBOT',
        'id' : 1006,
        'img' : 'https://i.imgur.com/FCGEGYo.png',
        'isSelected' : false,
        'msg' : []
        },
        { 'name' : 'BoolBOT',
        'id' : 1050,
        'img' : 'https://i.imgur.com/FCGEGYo.png',
        'isSelected' : false,
        'msg' : []
        },
    ];
    // ***************************
    // CREAZIONE BOX CONTATTI da Array |||
    for (let i = 0; i < contactsIdArray.length; i++) {
        // *************************
        var templateContact = $('.template .contact').clone();
        // | img contatto
        templateContact.find('.contact-avatar img').attr('src', contactsIdArray[i].img);
        // | nome contatto
        templateContact.find('.contact-name h4').text(contactsIdArray[i].name);
        // | orario ultimo messaggio contatto
        templateContact.find('.contact-name small').text('00:01');
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
            } else if (event.which == 27) {
                console.log(contactsIdArray);
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
            $('.msg-input input').focus()
            }
        }
    );
    // ***************************
    // CHEVRON BOX MESSAGGIO + DROPDOWN |||
    // | in action - chevron
    // ***************************
    $(document).on("mouseenter mouseleave", ".message", function(e) {
        // ***************************
        if (e.type == "mouseenter") {
            if (checkDropdown()) {
                $(this).find('.chevron-msg').removeClass('hidden');
            }
        } else {
            if (checkDropdown()) {
                $(this).find('.chevron-msg').addClass('hidden');
            }
        }
    });
    // ***************************
    // | in action - dropdown
    // ***************************
    $(document).on('click', '.chevron-msg', function(event) {
        thisSelectedMessageToDelete = $(this).parents('.message');
        // | blocco propagazione
        event.stopPropagation();
        $('.dropdown-message-wrapper').css({
            "left": event.pageX + 'px',
            "top": event.pageY + 'px'
            }
        );
        $('.dropdown-message-wrapper').removeClass('hidden').effect("slide", "fast");
    });
    // ***************************
    $(document).on('click', function() {
        if (!checkDropdown()) {
            $('.dropdown-message-wrapper').addClass('hidden');
            $('.chevron-msg').addClass('hidden');
            thisSelectedMessageToDelete;
        }
    });
    // ***************************
    // ELIMINA MESSAGGIO |||
    $(document).on('click', '#delete-msg', function(event) {
        for (let i = 0; i < contactsIdArray.length; i++) {
            if (contactsIdArray[i].isSelected) {
                var idContactToDelete = contactsIdArray[i].id;
                $(contactsIdArray[i].msg).each(
                    function() {
                        if (this.id == $(thisSelectedMessageToDelete).attr('id')) {
                            this.type = 'deleted';
                            thisSelectedMessageToDelete.effect("pulsate", "fast");
                            setTimeout(function () {
                                thisSelectedMessageToDelete.remove();
                            }, 300);
                            thisSelectedMessageToDelete;
                            pairingMessageContactBox(idContactToDelete, contactsIdArray)
                        }
                    }
                );
            }
        }
    });
    // ***************************
    // BOX CONTATTI |||
    // ***************************
    $(document).on("mouseenter mouseleave click", ".contact", function(e) {
        if (e.type == "mouseenter") {
            $(this).find('.chevron').removeClass('hidden');
            for (let i = 0; i < contactsIdArray.length; i++) {
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
            for (let i = 0; i < contactsIdArray.length; i++) {
                if (!contactsIdArray[i].isSelected) {
                    // | rimuove colore sfondo box tutti i contatti
                    $('.contact').removeClass('contact-mouseenter');
                    $('.contact').removeClass('contact-mouseleave');
                    // | colore sfondo box contatto
                    $(this).addClass('contact-mouseleave');
                }
            }
        } else {
            for (let i = 0; i < contactsIdArray.length; i++) {
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
                            if (this.type != 'deleted') {
                                // | message builder
                                var templateMessage = $('.template .message').clone();
                                // | assegnazione testo input al messaggio
                                templateMessage.find('.message-text').text(this.text);
                                // | assegnazione data corrente
                                templateMessage.find('.message-time').text(this.h);
                                // | aggiunta classe
                                if (this.type == 'sent') {
                                    templateMessage.addClass('msg-sent');
                                } else {
                                    templateMessage.addClass('msg-received');
                                }
                                templateMessage.addClass('msg-sent');
                                // | assegnazione id messaggio
                                templateMessage.attr('id', this.id);
                                $('.msg-conversation').append(templateMessage).scrollTop($('.msg-conversation').height());
                            }
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
            $(this).effect("blind", "fast");
        }
    );
    // ***************************
});
// ***************************
// **********function*********
// ***************************
// ***************************
function sendMessage(arrayContact) {
    if ($('.msg-input input').val().trim().length !== 0) {
        // | creazione data corrente
        var data = new Date();
        // *************************
        var templateMessage = $('.template .message').clone();
        // | assegnazione testo input al messaggio
        let inputVal = $('.msg-input input').val();
        if (inputVal == '/lorem') {
            inputVal = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        }
        templateMessage.find('.message-text').text(inputVal);
        // | assegnazione data corrente
        let rty = addZero(data.getHours()) + ':' + addZero(data.getMinutes());
        templateMessage.find('.message-time').text(rty);
        // | aggiunta classe
        templateMessage.addClass('msg-sent');
        // | assegnazione id messaggio
        let xyz =  Date.now();
        templateMessage.attr('id', xyz);
        // | push del messaggio nell'array del contatto selezionato + pairingMessageContactBox
        for (let i = 0; i < arrayContact.length; i++) {
            if (arrayContact[i].isSelected) {
                arrayContact[i].msg.push({
                    id : xyz,
                    type : 'sent',
                    h : rty,
                    text : inputVal
                });
                pairingMessageContactBox(arrayContact[i].id, arrayContact);
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
    var resp = 'ok'
    // | creazione data corrente
    var data = new Date();
    // *************************
    var templateMessage = $('.template .message').clone();
    // | assegnazione testo input al messaggio [preimpostato]
    templateMessage.find('.message-text').text(resp);
    // | assegnazione data corrente
    let rty = addZero(data.getHours()) + ':' + addZero(data.getMinutes());
    templateMessage.find('.message-time').text(rty);
    // | aggiunta classe
    templateMessage.addClass('msg-received');
    // | assegnazione id messaggio
    let xyz =  Date.now();
    templateMessage.attr('id', xyz);
    // | push del messaggio nell'array del contatto selezionato + pairingMessageContactBox
    for (let i = 0; i < arrayContact.length; i++) {
        if (arrayContact[i].isSelected) {
            arrayContact[i].msg.push({
                id : xyz,
                type : 'received',
                h : rty,
                text : resp
            });
            pairingMessageContactBox(arrayContact[i].id, arrayContact);
        }
    }
    // | push del messaggio nella schermata conversazione | scrollbar ultimo messaggio
    $('.msg-conversation').append(templateMessage).scrollTop($('.msg-conversation').height());
};

function pairingMessageContactBox(idFromArray, arrayContact) {
    var lastMsg;
    for (let i = 0; i < arrayContact.length; i++) {
        if (arrayContact[i].id == idFromArray) {
            lastMsg = arrayContact[i].msg[arrayContact[i].msg.length - 1];
        }
    }
    $('.contacts-list .contact').each(
        function() {
            if (contactIdFinder(this) == idFromArray) {
                if (lastMsg.type == 'deleted') {
                    // | orario ultimo messaggio contatto
                    $(this).find('.contact-name small').text(lastMsg.h);
                    // | messaggio contatto contatto eliminato + italic
                    $(this).find('.contact-last-message p').text('Messaggio eliminato').css('font-style', 'italic');
                } else {
                    // | orario ultimo messaggio contatto
                    $(this).find('.contact-name small').text(lastMsg.h);
                    // | ultimo messaggio contatto + normal
                    $(this).find('.contact-last-message p').text(lastMsg.text).css('font-style', 'normal');
                }
            }
        }
    );
}

function checkDropdown() {
    if ($('.dropdown-message-wrapper').hasClass('hidden') == false) {
        return false;
        }
    return true;
}

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
