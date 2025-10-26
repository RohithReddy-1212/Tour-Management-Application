/* ======== DATA ======== */
let users = [];
let tours = [
  { name: "Paris Highlights", location: "Paris, France", duration: 5, price: 1299 },
  { name: "Tokyo Adventure", location: "Tokyo, Japan", duration: 7, price: 1899 },
  { name: "Bali Escape", location: "Bali, Indonesia", duration: 6, price: 1499 },
  { name: "Swiss Alps Trek", location: "Switzerland", duration: 8, price: 2199 },
];
let bookings = [];
let selectedTourIndex = null;

/* ======== TAB SWITCH ======== */
function switchTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById("userLoginForm").classList.add("hidden");
  document.getElementById("adminLoginForm").classList.add("hidden");

  // Clear previous inputs
  document.querySelectorAll("input").forEach(i => i.value = "");

  if (tab === "user") {
    document.querySelectorAll(".tab")[0].classList.add("active");
    document.getElementById("userLoginForm").classList.remove("hidden");
  } else {
    document.querySelectorAll(".tab")[1].classList.add("active");
    document.getElementById("adminLoginForm").classList.remove("hidden");
  }
}

/* ======== REGISTER & LOGIN SWITCH ======== */
function showRegister(){
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("registerSection").classList.remove("hidden");
  document.querySelectorAll("input").forEach(i => i.value = "");
}
function showLogin(){
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  document.querySelectorAll("input").forEach(i => i.value = "");
}

/* ======== REGISTER ======== */
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = regName.value, email = regEmail.value, pass = regPassword.value;
  if (users.find(u => u.email === email)) return alert("User already exists!");
  users.push({ name, email, pass });
  alert("Registration successful!");
  showLogin();
});

/* ======== USER LOGIN ======== */
document.getElementById("userLoginForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = userEmail.value, pass = userPassword.value;
  const user = users.find(u => u.email === email && u.pass === pass);
  if (!user) return alert("Invalid user credentials!");
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("userDashboard").classList.remove("hidden");
  document.getElementById("userName").textContent = user.name;
  renderTours();
});

/* ======== ADMIN LOGIN ======== */
document.getElementById("adminLoginForm").addEventListener("submit", e => {
  e.preventDefault();
  if (adminEmail.value === "admin@tourhub.com" && adminPassword.value === "admin123") {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("adminDashboard").classList.remove("hidden");
    renderBookings();
  } else alert("Invalid admin credentials!");
});

/* ======== LOGOUT ======== */
function logout(){
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById("loginSection").classList.remove("hidden");
  document.querySelectorAll("input").forEach(i => i.value = "");
}

/* ======== USER DASHBOARD ======== */
function renderTours(){
  const grid = document.getElementById("tourGrid");
  grid.innerHTML = tours.map((t,i)=>`
    <div class="tour-card">
      <div class="tour-image">🏖️</div>
      <div class="tour-content">
        <h3>${t.name}</h3>
        <p>${t.location}</p>
        <p>${t.duration} days — $${t.price}</p>
        <button onclick="openBooking(${i})">Book Tour</button>
      </div>
    </div>`).join('');
}

/* ======== BOOKING ======== */
function openBooking(i){
  selectedTourIndex = i;
  document.getElementById("bookTourName").value = tours[i].name;
  document.getElementById("bookingModal").style.display = "flex";
}
function closeModal(){
  document.getElementById("bookingModal").style.display = "none";
  document.getElementById("bookingForm").reset();
}

document.getElementById("bookingForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("userName").textContent;
  const date = document.getElementById("bookDate").value;
  const travelers = +document.getElementById("bookTravelers").value;
  const selected = tours[selectedTourIndex];

  const today = new Date();
  const chosen = new Date(date);
  if (!date || chosen < today || isNaN(chosen.getTime())) {
    alert("Invalid or past date!");
    return;
  }

  bookings.push({ user:name, tour:selected.name, date, travelers });
  alert("Booking confirmed!");
  closeModal();
});

/* ======== ADMIN BOOKING TABLE ======== */
function renderBookings(){
  const tbody=document.getElementById("bookingsTable");
  tbody.innerHTML=bookings.map(b=>
    `<tr><td>${b.user}</td><td>${b.tour}</td><td>${b.date}</td></tr>`
  ).join('');
}

/* ======== ADD TOUR ======== */
document.getElementById("addTourForm").addEventListener("submit", e=>{
  e.preventDefault();
  tours.push({
    name:tourName.value,
    location:tourLocation.value,
    duration:+tourDuration.value,
    price:+tourPrice.value
  });
  alert("Tour added successfully!");
  renderTours();
  e.target.reset();
});
