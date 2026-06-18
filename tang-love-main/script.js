let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = username ? username.substring(0, maxLength) : "???";

// 防止 `null` 变成 `"null"`
if (username) {
  questionText.innerText = questionText.innerText + safeUsername;
}

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！ ",
  "我会很伤心…",
  "不行:(",
];

// Yes 按钮点击事件（原来 No 的逻辑）
yesButton.addEventListener("click", function () {
  clickCount++;

  // 让 No 变大，每次放大 2 倍
  let noSize = 1 + clickCount * 1.2;
  noButton.style.transform = `scale(${noSize})`;

  // 挤压 Yes 按钮，每次右移 50px
  let yesOffset = clickCount * 50;
  yesButton.style.transform = `translateX(${yesOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // Yes 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    yesButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) mainImage.src = "images/shocked.png"; // 震惊
  if (clickCount === 2) mainImage.src = "images/think.png"; // 思考
  if (clickCount === 3) mainImage.src = "images/angry.png"; // 生气
  if (clickCount === 4) mainImage.src = "images/crying.png"; // 哭
  if (clickCount >= 5) mainImage.src = "images/crying.png"; // 之后一直是哭
});

// No 按钮点击后，进入表白成功页面（原来 Yes 的逻辑）
const loveTest = `我们是普通朋友  ${
  username ? `${safeUsername}` : ""
}`;

noButton.addEventListener("click", function () {
  // 先创建基础 HTML 结构
  document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text"></h1>
            <img src="images/hug.png" alt="拥抱" class="yes-image">
        </div>
    `;

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerText = loveTest;

  // 禁止滚动，保持页面美观
  document.body.style.overflow = "hidden";
});