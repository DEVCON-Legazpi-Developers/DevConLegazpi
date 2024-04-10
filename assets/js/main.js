const viewPdfBtn = document.getElementById('viewPdfBtn');
const pdfModal = document.getElementById('pdfModal');
const closePdfModal = document.getElementById('closePdfModal');
const pdfViewer = document.getElementById('pdfViewer');

// PDF file URL
const pdfUrl = 'assets/storage/pdf/roadshow_programflow.pdf';

// Function to open the modal
function openPdfModal() {
  pdfViewer.src = pdfUrl; // Set the PDF file URL to the viewer iframe src attribute
  pdfModal.style.display = 'block'; // Show the modal
}

// Function to close the modal
function closePdfModalFunction() {
  pdfModal.style.display = 'none'; // Hide the modal
  pdfViewer.src = ''; // Clear the PDF viewer iframe src
}

// Add click event listener to the button to open the modal
viewPdfBtn.addEventListener('click', openPdfModal);

// Add click event listener to the close button in the modal to close it
closePdfModal.addEventListener('click', closePdfModalFunction);

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
  if (event.target === pdfModal) {
    closePdfModalFunction();
  }
});

// Close the modal if the user presses the Esc key
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && pdfModal.style.display === 'block') {
    closePdfModalFunction();
  }
});

// carousel
function handleCarousel() {
  let nextElement = document.getElementById("next");
  let prevElement = document.getElementById("prev");

  if (!nextElement || !prevElement) {
    console.error("Elements with IDs 'next' and/or 'prev' not found");
    return;
  }

  let intervalId = setInterval(function () {
    nextElement.click();
  }, 5000);

  const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(function () {
      nextElement.click();
    }, 5000);
  };

  nextElement.addEventListener("click", resetInterval);
  prevElement.addEventListener("click", resetInterval);
}

// map
function handleMap() {
  var map = L.map("map").setView([0, 0], 13); // Initial position

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

  // Initial marker
  var initialMarker = L.marker([0, 0]).addTo(map);

  // Destination marker
  var destinationMarker = L.marker([
    13.152140, 123.732491,
  ]).addTo(map);

  // Tooltip for destination marker
  destinationMarker
    .bindTooltip("Destination", { permanent: true, direction: "right" })
    .openTooltip();

  // for identification of page to check if url is in view-map.html
  var isViewMap = window.location.pathname.includes("view-map.html");

  // Get current location
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Update map view and initial marker position
    map.setView([latitude, longitude], 13);
    initialMarker.setLatLng([latitude, longitude]);

    // Tooltip for initial marker
    initialMarker
      .bindTooltip("You", { permanent: true, direction: "right" })
      .openTooltip();

    // Initialize routing control after getting current location
    L.Routing.control({
      waypoints: [
        L.latLng(13.152140, 123.732491), // Destination
        L.latLng(latitude, longitude), // Origin
      ],
      routeWhileDragging: true,
      addWaypoints: false,
      draggableWaypoints: false,
      show: isViewMap,
    }).addTo(map);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  if (next && prev) {
    handleCarousel();
  }
  handleMap();
});

document.addEventListener("DOMContentLoaded", function () {
  const colors = ['primary', 'secondary', 'tertiary', 'quaternary'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const preloader = document.getElementById('preloader');

  preloader.style.backgroundColor = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${randomColor}`);

  setTimeout(function () {
    preloader.style.display = 'none';
  }, 5000);
});