const bubble_container = document.querySelector(".bubble_container");
const chat_form_msg = document.querySelector(".chat_form_msg");

const chat_form_submit = document.querySelector(".chat_form_submit");
let chatValue;

const makeTalk = (chatValue) => {
  const createDiv = document.createElement("div");
  createDiv.classList.add("preview");
  createDiv.classList.add("bubble_preview");
  if (chatValue.startsWith(":")) {
  } else {
    createDiv.classList.add("my");
  }

  createDiv.innerHTML = `
            <div class="preview_col">
              <div class="preview_pic"></div>
            </div>
            <div class="preview_col bubble_wrap">
              <h4 class="preview_title">유저이름</h4>
              <div class="bubble_content">
                <p class="bubble">${chatValue}</p>
                <span class="bubble_time">오후 2:33</span>
              </div>
            </div>
    `;
  bubble_container.append(createDiv);
};

const upText = () => {
  chatValue = chat_form_msg.value;
  if (chatValue !== "") {
    makeTalk(chatValue);
  }
  chat_form_msg.value = "";
};

chat_form_submit.addEventListener("click", (e) => {
  e.preventDefault();

  upText();
});

chat_form_msg.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    upText();
  }
});
