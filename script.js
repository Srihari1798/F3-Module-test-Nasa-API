const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistoryList = document.getElementById('search-history');
const headerTitle = document.getElementById('header');

// Get the API key from the user
const apiKey = '68kbBcAhhJbru5lSp6mmI7ZEZiA5Mix7rRtqJZuQ';

// Set the current date
const currentDate = new Date().toISOString().split('T')[0];

// Get the current image of the day on page load
getCurrentImageOfTheDay();

// Add event listener to the search form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getImageOfTheDay(searchInput.value);
});

// Function to get the current image of the day
function getCurrentImageOfTheDay() {
 
  // headerTitle.textContent = `Picture on ${currentDate}`;

  // Make the API request
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
    .then(response => response.json())
    .then(data => {
      // Display the data in the UI
      displayImage(data, currentImageContainer);
    })
    .catch(error => console.error(error));
}

function getImageOfTheDay(date) {
  // Make the API request
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(response => response.json())
    .then(data => {
      // Save the search to local storage
      saveSearch(date);

      // Add the search to the search history list
      addSearchToHistory();

      // Display the data in the UI
      displayImage(data, currentImageContainer);

      // Update the header
      if (date === currentDate) {
        headerTitle.innerHTML = ' NASA Picture of the Day';
      } else {
        document.getElementById('header').textContent = `Picture on ${date}`;
      }
    })
    .catch(error => console.error(error));
}

// Function to save a search to local storage
function saveSearch(date) {
  // Get the existing searches from local storage
  const searches = JSON.parse(localStorage.getItem('searches')) || [];

  // Add the new search to the array
  searches.push(date);

  // Save the updated searches to local storage
  localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add a search to the search history list
function addSearchToHistory() {
  // Get the existing searches from local storage
  const searches = JSON.parse(localStorage.getItem('searches')) || [];

  // Clear the search history list
  searchHistoryList.innerHTML = '';

  // Loop through the searches and add them to the list
  searches.forEach(search => {
    const listItem = document.createElement('li');
    listItem.textContent = search;
    listItem.addEventListener('click', () => {
      getImageOfTheDay(search);
    });
    searchHistoryList.appendChild(listItem);
  });
}

// Function to display the image data in the UI
function displayImage(data, container) {
  // Clear the container
  container.innerHTML = '';

  // Create the elements to display the image data
  const title = document.createElement('h2');
  title.textContent = data.title;

  const date = document.createElement('p');
  date.textContent = data.date;

  const explanation = document.createElement('p');
  explanation.textContent = data.explanation;

  const image = document.createElement('img');
  image.src = data.url;
  image.alt = data.title;

   //Add the elements to the container
  // container.appendChild(date);
  container.appendChild(image);
  container.appendChild(title);
  
  container.appendChild(explanation);
}
