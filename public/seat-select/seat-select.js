const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection, flightNumber;

const renderSeats = (flight) => {
  document.querySelector(".form-container").style.display = "block";

  const letters = ["A", "B", "C", "D", "E", "F"];

  for (let r = 0; r < 10; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    seatsDiv.appendChild(row);
    letters.forEach((letter, index) => {
      const seatNumber = `${r + 1}${letter}`;
      const seat = document.createElement("li");
      const flightIndex = r * 6 + index;

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      const flightSeat = flight[flightIndex];
      seat.innerHTML = flightSeat.isAvailable ? seatAvailable : seatOccupied;
      row.appendChild(seat);
    });
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = async (event) => {
  flightNumber = flightInput.value;

  try {
    const res = await fetch(`/flights/${flightNumber}`);
    const flight = await res.json();
    renderSeats(flight);
  } catch {
    console.log("Something went wrong with fetching a flight.");
  }
};

const handleSubmit = async (event) => {

  event.preventDefault()
  document.getElementById('confirm-button').disabled = true

  const newReservation = {
		givenName: document.getElementById("givenName").value,
		surname: document.getElementById("surname").value,
		email: document.getElementById("email").value,
		seat: selection,
		flight: flightNumber
	}

  try {
    const res = await fetch("/reservation", {
      method: "POST",
      body: JSON.stringify(newReservation),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

		const id = await res.json();
    window.location.replace(`/confirmed/${id}`)
  } catch { console.log("Error with form submission.") }
};

flightInput.addEventListener("change", toggleFormContent);