//  background colors to make each avatar unique
const backgroundColors = ["#e57373", "#81c784", "#64b5f6", "#ffb74d", "#9575cd", "#4db6ac"];


const avatarArea = document.getElementById("avatars");
const inputBoxSection = document.getElementById("inputSection");
const nameField = document.getElementById("username");

//  Function to create a new user avatar
function createAvatar(userName) {
  const firstChar = userName.charAt(0).toUpperCase();
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "avatar";

  const avatarCircle = document.createElement("div");
  avatarCircle.className = "circle";
  avatarCircle.style.backgroundColor = randomColor;
  avatarCircle.textContent = firstChar;


  // for shadow of same color
  avatarCircle.addEventListener("mouseenter", () => {
    avatarCircle.style.boxShadow = `0 0 10px ${randomColor}`;
  });

  avatarCircle.addEventListener("mouseleave", () => {
    avatarCircle.style.boxShadow = "none";
  });

  // when we click on avatar a delete pop up wil appear 
  avatarCircle.onclick = () => {
    const wantToDelete = confirm(`Hey! Do you want to remove "${userName}" from the avatar list?`);
    if (wantToDelete) {
      avatarArea.removeChild(avatarWrapper);
    }
  };

  const nameTag = document.createElement("div");
  nameTag.className = "name";
  nameTag.textContent = userName;

  avatarWrapper.appendChild(avatarCircle);
  avatarWrapper.appendChild(nameTag);

  //Insert new avatar just before the "+"button
  avatarArea.insertBefore(avatarWrapper, document.getElementById("addUserDiv"));

  // 🔄 Reset input and hide section
  nameField.value = "";
  inputBoxSection.classList.add("hidden");
}

// to add new user
function addUser() {
  const typedName = nameField.value.trim();

  if (typedName === "") {
    alert("Oops! Please type a name before adding.");
    return;
  }

  createAvatar(typedName);
}

// this function Create the '+' avatar button at the end
function createAddUserButton() {
  const plusDiv = document.createElement("div");
  plusDiv.className = "avatar";
  plusDiv.id = "addUserDiv";

  const plusCircle = document.createElement("div");
  plusCircle.className = "circle add-user";
  plusCircle.textContent = "+";

  // it will appear when user press "+" icon
  plusCircle.onclick = function () {
    inputBoxSection.classList.toggle("hidden");
    nameField.focus();
  };

  plusDiv.appendChild(plusCircle);
  avatarArea.appendChild(plusDiv);
}


createAddUserButton();
