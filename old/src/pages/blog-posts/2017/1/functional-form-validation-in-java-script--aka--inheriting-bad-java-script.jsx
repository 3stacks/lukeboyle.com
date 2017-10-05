
			import React from 'react';
			import Helmet from 'react-helmet';
				
			export default class functionalFormValidationInJavaScriptAkaInheritingBadJavaScript extends React.Component {
				componentDidMount() {
					const heading = this.rootNode.querySelector('h1');
					
					heading.innerHTML = '<a href="/blog-posts/2017/1/functional-form-validation-in-java-script--aka--inheriting-bad-java-script">' + heading.innerText + '</a>';
				}
				
				render() {
					return (
						<div 
							className={this.props.isBlogPage ? "" : "max-width-container blog"}
							ref={el => this.rootNode = el}
						>
							<Helmet>
								<title>Functional Form Validation In Java Script Aka Inheriting Bad Java Script | Luke Boyle</title>
							</Helmet>
							<article className="blog-post">
			<header>
				<h1 className="blog-post--title">Functional Form Validation in JavaScript (aka: Inheriting bad JavaScript)</h1>
			</header>
		<h2>Posted on 2017-01-30 01:46:32</h2><p>I was recently given the job of rebuilding a particularly bad landing page from an external company. Apart from class names, styles and markup being all over the place, there was a particularly obnoxious form validation script sitting in the middle of the page. An excerpt of the script can be seen below, and this documents the process I took when reviving the JS side of things.</p>
<pre><code>
		<span>{"<script type=\"text/javascript\">"}</span><span>{""}</span><span>{"  var flagValidation;"}</span><span>{""}</span><span>{"  /* validation for 'phone number' */"}</span><span>{"  function PhoneNumberValidation() {"}</span><span>{"    var phoneNum = document.getElementsByName(\"Phone\")[0].value;"}</span><span>{"    var normalPhonepattern = /^[0-9\s\-\+]{6,14}$/g;"}</span><span>{""}</span><span>{"    if(!normalPhonepattern.test(phoneNum))"}</span><span>{"    {"}</span><span>{"      flagValidation = false;"}</span><span>{"      document.getElementById(\"PhoneValidation\").innerHTML = \"Only numbers, '-' and '+' characters are accepted\""}</span><span>{"    }"}</span><span>{"    else"}</span><span>{"      document.getElementById(\"PhoneValidation\").innerHTML = \"\""}</span><span>{"  }"}</span><span>{""}</span><span>{"  function SubmitDetails(){"}</span><span>{"    flagValidation = true;"}</span><span>{"    PhoneNumberValidation();"}</span><span>{""}</span><span>{"    return flagValidation;"}</span><span>{"  }"}</span><span>{""}</span><span>{"</script>"}</span>
	</code></pre><p>So what is wrong with this picture? - There&#39;s no reason for this to be a script tag on the page, let&#39;s make it an external script - Mutation - Basing the validation on mutating the variable to false should not be the responsibility of these functions - The flagValidation variable being globally scoped and mutated/used in several places leaves a lot of places for it to fail when making changes - The functions are doing too much. When looking at it from a functional standpoint, they should just be returning a bool, and a final validate function can follow up. - Repeating code (e.g. <code>document.getElement...</code>) unnecessarily When you allow your functions to be purely functional, this function...</p>
<pre><code>
		<span>{"  function PhoneNumberValidation() {"}</span><span>{"    var phoneNum = document.getElementsByName(\"Phone\")[0].value;"}</span><span>{"    var normalPhonepattern = /^[0-9\s\-\+]{6,14}$/g;"}</span><span>{""}</span><span>{"    if(!normalPhonepattern.test(phoneNum))"}</span><span>{"    {"}</span><span>{"      flagValidation = false;"}</span><span>{"      document.getElementById(\"PhoneValidation\").innerHTML = \"Only numbers, '-' and '+' characters are accepted\""}</span><span>{"    }"}</span><span>{"    else"}</span><span>{"      document.getElementById(\"PhoneValidation\").innerHTML = \"\""}</span><span>{"  }"}</span>
	</code></pre><p>Can become...</p>
<pre><code>
		<span>{"function isPhoneNumberValid() {"}</span><span>{"  const phoneNumber = document.getElementsByName(\"Phone\")[0].value;"}</span><span>{"  const phoneNumberRegex = /^[0-9\s\-\+]{6,14}$/g;"}</span><span>{"  return phoneNumberRegex.test(phoneNumber);"}</span><span>{"}"}</span>
	</code></pre><p>Much prettier, right? Once we&#39;ve refactored all of those individual functions, the main input validation function looks like this:</p>
<pre><code>
		<span>{"function validateFormInputs(event) {"}</span><span>{""}</span><span>{"    let isFormValid = true;"}</span><span>{"    const phoneNumberFeedback = document.getElementById(\"PhoneValidation\");"}</span><span>{""}</span><span>{"    if (isPhoneNumberValid()) {"}</span><span>{"        phoneNumberFeedback.innerHTML = '';"}</span><span>{"    } else {"}</span><span>{"        phoneNumberFeedback.innterHTML = \"Only numbers, '-' and '+' characters are accepted\";"}</span><span>{"        isFormValid = false;"}</span><span>{"    }"}</span><span>{""}</span><span>{"    if (isFormValid) {"}</span><span>{"        contactForm.removeEventListener('submit', validateFormInputs);"}</span><span>{"        return true;"}</span><span>{"    } else {"}</span><span>{"        event.preventDefault();"}</span><span>{"    }"}</span><span>{""}</span><span>{"}"}</span>
	</code></pre><p>It&#39;s cleaner, sure, but I&#39;m still not okay with using and mutating that <code>isFormValid</code> variable and <code>innerHTML</code> appearing every other line. Let&#39;s take it further. Let&#39;s outsource the error message work to a utility function.</p>
<pre><code>
		<span>{"function generateErrorMessage(element, message) {"}</span><span>{"  return element.innerHTML = message;"}</span><span>{"}"}</span><span>{""}</span><span>{"// So we use that like this..."}</span><span>{""}</span><span>{"if (isPhoneNumberValid()) {"}</span><span>{"  generateErrorMessage(phoneNumberFeedback, '');"}</span><span>{"} else {"}</span><span>{"  generateErrorMessage(phoneNumberFeedback, 'Cannot be empty');"}</span><span>{"  isFormValid = false;"}</span><span>{"}"}</span>
	</code></pre><p>The next step is to stop mutating that validity flag. To do this, I&#39;m going to bundle all the validation methods into an object and then reduce that to return an isFormValid bool.</p>
<pre><code>
		<span>{"const fields = {"}</span><span>{"  phoneNumber: {"}</span><span>{"    isFieldValid: function() {"}</span><span>{"      const phoneNumber = document.getElementsByName(\"Phone\")[0].value;"}</span><span>{"      const phoneNumberRegex = /^[0-9\s\-\+]{6,14}$/g;"}</span><span>{"      return phoneNumberRegex.test(phoneNumber);"}</span><span>{"    },"}</span><span>{"    userFeedbackElement: document.getElementById(\"PhoneValidation\"),"}</span><span>{"    errorMessage: \"Only numbers, '-' and '+' characters are accepted\""}</span><span>{"  }"}</span><span>{"};"}</span><span>{""}</span><span>{"// Generate an array from the keys of the methods object and reduce"}</span><span>{"Object.keys(validationMethods).reduce((acc, curr) => {"}</span><span>{"    // do stuff"}</span><span>{"}, true);"}</span>
	</code></pre><p>If you&#39;re not familiar with <code>Array.reduce</code>, it will iterate over each item in the array and allow you to process them. The arguments are <code>acc</code> (accumulative) and <code>curr</code> (current). The idea is, we&#39;re going to execute each function and then show/hide error messages accordingly. The function now looks like this:</p>
<pre><code>
		<span>{"function validateFormInputs(event) {"}</span><span>{""}</span><span>{"  const isFormValid = Object.keys(fields).reduce((acc, curr) => {"}</span><span>{"    const currentField = fields[curr];"}</span><span>{""}</span><span>{"    if (currentField.isFieldValid()) {"}</span><span>{"      generateErrorMessage(currentField.userFeedbackElement, '');"}</span><span>{"      return acc;"}</span><span>{"    } else {"}</span><span>{"      generateErrorMessage(currentField.userFeedbackElement, currentField.errorMessage);"}</span><span>{"      return false;"}</span><span>{"    }"}</span><span>{"  }, true);"}</span><span>{""}</span><span>{"  if (isFormValid) {"}</span><span>{"    contactForm.removeEventListener('submit', validateFormInputs);"}</span><span>{"    return true;"}</span><span>{"    } else {"}</span><span>{"      event.preventDefault();"}</span><span>{"  }"}</span><span>{""}</span><span>{"}"}</span>
	</code></pre><p>This implementation is clearly a case-by-case basis. It works for my particular scenario because there&#39;s only one validation condition for each field. If there were more rules, the approach would need to be changed to compensate and it may not be able to be as dynamic. It should also be noted that this is a fairly over-engineered solution. I wouldn&#39;t say that the original approach is <em>wrong</em>, but my approach looks at the same problem from a functional programming standpoint and I believe it is much cleaner and much more robust. For a view of the entire file, see my gist at <a href="https://gist.github.com/3stacks/c5c49904684e4ddec48aa017ab912db9">https://gist.github.com/3stacks/c5c49904684e4ddec48aa017ab912db9</a></p>
</article>
						</div>
					);
				}
			}
		