
        // set the key from an AJAX call 
        $(document).ready(function() {
            paytrace.setKeyAjax('/assets/public_key.pem') ;// set the key from an AJAX call (in this case via a relative URL)
        });   
        $('#myform').submit(function(e) {
             e.preventDefault(); //To prevent the default action of the submit
             if ($(this).valid()) {
                //submit the valid form
                paytrace.submitEncrypted(this);
            } else {
                console.log("INVALID FORM. your code for further action here");
             }
             return false;
         });   
