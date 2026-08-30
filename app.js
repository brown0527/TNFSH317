// app.js - 核心業務邏輯與 API 互動
const API_URL = "https://script.google.com/macros/s/AKfycbynqIn5YiHNrwuhk6hNZbIq7x1mqxgKu1z-BY3WKI-n6JhlJZ3U0RfZWjjkjVtz6wI6/exec"; // 請確認此處為最新 GAS 網址
let currentUser = null;

// 切換頁面視圖
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// 解析 Google 回傳的 JWT Token (身分驗證)
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Google 登入回呼函數
async function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);
    const userEmail = responsePayload.email;

    // 💡 除錯用：印出目前 Google 登入送出的 Email
    console.log("【前端登入】實際送出的 Email:", userEmail);

    // 向後端驗證身分與取得資料
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: "login", email: userEmail })
        });
        const data = await res.json();
        
        // 💡 除錯用：印出 GAS 後端真實回傳的 JSON
        console.log("【後端回應】GAS 回傳結果:", data);
        
        if(data.status === 'success') {
            currentUser = data.user;
            document.getElementById('user-name').innerText = currentUser.name;
            document.getElementById('user-balance').innerText = `餘額: $${currentUser.balance}`;
            
            // 餘額低於 -200 警告
            if (currentUser.balance < -200) {
                alert("提醒：您的當前餘額低於 -200 元，請盡快繳費給管理員！");
            }

            if(currentUser.isAdmin) {
                document.getElementById('admin-btn').classList.remove('hidden');
            }
            
            showView('main-view');
            initCalendar(); // 初始化預訂餐點的日曆
        } else {
            alert(`此信箱 (${userEmail}) 未註冊於系統內。請確認試算表 K 欄是否有此信箱。`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("網路連線失敗或 GAS 網址有誤，請開啟 F12 查看主控台。");
    }
}

// 初始化日曆 (本周與下周)
function initCalendar() {
    const calContainer = document.getElementById('calendar-container');
    if (!calContainer) return;
    calContainer.innerHTML = '';
    
    for(let i=0; i<10; i++) {
        let div = document.createElement('div');
        div.className = 'cal-day yellow'; 
        div.innerText = `10/${15+i}`;
        div.onclick = () => showMenu(`10/${15+i}`);
        calContainer.appendChild(div);
    }
}

// 顯示菜單
function showMenu(date) {
    document.getElementById('menu-container').classList.remove('hidden');
    document.getElementById('store-name').innerText = "麥當勞 (測試)";
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = `
        <li><input type="radio" name="food" value="大麥克|100"> 大麥克 $100</li>
        <li><input type="radio" name="food" value="薯條|50"> 薯條 $50</li>
    `;
}

// 確認訂餐
async function confirmOrder() {
    const selected = document.querySelector('input[name="food"]:checked');
    if(!selected) return alert("請選擇餐點");
    
    if (currentUser.balance < -200) {
        alert("餘額低於 -200 元，不可點餐。");
        return;
    }

    const [item, price] = selected.value.split('|');
    const orderData = {
        store: document.getElementById('store-name').innerText,
        email: currentUser.email,
        seatNum: currentUser.seatNum,
        name: currentUser.name,
        item: item,
        price: parseInt(price),
        orderDate: "2026-08-30" 
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: "submitOrder", data: orderData })
    });
    const result = await res.json();
    if(result.status === 'success') {
        alert("訂購成功！");
        showView('main-view');
    }
}

// 轉餘額功能
async function submitTransfer() {
    if (currentUser.balance < -200) {
        return alert("餘額低於 -200，無法轉帳。");
    }
    
    const target = document.getElementById('transfer-target').value;
    const amount = parseInt(document.getElementById('transfer-amount').value);
    
    if (amount <= 0 || amount > 300) return alert("金額須大於0且上限為300。");
    if (!confirm(`確定要轉 ${amount} 元給 ${target} 嗎？`)) return;

    const transferData = {
        outSeat: currentUser.seatNum,
        outName: currentUser.name,
        inSeat: target.split('-')[0],
        inName: target.split('-')[1],
        amount: amount
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: "transferBalance", data: transferData })
    });
    
    const result = await res.json();
    if(result.status === 'success') {
        alert("轉帳資訊已送出！");
        showView('main-view');
    }
}

// 綁定「服務說明」與 modal 事件
document.addEventListener('DOMContentLoaded', () => {
    const termsLink = document.getElementById('terms-link');
    if(termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('terms-modal').classList.remove('hidden');
        });
    }
});

// 關閉服務說明視窗
function closeTerms() {
    document.getElementById('terms-modal').classList.add('hidden');
}
