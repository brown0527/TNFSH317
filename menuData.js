// public/menuData.js
// 集中管理所有店家的餐點與價格資訊

const MENU_DATA = {
    // 第一間：動筷·食 Dong di
    "動筷·食": [
        // 人氣特色餐盒
        { name: "招牌鐵板雞腿餐盒", price: 160, category: "人氣特色" },
        { name: "香煎挪威鮭魚餐盒", price: 190, category: "人氣特色" },
        { name: "手打鮮肉排餐盒", price: 100, category: "人氣特色" },
        
        // 經典餐盒
        { name: "銷魂肉燥餐盒", price: 100, category: "經典餐盒" },
        { name: "醬燒雞翅餐盒", price: 130, category: "經典餐盒" },
        { name: "壽喜牛腹餐盒", price: 150, category: "經典餐盒" },
        { name: "QQ豬餐盒", price: 150, category: "經典餐盒" },
        
        // 美味餐盒
        { name: "挪威鯖魚餐盒", price: 160, category: "美味餐盒" },
        { name: "三杯雞腿餐盒", price: 180, category: "美味餐盒" },
        { name: "雙蛋元氣餐盒", price: 90, category: "美味餐盒" },
        
        // 豪華極選
        { name: "嫩煎牛排餐盒", price: 230, category: "豪華極選" },
        { name: "極鮮厚切鮭魚餐盒", price: 280, category: "豪華極選" },
        
        // 單點品項
        { name: "單點-手打鮮肉排", price: 50, category: "單點" },
        { name: "單點-醬燒雞翅", price: 90, category: "單點" },
        { name: "單點-鐵板雞腿", price: 100, category: "單點" },
        { name: "單點-三杯雞腿", price: 120, category: "單點" },
        { name: "單點-挪威鯖魚", price: 100, category: "單點" },
        { name: "單點-極鮮鮭魚(半)", price: 140, category: "單點" },
        { name: "單點-極鮮鮭魚(全)", price: 230, category: "單點" },
        { name: "單點-嫩煎牛排", price: 180, category: "單點" },
        { name: "單點-荷包蛋", price: 15, category: "單點" }
    ],

    // 第二間：敬請享用 Olive
    "敬請享用": [
        // 雞肉系列
        { name: "舒肥雞胸餐盒", price: 120, category: "雞肉餐盒" },
        { name: "單點-舒肥雞胸", price: 70, category: "雞肉單點" },
        { name: "祖傳雞腿餐盒", price: 120, category: "雞肉餐盒" },
        { name: "單點-祖傳雞腿", price: 70, category: "雞肉單點" },
        { name: "夏日檸檬雞餐盒", price: 125, category: "雞肉餐盒" },
        { name: "單點-夏日檸檬雞", price: 75, category: "雞肉單點" },
        { name: "蔥油嫩雞胸餐盒", price: 125, category: "雞肉餐盒" },
        { name: "單點-蔥油嫩雞胸", price: 75, category: "雞肉單點" },
        { name: "醬燒春雞餐盒", price: 130, category: "雞肉餐盒" },
        { name: "單點-醬燒春雞", price: 80, category: "雞肉單點" },
        { name: "韓式辣醬雞餐盒", price: 130, category: "雞肉餐盒" },
        { name: "單點-韓式辣醬雞", price: 80, category: "雞肉單點" },
        { name: "川味香麻雞餐盒", price: 130, category: "雞肉餐盒" },
        { name: "單點-川味香麻雞", price: 80, category: "雞肉單點" },

        // 魚類系列
        { name: "鮮烤鯖魚餐盒", price: 120, category: "魚類餐盒" },
        { name: "單點-鮮烤鯖魚", price: 70, category: "魚類單點" },

        // 豬肉系列
        { name: "泰式打拋豬餐盒", price: 115, category: "豬肉餐盒" },
        { name: "單點-泰式打拋豬", price: 65, category: "豬肉單點" },
        { name: "蒜香里肌餐盒", price: 115, category: "豬肉餐盒" },
        { name: "單點-蒜香里肌", price: 65, category: "豬肉單點" },
        { name: "泡菜里肌餐盒", price: 125, category: "豬肉餐盒" },
        { name: "單點-泡菜里肌", price: 75, category: "豬肉單點" },
        { name: "花雕酒軟骨餐盒", price: 125, category: "豬肉餐盒" },
        { name: "單點-花雕酒軟骨", price: 75, category: "豬肉單點" },

        // 牛肉系列
        { name: "蔥燒雪花牛餐盒", price: 140, category: "牛肉餐盒" },
        { name: "單點-蔥燒雪花牛", price: 90, category: "牛肉單點" },
        { name: "泡菜雪花牛餐盒", price: 140, category: "牛肉餐盒" },
        { name: "單點-泡菜雪花牛", price: 90, category: "牛肉單點" },

        // 蔬食
        { name: "照燒杏鮑菇餐盒", price: 105, category: "蔬食餐盒" },
        { name: "單點-照燒杏鮑菇", price: 55, category: "蔬食單點" },

        // 單點配菜
        { name: "單點-地瓜(4塊)", price: 15, category: "單點配菜" },
        { name: "單點-全熟蛋", price: 15, category: "單點配菜" },
        { name: "單點-紫米飯", price: 20, category: "單點配菜" },
        { name: "單點-時令青菜", price: 35, category: "單點配菜" },

        // 無糖冷泡茶 (均一價 35 元)
        { name: "無糖冷泡茶-蜜香紅茶", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-高山青茶", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-桂花烏龍", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-玫瑰綠茶", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-粉玫瑰花茶", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-洋甘菊花茶", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-歐薄荷葉茶", price: 35, category: "冷泡茶" },
        { name: "無糖冷泡茶-藍莓水果茶", price: 35, category: "冷泡茶" }
    ],

    // 第三間：成功燒臘 (菜單顯示一律 95 元)
    "成功燒臘": [
        { name: "三寶飯", price: 95, category: "便當" },
        { name: "烤雞腿飯", price: 95, category: "便當" },
        { name: "油雞腿飯", price: 95, category: "便當" },
        { name: "鴛鴦雞飯", price: 95, category: "便當" },
        { name: "脆皮燒鴨飯", price: 95, category: "便當" },
        { name: "脆皮火肉飯", price: 95, category: "便當" },
        { name: "蜜汁叉燒飯", price: 95, category: "便當" },
        { name: "美汁叉燒飯", price: 95, category: "便當" },
        { name: "火香飯 (火肉+香腸)", price: 95, category: "雙拼便當" },
        { name: "火油飯 (火肉+油雞)", price: 95, category: "雙拼便當" },
        { name: "火燒飯 (火肉+燒鴨)", price: 95, category: "雙拼便當" },
        { name: "火肉飯", price: 95, category: "便當" },
        { name: "燒叉飯 (燒鴨+叉燒)", price: 95, category: "雙拼便當" },
        { name: "燒油飯 (燒鴨+油雞)", price: 95, category: "雙拼便當" },
        { name: "燒鴨飯", price: 95, category: "便當" },
        { name: "叉香飯 (叉燒+香腸)", price: 95, category: "雙拼便當" },
        { name: "叉油飯 (叉燒+油雞)", price: 95, category: "雙拼便當" },
        { name: "叉燒飯", price: 95, category: "便當" }
    ]
};