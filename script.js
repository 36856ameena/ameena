import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdbl9d34M_AIwE83k-2xEAnw_DLQhYm4U",
  authDomain: "vac-ass.firebaseapp.com",
  projectId: "vac-ass",
  storageBucket: "vac-ass.firebasestorage.app",
  messagingSenderId: "161511658313",
  appId: "1:161511658313:web:a3ffe1c54c72e97a84c098",
  measurementId: "G-QSG2BEQN6J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const dataContainer = document.getElementById("dataContainer");
  const searchCity = document.getElementById("searchCity");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const person = {
        name: form.name.value.trim(),
        age: Number(form.age.value),
        bloodGroup: form.bloodGroup.value.trim(),
        city: form.city.value.trim(),
        contact: form.contact.value.trim(),
        role: form.role.value
      };

      try {
        const colName = person.role === "Donor" ? "Donors" : "Receivers";
        await addDoc(collection(db, colName), person);
        alert("Registration successful!");
        form.reset();
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to register. Check console for details.");
      }
    });
  }

  if (dataContainer) {
    async function displayData(filter = "") {
      dataContainer.innerHTML = "";

      try {
        const donorsSnapshot = await getDocs(collection(db, "Donors"));
        const receiversSnapshot = await getDocs(collection(db, "Receivers"));
        const allData = [];

        donorsSnapshot.forEach(doc => allData.push({ id: doc.id, ...doc.data() }));
        receiversSnapshot.forEach(doc => allData.push({ id: doc.id, ...doc.data() }));

        const filtered = allData.filter(p =>
          p.city.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
          dataContainer.innerHTML = "<p>No results found.</p>";
          return;
        }

        filtered.forEach(person => {
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
      } catch (error) {
        console.error("Error loading data:", error);
        dataContainer.innerHTML = "<p>Error loading donors.</p>";
      }
    }

    displayData();

    if (searchCity) {
      searchCity.addEventListener("input", e => {
        displayData(e.target.value);
      });
    }
  }
});
      
