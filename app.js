const API_URL = "https://script.google.com/macros/s/AKfycbwwV5Q0zKsGVhwrdfoXg_QqajgRxXIlpIV4H5xhh5hnzi_ufFIBKXMrl-RIJBWOZIeK/exec";
const CLIENT_ID = "423622761609-lr50g2rjd7lr17n282kb5dqalokjnero.apps.googleusercontent.com";

const MENU_DATA = {
  "動筷·食": [
    { name: "招牌鐵板雞腿餐盒", price: 160, category: "人氣特色" },
    { name: "香煎挪威鮭魚餐盒", price: 190, category: "人氣特色" },
    { name: "手打鮮肉排餐盒", price: 100, category: "人氣特色" },
    { name: "銷魂肉燥餐盒", price: 100, category: "經典餐盒" },
    { name: "醬燒雞翅餐盒", price: 130, category: "經典餐盒" },
    { name: "壽喜牛腹餐盒", price: 150, category: "經典餐盒" },
    { name: "QQ豬餐盒", price: 150, category: "經典餐盒" },
    { name: "挪威鯖魚餐盒", price: 160, category: "美味餐盒" },
    { name: "三杯雞腿餐盒", price: 180, category: "美味餐盒" },
    { name: "雙蛋元氣餐盒", price: 90, category: "美味餐盒" },
    { name: "嫩煎牛排餐盒", price: 230, category: "豪華極選" },
    { name: "極鮮厚切鮭魚餐盒", price: 280, category: "豪華極選" }
  ],
  "敬請享用": [
    { name: "舒肥雞胸餐盒", price: 120, category: "雞肉餐盒" },
    { name: "祖傳雞腿餐盒", price: 120, category: "雞肉餐盒" },
    { name: "夏日檸檬雞餐盒", price: 125, category: "雞肉餐盒" },
    { name: "蔥油嫩雞胸餐盒", price: 125, category: "雞肉餐盒" },
    { name: "醬燒春雞餐盒", price: 130, category: "雞肉餐盒" },
    { name: "韓式辣醬雞餐盒", price: 130, category: "雞肉餐盒" },
    { name: "川味香麻雞餐盒", price: 130, category: "雞肉餐盒" },
    { name: "鮮烤鯖魚餐盒", price: 120, category: "魚類餐盒" },
    { name: "泰式打拋豬餐盒", price: 115, category: "豬肉餐盒" },
    { name: "蒜香里肌餐盒", price: 115, category: "豬肉餐盒" },
    { name: "泡菜里肌餐盒", price: 125, category: "豬肉餐盒" },
    { name: "花雕酒軟骨餐盒", price: 125, category: "豬肉餐盒" },
    { name: "蔥燒雪花牛餐盒", price: 140, category: "牛肉餐盒" },
    { name: "泡菜雪花牛餐盒", price: 140, category: "牛肉餐盒" },
    { name: "照燒杏鮑菇餐盒", price: 105, category: "蔬食餐盒" }
  ],
  "成功燒臘": [
    { name: "三寶飯", price: 100, category: "便當" },
    { name: "烤雞腿飯", price: 100, category: "便當" },
    { name: "油雞腿飯", price: 100, category: "便當" },
    { name: "鴛鴦雞飯", price: 100, category: "便當" },
    { name: "脆皮燒鴨飯", price: 100, category: "便當" },
    { name: "脆皮火肉飯", price: 100, category: "便當" },
    { name: "蜜汁叉燒飯", price: 100, category: "便當" },
    { name: "美汁叉燒飯", price: 100, category: "便當" },
    { name: "火香飯 (火肉+香腸)", price: 100, category: "雙拼便當" },
    { name: "火油飯 (火肉+油雞)", price: 100, category: "雙拼便當" },
    { name: "火燒飯 (火肉+燒鴨)", price: 100, category: "雙拼便當" },
    { name: "火肉飯", price: 100, category: "便當" },
    { name: "燒叉飯 (燒鴨+叉燒)", price: 100, category: "雙拼便當" },
    { name: "燒油飯 (燒鴨+油雞)", price: 100, category: "雙拼便當" },
    { name: "燒鴨飯", price: 100, category: "便當" },
    { name: "叉香飯 (叉燒+香腸)", price: 100, category: "雙拼便當" },
    { name: "叉油飯 (叉燒+油雞)", price: 100, category: "雙拼便當" },
    { name: "叉燒飯", price: 100, category: "便當" }
  ]
};

