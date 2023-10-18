document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("signature--form");

	// Real-time update when any input changes
	form.addEventListener("input", function (e) {
		generateSignatures();
	});

	function generateSignatures() {
		const formData = {
			name: document.getElementById("name").value,
			title: document.getElementById("title").value,
			officePhone: document.getElementById("officePhone").value,
			mobilePhone: document.getElementById("mobilePhone").value,
			email: document.getElementById("email").value,
			street: document.getElementById("street").value,
			deptUrl: document.getElementById("deptUrl").value,
			urlDisplayName: document.getElementById("urlDisplayName").value,
			facebook: document.getElementById("facebook").value,
			twitter: document.getElementById("twitter").value,
			instagram: document.getElementById("instagram").value,
			youtube: document.getElementById("youtube").value,
		};

		// Template 1: Basic
		const template1 = `
      <div class="signature--template">
        <span class="name">${formData.name}</span>
        <span class="title">${formData.title} | City of Scottsdale</span>
        <span class="o-phone">${formData.officePhone}</span>
        <span class="m-phone">${formData.mobilePhone}</span>
        <span class="email">${formData.email ? `<a href="mailto:${formData.email}">${formData.email}</a>` : ""}
        <span class="dept">
          <a href="${formData.deptUrl || "https://scottsdaleaz.gov"}">${formData.urlDisplayName || "ScottsdaleAZ.gov"}</a>
        </span>
      </div>
    `;

		// Template 2: Social Media on the Side
		const template2 = `
      <div class="signature-template">
        <div>
          <strong>${formData.name}</strong>
          ${formData.title} | City of Scottsdale
          ${formData.officePhone}
          ${formData.email ? `<a href="mailto:${formData.email}">${formData.email}</a>` : ""}
        </div>
        <div>
          ${formData.facebook ? `<a href="${formData.facebook}">Facebook</a>` : ""}
          ${formData.twitter ? `<a href="${formData.twitter}">Twitter</a>` : ""}
          ${formData.instagram ? `<a href="${formData.instagram}">Instagram</a>` : ""}
        </div>
      </div>
    `;

		// Template 3: All-In with Social Media Icons
		const template3 = `
      <div class="signature-template">
        <strong>${formData.name}</strong>
        ${formData.title} | City of Scottsdale
        ${formData.officePhone}
        ${formData.email ? `<a href="mailto:${formData.email}">${formData.email}</a>` : ""}
        <a href="${formData.deptUrl || "https://scottsdaleaz.gov"}">${formData.urlDisplayName || "ScottsdaleAZ.gov"}</a>
        ${formData.facebook ? `<a href="${formData.facebook}">[FB]</a>` : ""}
        ${formData.twitter ? `<a href="${formData.twitter}">[TW]</a>` : ""}
        ${formData.instagram ? `<a href="${formData.instagram}">[IG]</a>` : ""}
      </div>
    `;

		// Populate the real-time previews
		// Using both class and ID selectors to populate the real-time previews
		document.querySelector("#template1-output").innerHTML = template1;
		document.querySelector("#template2-output").innerHTML = template2;
		document.querySelector("#template3-output").innerHTML = template3;
	}

	// Call generateSignatures initially to populate with any default values
	generateSignatures();
});
