// Declare all functions here
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateForm($inputs) {
    var formValid = true,
        $alertSuccess = $('.alert-success'),
        $alertDanger = $('.alert-danger');
    
    // Iterrate all input fileds
    $inputs.each(function (i, el) {
        // Cache all $jQuery vars
        var $el = $(el),
            val = $el.val(),                            /* Get input value */
            $parent = $el.parents('.form-group'),       /* Get parent element */
            $helpBlock = $parent.find('.help-block'),   /* Get help blocks */
            nonValid = (val === '');                    /* Check for empty value */

        // Check for specific fields
        if( $el.attr('type') === 'email' ){
            nonValid = !validateEmail(val);
        }  

        if( $el.attr('type') === 'checkbox' ){
            nonValid = !$el.is(':checked');
        }   

        // Toggle classes 
        $parent.toggleClass('has-error', nonValid);
        $helpBlock.toggleClass('hide', !nonValid);

        if(nonValid){
            formValid = false;
        }
    });

    // Toggle for alerts
    $alertSuccess.toggleClass('hide', !formValid);
    $alertDanger.toggleClass('hide', formValid);

    // Clear fields
    if( formValid ) {
        $inputs.val('');
        $inputs.prop('checked', false);
    }
}

// Document ready statement
$(document).ready(function () {

    // Cache all $jQuery vars
    var $form = $('#form-login');

    // Events
    $form.on('submit', function (e) {
        var $this = $(this),
            $inputs = $this.find('input');

        // Prevent default action on clicked element
        e.preventDefault();

        // Vaidate form
        validateForm($inputs);
    });

});