const APP = { user: null, init: null, settingsMap: {}, menus: MENU_DATA, currentOrderDate: null };

function api(action, payload = {}) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload })
  }).then(async r => {
    const text = await r.text();
    try { return JSON.parse(text); } catch (e) { return { ok: false, message: text }; }
  });
}

function boot() {
  google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleCredentialResponse });
  renderLogin();
  api("getMarquee", {}).then(res => {
    if (res.ok) document.getElementById("marqueeText").textContent = res.data;
  }).catch(() => {});
}

function renderLogin() {
  document.getElementById("app").innerHTML = `
    <div id="loginPage" class="page active">
      <div class="login-card">
        <div class="brand">TNFSH317</div>
        <div class="welcome">歡迎使用訂餐系統</div>
        <hr>
        <div class="sub">請使用 Google 學校電子郵件進行身分認證</div>
        <div id="googleBtn"></div>
        <button class="link-btn" onclick="openTerms()">服務說明</button>
      </div>
    </div>
  `;
  google.accounts.id.renderButton(document.getElementById("googleBtn"), {
    theme: "outline", size: "large", width: 300, text: "signin_with"
  });
}

function handleCredentialResponse(response) {
  console.log("credential response", response);
  const payload = parseJwt(response.credential);
  console.log("payload", payload);

  APP.user = payload;

  api("login", { email: payload.email })
    .then(res => {
      console.log("login response", res);
      if (!res.ok) {
        alert(res.message || "login 失敗");
        return;
      }
      APP.init = res;
      APP.settingsMap = res.settingsMap || {};
      enterHome(res);
    })
    .catch(err => {
      console.error(err);
      alert("登入後載入失敗：" + String(err));
    });
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")));
}

function enterHome(res) {
  if (!res || !res.student) {
    alert("登入成功但沒有學生資料");
    return;
  }

  const noticeHtml = res.notice ? `<div id="noticeBox" class="notice">${res.notice}</div>` : "";
  document.getElementById("app").innerHTML = `
    <div id="homePage" class="page active">
      <div class="topbar">
        <div class="balance">餘額：${res.student.balance}</div>
        <div class="profile">
          <img id="avatar" class="avatar" src="${APP.user.picture || ""}">
          <div>
            <div id="studentName">${res.student.name}</div>
            <div id="studentSeat">${res.student.seatNo}</div>
          </div>
        </div>
      </div>
      ${noticeHtml}
      <div class="services">
        <div class="service-card" onclick="goOrder()">預訂餐點</div>
        <div class="service-card" onclick="goHistory()">訂餐紀錄</div>
        <div class="service-card" onclick="goAircon()">冷氣繳費</div>
      </div>
      <div class="service-card" onclick="goTransfer()">轉餘額</div>
      ${res.admin ? '<div class="service-card" onclick="goAdmin()">管理員面板</div>' : ''}
    </div>
    <div id="pageHost"></div>
  `;
  document.getElementById("marqueeText").textContent = res.marquee || "歡迎使用 TNFSH317 訂餐系統";
  if (res.notice) alert(res.notice);
}

function backHome() { document.getElementById("pageHost").innerHTML = ""; }

function pageShell(title, inner) {
  document.getElementById("pageHost").innerHTML = `
    <div class="page active">
      <div class="page-head">
        <button onclick="backHome()">←</button>
        <h2>${title}</h2>
      </div>
      ${inner}
    </div>
  `;
}

function openTerms() {
  alert("服務說明：登入需使用學校 Google 帳號，資料會寫入試算表。");
}

function goOrder() {
  pageShell("預訂餐點", `<div id="calendarGrid" class="grid"></div><div id="orderPanel"></div>`);
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const setting = APP.settingsMap[iso];
    const div = document.createElement("div");
    div.className = "day";
    if (setting && setting.status === "done") div.classList.add("green");
    else if (setting) div.classList.add("yellow");
    else div.classList.add("gray");
    div.innerHTML = `<div class="date">${d.getDate()}</div><div>${iso}</div>`;
    div.onclick = () => openOrderDate(iso);
    grid.appendChild(div);
  }
}

