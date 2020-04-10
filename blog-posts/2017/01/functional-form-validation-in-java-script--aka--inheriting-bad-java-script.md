# Functional Form Validation in JavaScript (aka: Inheriting bad JavaScript)

| Metadata name | Value                                                                     |
| ------------- | ------------------------------------------------------------------------- |
| post_title    | Functional Form Validation in JavaScript (aka: Inheriting bad JavaScript) |
| post_date     | 2017-01-30 01:46:32                                                       |
| post_modified | 2017-01-30 01:46:32                                                       |
| post_status   | inherit                                                                   |
| post_type     | revision                                                                  |

I was recently given the job of rebuilding a particularly bad landing page from an external company. Apart from class names, styles and markup being all over the place, there was a particularly obnoxious form validation script sitting in the middle of the page. An excerpt of the script can be seen below, and this documents the process I took when reviving the JS side of things.

    <script type="text/javascript">

      var flagValidation;

      /* validation for 'phone number' */
      function PhoneNumberValidation() {
        var phoneNum = document.getElementsByName("Phone")[0].value;
        var normalPhonepattern = /^[0-9\s\-\+]{6,14}$/g;

        if(!normalPhonepattern.test(phoneNum))
        {
          flagValidation = false;
          document.getElementById("PhoneValidation").innerHTML = "Only numbers, '-' and '+' characters are accepted"
        }
        else
          document.getElementById("PhoneValidation").innerHTML = ""
      }

      function SubmitDetails(){
        flagValidation = true;
        PhoneNumberValidation();

        return flagValidation;
      }

    </script>

So what is wrong with this picture? - There's no reason for this to be a script tag on the page, let's make it an external script - Mutation - Basing the validation on mutating the variable to false should not be the responsibility of these functions - The flagValidation variable being globally scoped and mutated/used in several places leaves a lot of places for it to fail when making changes - The functions are doing too much. When looking at it from a functional standpoint, they should just be returning a bool, and a final validate function can follow up. - Repeating code (e.g. `document.getElement...`) unnecessarily When you allow your functions to be purely functional, this function...

      function PhoneNumberValidation() {
        var phoneNum = document.getElementsByName("Phone")[0].value;
        var normalPhonepattern = /^[0-9\s\-\+]{6,14}$/g;

        if(!normalPhonepattern.test(phoneNum))
        {
          flagValidation = false;
          document.getElementById("PhoneValidation").innerHTML = "Only numbers, '-' and '+' characters are accepted"
        }
        else
          document.getElementById("PhoneValidation").innerHTML = ""
      }

Can become...

    function isPhoneNumberValid() {
      const phoneNumber = document.getElementsByName("Phone")[0].value;
      const phoneNumberRegex = /^[0-9\s\-\+]{6,14}$/g;
      return phoneNumberRegex.test(phoneNumber);
    }

Much prettier, right? Once we've refactored all of those individual functions, the main input validation function looks like this:

    function validateFormInputs(event) {

        let isFormValid = true;
        const phoneNumberFeedback = document.getElementById("PhoneValidation");

        if (isPhoneNumberValid()) {
            phoneNumberFeedback.innerHTML = '';
        } else {
            phoneNumberFeedback.innterHTML = "Only numbers, '-' and '+' characters are accepted";
            isFormValid = false;
        }

        if (isFormValid) {
            contactForm.removeEventListener('submit', validateFormInputs);
            return true;
        } else {
            event.preventDefault();
        }

    }

It's cleaner, sure, but I'm still not okay with using and mutating that `isFormValid` variable and `innerHTML` appearing every other line. Let's take it further. Let's outsource the error message work to a utility function.

    function generateErrorMessage(element, message) {
      return element.innerHTML = message;
    }

    // So we use that like this...

    if (isPhoneNumberValid()) {
      generateErrorMessage(phoneNumberFeedback, '');
    } else {
      generateErrorMessage(phoneNumberFeedback, 'Cannot be empty');
      isFormValid = false;
    }

The next step is to stop mutating that validity flag. To do this, I'm going to bundle all the validation methods into an object and then reduce that to return an isFormValid bool.

    const fields = {
      phoneNumber: {
        isFieldValid: function() {
          const phoneNumber = document.getElementsByName("Phone")[0].value;
          const phoneNumberRegex = /^[0-9\s\-\+]{6,14}$/g;
          return phoneNumberRegex.test(phoneNumber);
        },
        userFeedbackElement: document.getElementById("PhoneValidation"),
        errorMessage: "Only numbers, '-' and '+' characters are accepted"
      }
    };

    // Generate an array from the keys of the methods object and reduce
    Object.keys(validationMethods).reduce((acc, curr) => {
        // do stuff
    }, true);

If you're not familiar with `Array.reduce`, it will iterate over each item in the array and allow you to process them. The arguments are `acc` (accumulative) and `curr` (current). The idea is, we're going to execute each function and then show/hide error messages accordingly. The function now looks like this:

    function validateFormInputs(event) {

      const isFormValid = Object.keys(fields).reduce((acc, curr) => {
        const currentField = fields[curr];

        if (currentField.isFieldValid()) {
          generateErrorMessage(currentField.userFeedbackElement, '');
          return acc;
        } else {
          generateErrorMessage(currentField.userFeedbackElement, currentField.errorMessage);
          return false;
        }
      }, true);

      if (isFormValid) {
        contactForm.removeEventListener('submit', validateFormInputs);
        return true;
        } else {
          event.preventDefault();
      }

    }

This implementation is clearly a case-by-case basis. It works for my particular scenario because there's only one validation condition for each field. If there were more rules, the approach would need to be changed to compensate and it may not be able to be as dynamic. It should also be noted that this is a fairly over-engineered solution. I wouldn't say that the original approach is _wrong_, but my approach looks at the same problem from a functional programming standpoint and I believe it is much cleaner and much more robust. For a view of the entire file, see my gist at [https://gist.github.com/3stacks/c5c49904684e4ddec48aa017ab912db9](https://gist.github.com/3stacks/c5c49904684e4ddec48aa017ab912db9)
