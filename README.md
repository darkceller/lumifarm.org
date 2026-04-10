# 🌾 光農合作社群 Luminous Farmer's Network 官方網站

歡迎來到「光農合作社群」的開源網站庫！這是一個致力於推廣永續農耕、生態共生與在地青農串聯的數位基地。

🌐 **官方網站：** [https://www.lumifarm.org/](https://www.lumifarm.org/)
💌 **光農電子報：** [Substack 訂閱](您的Substack網址請填入此)

---

## 🛠️ 技術架構 (Tech Stack)

本網站採用當前最安全、高效的 **Jamstack (靜態網站生成)** 架構，確保無資料庫被駭風險，且擁有極佳的網頁載入速度與 SEO 表現。

* **核心框架：** [Hugo](https://gohugo.io/) (極速靜態網站生成器)
* **視覺主題：** [Blowfish](https://blowfish.page/) (高度客製化、支援 Tailwind CSS)
* **內容管理：** [Decap CMS](https://decapcms.org/) (透過 GitHub 授權的視覺化後台)
* **網站託管：** GitHub Pages (無伺服器架構，免費且穩定)
* **報名系統：** Tally Forms (無縫嵌入的無程式碼表單，保護個資)
* **流量分析：** Google Analytics 4 (GA4) + Google Search Console (GSC)

---

## ✨ 網站核心功能與改版亮點

* **自動化全站搜尋：** 透過編譯輸出 JSON 索引，支援右上角即時關鍵字搜尋。
* **模組化圖文卡片排版：** 針對「活動紀實」、「光農快訊」等目錄，強制採用 `layout = "card"`，自動抓取封面圖生成精美列表。
* **在地青農活動串聯 (Hub)：** 「農場活動月曆」除了發布自有活動，亦支援外部連結跳轉，協助推廣桃園在地友善農耕活動。
* **SEO 無縫轉移設定：** 支援在單篇文章中使用 `aliases` 語法（重新導向），完美保留舊版 Google 協作平台的 SEO 搜尋流量。
* **隱藏版管理員任意門：** 頁尾版權宣告處藏有 `⚙️ 管理員登入` 捷徑，點擊直達 `/admin` 後台。

---

## 📝 管理員操作指南 (CMS 操作備忘錄)

### 1. 發布文章與活動
請直接前往 [管理後台 (CMS)](https://www.lumifarm.org/admin)，使用 GitHub 帳號登入。
可管理的區塊包含：
* `📢 光農快訊`：農場動態與 Substack 電子報備份。
* `📸 活動紀實`：過去活動的圖文紀錄（請務必上傳封面照）。
* `📚 知識庫文章`：永續農業科普文章。
* `📅 農場活動 (月曆)`：未來的報名資訊與友站串聯。

### 2. Markdown 寫作與排版秘訣
* **換段落：** 必須按兩次 Enter（保留一行空白行）。
* **優雅分隔線：** 在空白行打上三個減號 `---`。
* **封面圖片注意事項：** 檔名請務必使用**純英文、數字與橫線**（例如：`tree-workshop-01.jpg`），避免使用中文或特殊符號導致破圖。

### 3. 網頁預覽機制
發布 (Publish) 後，GitHub 雲端主機需要 **1~2 分鐘** 進行編譯。
請勿立刻點擊預覽，喝口水稍等一下，直接開啟前台對應的目錄頁（如 `/records/`）即可看到最新長出的圖文卡片！

---

## 💻 本地端開發指南 (For Developers)

如果您需要修改程式碼或調整 CSS 樣式，請遵循以下步驟在本地端運行網站：

### 系統環境要求
* 安裝 [Git](https://git-scm.com/)
* 安裝 [Hugo (Extended 版本)](https://gohugo.io/installation/)

### 啟動步驟
1. 複製專案到本地端：
   ```bash
   git clone [https://github.com/darkceller/lumifarm.org.git](https://github.com/darkceller/lumifarm.org.git)
   cd lumifarm.org
