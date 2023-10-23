document.addEventListener("DOMContentLoaded", function () {
	// Hide the social media section on load
	document.querySelector("#socialMediaSection").style.display = "none";

	//capture signature generator button
	const generateButton = document.getElementById("generate-button");

	// Event Listener for Generate Button
	generateButton.addEventListener("click", function (e) {
		generateSignatures();

    instructions.style.display = 'block';

		const nameError = document.getElementById("name").value;
		const titleError = document.getElementById("title").value;

		if (nameError == "") {
			nameErrorText.innerText = `Please add your name.`;
			nameErrorText.classList.add("error");
		} else {
			nameErrorText.innerText = ``;
		}

		if (titleError == "") {
			titleErrorText.innerText = `Please add your title.`;
			titleErrorText.classList.add("error");
		} else {
			titleErrorText.innerText = ``;
		}

		e.preventDefault();
	});

	// Event Listeners for social media choices
	document.getElementById("socialMediaChoice0").addEventListener("change", toggleSocialSection);
	document.getElementById("socialMediaChoice1").addEventListener("change", toggleSocialSection);
	document.getElementById("socialMediaChoice2").addEventListener("change", toggleSocialSection);

	function toggleSocialSection(event) {
		const socialMediaSection = document.querySelector("#socialMediaSection");
		socialMediaSection.style.display = event.target.value === "socialMediaDefault" ? "none" : "flex";
	}

	function generateSignatures() {
		//social links
		const socialChoice = document.querySelector('input[name="socialMediaChoice"]:checked').value;
		// Gather all the input values
		const name = document.getElementById("name").value;
		const pnLetters = document.getElementById("pnLetters").value;
		const pronoun = document.getElementById("pronoun").value;
		const title = document.getElementById("title").value;
		const officePhone = document.getElementById("officePhone").value;
		const mobilePhone = document.getElementById("mobilePhone").value;
		const deptName = document.getElementById("deptName").value;
		const street = document.getElementById("street").value;
		const zipCode = document.getElementById("zipCode").value;
		const deptUrl = document.getElementById("deptUrl").value || "https://scottsdaleaz.gov";
		const facebook = document.getElementById("facebook").value;
		const twitter = document.getElementById("twitter").value;
		const instagram = document.getElementById("instagram").value;
		const youtube = document.getElementById("youtube").value;

		let socialLinks = "";
		if (socialChoice === "socialMediaNone") {
			socialLinks = ``;
		} else if (socialChoice === "socialMediaDefault") {
			socialLinks = `<a href="https://www.scottsdaleaz.gov/news/social-media">Connect with us on social media</a>`;
		} else {
			if (facebook) socialLinks += `<a href="${facebook}" class="sig__social--elem">Facebook</a>`;
			if (twitter) socialLinks += ` | <a href="${twitter}" class="sig__social--elem">Twitter</a>`;
			if (instagram) socialLinks += ` | <a href="${instagram}" class="sig__social--elem">Instagram</a>`;
			if (youtube) socialLinks += ` | <a href="${youtube}" class="sig__social--elem">YouTube</a>`;
		}

		let pnLettersTrue = pnLetters ? `<span>, ${pnLetters}</span>` : "";

		function formatPhoneNumber(phoneNumberString) {
			let cleaned = ("" + phoneNumberString).replace(/\D/g, "");

			// Remove leading '1' if present
			if (cleaned.length === 11 && cleaned.startsWith("1")) {
				cleaned = cleaned.substring(1);
			}

			const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
			if (match) {
				return match[1] + "-" + match[2] + "-" + match[3];
			}
			return null;
		}

		const formattedOfficePhone = formatPhoneNumber(officePhone);
		const formattedMobilePhone = formatPhoneNumber(mobilePhone);

		const template = `
      <h5>Your Signature:</h5>
      <div class="sig card">
        <div class="card-body">
          <div class="sig__name">${name}${pnLettersTrue}${pronoun ? `<span class="sig__pronoun"> (${pronoun})</span>` : ""}</div>
          ${title ? `<div class="sig__pos"> <span>${title} | City of Scottsdale</span></div>` : ""}
          <div class="sig__phones">
            ${formattedOfficePhone ? `<span class="sig__phones--p"><span>o</span> ${formattedOfficePhone}</span>` : ""}
            ${formattedMobilePhone ? `<span class="sig__phones--m"><span> &nbsp;c</span> ${formattedMobilePhone}</span>` : ""}
          </div>

          ${
						deptName
							? `
              <br>
              <div class="sig__address">
                <address>
                  ${deptName ? `<span class="sig__address--dept">${deptName}</span><br>` : ``}
                  ${
										street
											? `
                  <span class="sig__address--street">${street}</span><br>
                  Scottsdale, AZ <span>${zipCode}</span>
                  `
											: ``
									}
                </address>
              </div>
              <br>
          `
							: ""
					}
          <a href="${deptUrl}" class="sig__link">${deptUrl}</a>
          <div class="sig__social">
            ${socialLinks}
          </div>        
        </div>
      </div>
    `;
		document.getElementById("template-output").innerHTML = template;
	}

	document.addEventListener("click", function (event) {
		let target = event.target;
		// Traverse up the DOM to find the closest .sig.card if the clicked element isn't it
		while (target && !target.classList.contains("sig")) {
			target = target.parentElement;
		}

		// If .sig.card was found, proceed with selection
		if (target && target.classList.contains("card")) {
			let range = document.createRange();
			range.selectNodeContents(target);

			let selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
	});

	//get last updated date
	const lastUpdatedSpan = document.getElementById("lastUpdated");
	const lastModifiedDate = new Date(document.lastModified);

	let hours = lastModifiedDate.getHours();
	let minutes = lastModifiedDate.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	// Convert to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // '0' should be '12'

	// Add a leading zero if needed
	minutes = minutes < 10 ? "0" + minutes : minutes;

	// Format the date and time: MM/DD/YYYY HH:MM:SS AM/PM
	const formattedDate = `${lastModifiedDate.getMonth() + 1}/${lastModifiedDate.getDate()}/${lastModifiedDate.getFullYear()} ${hours}:${minutes} ${ampm}`;

	lastUpdatedSpan.textContent = formattedDate;
});

//get current year and display
var currYr = new Date().getFullYear();
document.querySelectorAll(".thisYear").forEach(function (element) {
	element.textContent = currYr;
});