// Save registration data to LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const dataContainer = document.getElementById("dataContainer");
  const searchCity = document.getElementById("searchCity");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const person = {
        name: form.name.value,
        age: form.age.value,
        bloodGroup: form.bloodGroup.value,
        city: form.city.value,
        contact: form.contact.value,
        role: form.role.value,
      };

      let data = JSON.parse(localStorage.getItem("bloodData")) || [];
      data.push(person);
      localStorage.setItem("bloodData", JSON.stringify(data));

      alert("Registration successful!");
      form.reset();
    });
  }

  if (dataContainer) {
    function displayData(filter = "") {
      let data = JSON.parse(localStorage.getItem("bloodData")) || [];
      dataContainer.innerHTML = "";
      data
        .filter((item) =>
          item.city.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((person) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <h3>${person.name}</h3>
            <p><b>Role:</b> ${person.role}</p>
            <p><b>Blood Group:</b> ${person.bloodGroup}</p>
            <p><b>City:</b> ${person.city}</p>
            <p><b>Age:</b> ${person.age}</p>
            <p><b>Contact:</b> ${person.contact}</p>
          `;
          dataContainer.appendChild(card);
        });
    }

    displayData();

    if (searchCity) {
      searchCity.addEventListener("input", (e) => {
        displayData(e.target.value);
      });
    }
  }
});
