$(document).ready(function() {
// ***************************
$('.msg-input input').keyup(
    function() {
        if ($(this).val().length === 0) {
            $(this).siblings('.microphone-ico').removeClass('hidden');
            $(this).siblings('.msgsend-ico').addClass('hidden');
        } else {
            $(this).siblings('.microphone-ico').addClass('hidden');
            $(this).siblings('.msgsend-ico').removeClass('hidden');
        }
    });
// ***************************
});