function openOrderDate(dateIso) {
  APP.currentOrderDate = dateIso;
  const setting = APP.settingsMap[dateIso] || {};
  const menu = APP.menus[setting.shop] || [];
  const grouped = {};
  menu.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  const html = Object.keys(grouped).map(cat => `
    <h3>${cat}</h3>
    ${grouped[cat].map(item => `
      <label class="item">
        <input type="checkbox" class="menuItem" data-name="${item.name}" data-price="${item.price}" onchange="calcTotal()">
        ${item.name} - $${item.price}
      </label>
    `).join("")}
  `).join("");

  document.getElementById("orderPanel").innerHTML = `
    <div class="panel">
      <h3>日期：${dateIso}</h3>
      <div>商家：${setting.shop || "尚未設定"}</div>
      ${html || "<div>尚無餐點資料</div>"}
      <div style="margin-top:10px;">總金額：<span id="orderTotal">0</span></div>
      <button onclick="submitOrder()">前往確認</button>
    </div>
  `;
}

function calcTotal() {
  let total = 0;
  document.querySelectorAll(".menuItem").forEach(chk => {
    if (chk.checked) total += Number(chk.dataset.price || 0);
  });
  document.getElementById("orderTotal").textContent = total;
}

function submitOrder() {
  const items = [];
  document.querySelectorAll(".menuItem").forEach(chk => {
    if (chk.checked) items.push(`${chk.dataset.name} ${chk.dataset.price}`);
  });
  const total = Number(document.getElementById("orderTotal").textContent || 0);
  const setting = APP.settingsMap[APP.currentOrderDate] || {};
  if (!items.length) return alert("請至少選擇一項");
  if (!confirm(`確認預訂\n日期：${APP.currentOrderDate}\n商家：${setting.shop}\n${items.join("\n")}\n總額：${total}`)) return;

  api("submitOrder", {
    email: APP.user.email,
    shop: setting.shop,
    itemsText: items.join("、"),
    total,
    orderDate: APP.currentOrderDate,
    deadline: setting.deadline || "",
    note: ""
  }).then(res => alert(res.message)).catch(err => alert(String(err)));
}

function goHistory() {
  pageShell("訂餐紀錄", `<div id="historyArea" class="panel">載入中...</div>`);
  api("getOrderHistory", { email: APP.user.email }).then(res => {
    document.getElementById("historyArea").innerHTML = (res.list || []).map(x => `
      <div class="item">
        <div>時間：${x.timestamp}</div>
        <div>商家：${x.shop}</div>
        <div>品項：${x.items}</div>
        <div>金額：${x.amount}</div>
      </div>
    `).join("") || "沒有訂餐紀錄";
  });
}

function goAircon() {
  pageShell("冷氣繳費", `
    <div class="panel">
      <div class="row">
        <input id="airDate" type="date" style="flex:1;padding:10px;">
        <input id="startTime" type="time" style="flex:1;padding:10px;">
        <input id="endTime" type="time" style="flex:1;padding:10px;">
      </div>
      <button onclick="sendAircon()" style="margin-top:10px;">送出繳費</button>
    </div>
  `);
}

function sendAircon() {
  api("submitAircon", {
    email: APP.user.email,
    date: document.getElementById("airDate").value,
    startTime: document.getElementById("startTime").value,
    endTime: document.getElementById("endTime").value
  }).then(res => alert(res.message));
}

function goTransfer() {
  pageShell("轉餘額", `<div id="transferArea" class="panel">載入中...</div>`);
  api("getTransferStudents", { email: APP.user.email }).then(res => {
    const list = res.list || [];
    document.getElementById("transferArea").innerHTML = `
      <div class="item">
        <select id="toStudent" style="width:100%;padding:10px;">
          ${list.map(x => `<option value="${x.seatNo}|${x.name}">${x.label}</option>`).join("")}
        </select>
        <input id="transferAmount" type="number" min="1" max="300" placeholder="轉多少餘額" style="width:100%;padding:10px;margin-top:8px;">
        <button onclick="confirmTransfer()" style="margin-top:10px;width:100%;padding:12px;">再次確認</button>
      </div>
    `;
  });
}

function confirmTransfer() {
  const [seatNo, name] = document.getElementById("toStudent").value.split("|");
  const amount = Number(document.getElementById("transferAmount").value);
  if (!amount || amount <= 0 || amount > 300) return alert("金額錯誤");
  if (!confirm(`確認轉餘額給 ${seatNo} ${name}\n金額：${amount}`)) return;
  api("submitTransfer", { email: APP.user.email, toSeatNo: seatNo, toName: name, amount })
    .then(res => alert(res.message));
}

function goAdmin() {
  pageShell("管理員面板", `<div id="adminArea" class="panel">載入中...</div>`);
  api("adminDashboard", { email: APP.user.email }).then(res => {
    if (!res.ok) return alert(res.message);
    const settings = (res.settings || []).slice(1).map(r => ({
      date: r[0], shop: r[1], deadline: r[2], status: r[3], color: r[4], note: r[5]
    }));
    document.getElementById("adminArea").innerHTML = `
      <div class="item">
        <h3>跑馬燈</h3>
        <input id="marqueeInput" value="${res.marquee || ""}" style="width:100%;padding:10px;">
        <button onclick="saveMarquee()">儲存跑馬燈</button>
      </div>
      <div class="item">
        <h3>訂餐設定</h3>
        <div id="settingsEditor"></div>
        <button onclick="addSettingRow()">新增日期設定</button>
        <button onclick="saveSettings()">儲存設定</button>
      </div>
      <div class="item">
        <h3>各日統計表</h3>
        <table>
          <tr><th>日期</th><th>商家</th><th>人數</th><th>總金額</th></tr>
          ${(res.stats || []).map(x => `<tr><td>${x.date}</td><td>${x.shop}</td><td>${x.count}</td><td>${x.total}</td></tr>`).join("")}
        </table>
      </div>
    `;
    window._settings = settings;
    renderSettingsEditor(settings);
  });
}

function renderSettingsEditor(settings) {
  const host = document.getElementById("settingsEditor");
  host.innerHTML = settings.map((x) => `
    <div class="item">
      <div>日期：<input data-k="date" value="${x.date || ""}" style="width:100%;padding:8px;"></div>
      <div>商家：<input data-k="shop" value="${x.shop || ""}" style="width:100%;padding:8px;margin-top:6px;"></div>
      <div>截止：<input data-k="deadline" value="${x.deadline || ""}" style="width:100%;padding:8px;margin-top:6px;"></div>
      <div>狀態：<select data-k="status" style="width:100%;padding:8px;margin-top:6px;">
        <option value="" ${x.status===""?"selected":""}>未完成</option>
        <option value="done" ${x.status==="done"?"selected":""}>已完成</option>
      </select></div>
      <div>顏色：<select data-k="color" style="width:100%;padding:8px;margin-top:6px;">
        <option value="" ${x.color===""?"selected":""}>無</option>
        <option value="yellow" ${x.color==="yellow"?"selected":""}>黃色</option>
        <option value="green" ${x.color==="green"?"selected":""}>綠色</option>
      </select></div>
      <div>備註：<input data-k="note" value="${x.note || ""}" style="width:100%;padding:8px;margin-top:6px;"></div>
    </div>
  `).join("");
}

function addSettingRow() {
  window._settings.push({ date:'', shop:'', deadline:'', status:'', color:'', note:'' });
  renderSettingsEditor(window._settings);
}

function saveMarquee() {
  api("adminSaveMarquee", {
    email: APP.user.email,
    marquee: document.getElementById("marqueeInput").value
  }).then(res => alert(res.message));
}

function saveSettings() {
  const rows = [];
  document.querySelectorAll("#settingsEditor .item").forEach(block => {
    rows.push({
      date: block.querySelector('[data-k="date"]').value,
      shop: block.querySelector('[data-k="shop"]').value,
      deadline: block.querySelector('[data-k="deadline"]').value,
      status: block.querySelector('[data-k="status"]').value,
      color: block.querySelector('[data-k="color"]').value,
      note: block.querySelector('[data-k="note"]').value
    });
  });
  api("adminSaveSettings", { email: APP.user.email, settings: rows })
    .then(res => alert(res.message));
}

window.onload = boot;
