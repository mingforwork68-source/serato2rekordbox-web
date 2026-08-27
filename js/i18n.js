// Lightweight client-side i18n: no build step, no network requests.
// Language choice is stored in localStorage and applied by walking the
// DOM for data-i18n / data-i18n-html / data-i18n-placeholder / data-i18n-alt
// attributes. main.js calls S2R_I18N.t(key, params) for dynamic strings.
window.S2R_DICT = {
  "zh-Hant": {
    "meta.title": "Serato → Rekordbox 轉換工具(離線網頁版)",
    "app.title": "Serato → Rekordbox 轉換工具",
    "app.subtitle": "離線網頁版 · 純瀏覽器端執行",
    "notice.clientSide": "這個頁面完全在你的瀏覽器裡執行,音樂檔案只會在本機被讀取來解析 Cue 資訊,不會透過網路傳送到任何地方,也不會離開這台電腦。關掉分頁資料就消失了。",
    "notice.backup": `<strong>建議:</strong>雖然本工具只會「讀取」你的音樂檔案與 Serato 資料庫、不會覆寫或修改原始檔案,轉檔前還是建議先備份好你的音樂資料夾與 <code>_Serato_</code> 資料夾,以防萬一(例如硬碟異常、誤刪等與本工具無關的意外)。`,

    "common.btnSelectFolder": "選擇資料夾",
    "common.notSelected": "尚未選擇",
    "common.btnClearReselect": "清空重選",
    "common.macHeading": "🍎 macOS",
    "common.winHeading": "🪟 Windows",
    "common.pathUsuallyIs": "路徑通常是:",

    "video.heading": "📺 教學影片",
    "step1.heading": "① Serato 播放列表(選填,用來還原歌曲順序)",
    "step1.dropzoneText": `把 <code>_Serato_</code> 資料夾或單一 <code>.crate</code> 檔案拖到這裡,或`,
    "step1.btnSelectFile": "選擇 .crate 檔案",
    "step1.help.summary": `❓ 不知道 <code>.crate</code> 檔案在哪裡?點這裡看說明`,
    "step1.help.macDesc": `裡面每一個 <code>.crate</code> 檔案就是一個 Serato 播放列表(crate),檔名就是列表名稱。可以整個 <code>_Serato_</code> 資料夾一起拖進上面,或是只挑幾個 <code>.crate</code> 檔案上傳。`,
    "step1.help.winPathExample": `C:\\Users\\你的帳號\\Music\\_Serato_\\Subcrates\\`,
    "step1.help.winDesc": `同樣地,每個 <code>.crate</code> 檔案就是一個播放列表。如果列表名稱裡有用資料夾分類(子清單),檔名會用 <code>%%</code> 分隔,例如 <code>Techno%%Hard.crate</code> 代表「Techno」資料夾底下的「Hard」子清單,不影響直接選取使用。`,

    "step2.heading": "② 音樂資料夾(單一資料夾)",
    "step2.dropzoneText": "把「一個」音樂資料夾拖到這裡,或",
    "step2.rootPlaceholderDefault": "例如 /Users/yourname/Music/IMDJ",
    "step2.help.summary": "❓ 不知道怎麼找到完整路徑?點這裡看 Mac / Windows 教學",
    "step2.help.mac.li1": `用 Spotlight(<kbd>⌘</kbd>+<kbd>空白鍵</kbd>)打開「終端機 Terminal」`,
    "step2.help.mac.li2": "直接把你的音樂資料夾從 Finder 拖進 Terminal 視窗裡",
    "step2.help.mac.li3": `路徑文字會自動打出來,選起來複製(<kbd>⌘C</kbd>),貼到上面的欄位就好(不用按 Enter)`,
    "step2.help.mac.terminalTitle": "終端機",
    "step2.help.mac.dragHint": "拖進來 →",
    "step2.help.win.li1": `在檔案總管裡,點一下「選取」你的音樂資料夾(不要打開它)`,
    "step2.help.win.li2": `按住 <kbd>Shift</kbd> 再按滑鼠右鍵,選單裡點「複製為路徑」`,
    "step2.help.win.li3": `貼到上面的欄位;如果前後有引號 <code>"</code>,記得刪掉`,
    "step2.help.win.title": "📁 檔案總管",
    "step2.help.win.selectedHint": "(已選取)",
    "step2.help.win.menuOpen": "開啟",
    "step2.help.win.menuCopyPath": "複製為路徑",
    "step2.help.win.menuRename": "重新命名",
    "step2.help.win.hintline": `<kbd>Shift</kbd> + 右鍵`,

    "step3.heading": "③ 選項",
    "step3.checkboxLabel": "轉換 Hot Cue / Loop 資訊",
    "step3.desc": "開啟:Hot Cue、Loop 完全比照 Serato 原始設定轉換過去。關閉:完全不處理 Cue/Hot Cue/Loop,只轉換歌曲本身的資訊(標題、演出者、專輯等)。",

    "step4.heading": "④ 開始轉換",
    "step4.btnConvert": "開始轉換",
    "step4.progressNotStarted": "尚未開始",
    "step4.btnDownloadXml": "下載 Rekordbox XML",
    "step4.btnDownloadReport": "下載報告(report.txt)",

    "step5.heading": "⑤ 怎麼把 XML 匯入 Rekordbox",
    "step5.li1": `打開 Rekordbox,點左上角選單進入「<strong>喜好設定</strong>」`,
    "step5.li2": `上方分頁點「<strong>檢視</strong>」,再點左邊的「<strong>配置</strong>」,在「<strong>樹狀檢視</strong>」裡確認「<strong>rekordbox xml</strong>」已經打勾(沒打勾的話,匯入後左側清單不會出現這個項目)`,
    "step5.li3": `上方分頁點「<strong>進階</strong>」,再點左邊的「<strong>資料庫</strong>」`,
    "step5.li4": `找到「<strong>rekordbox xml</strong>」區塊裡的「<strong>匯入資料庫</strong>」欄位,按旁邊的「<strong>瀏覽</strong>」按鈕`,
    "step5.li5": `選你剛剛下載的那個 <code>.xml</code> 檔案(通常在「下載項目」資料夾裡),選完關掉喜好設定視窗`,
    "step5.li6": `左側清單會自動出現「<strong>rekordbox xml</strong>」項目,展開就能看到「全部音軌」和你的播放列表`,
    "step5.li7": `在想要的播放列表上按<strong>右鍵</strong>,選擇「<strong>匯入播放清單</strong>」,才算真正加進你的曲庫(單純看得到不算匯入)`,
    "step5.note1": `💡 小提醒:Rekordbox 匯入播放列表時只會讀取歌曲路徑,建立曲目與播放列表的連結;實際的 Hot Cue、Memory Cue 資料要等你點開該首歌曲播放/載入後,Rekordbox 才會實際分析並寫入。所以匯入後,建議把播放列表裡的歌曲都點開播放過一次,確保 Cue 點資料正確同步顯示。`,
    "step5.help.summary": "❓ 不知道畫面在哪裡?點這裡看圖解教學(附截圖)",
    "step5.caption2": "步驟②:喜好設定 → 檢視 → 配置,確認「rekordbox xml」已勾選",
    "step5.caption345": "步驟③④⑤:喜好設定 → 進階 → 資料庫,選好 XML 檔案再按瀏覽",
    "step5.caption67": "步驟⑥⑦:左側會出現「rekordbox xml」,在播放列表上按右鍵選「匯入播放清單」",
    "step5.alt2": "Rekordbox 檢視設定,確認 rekordbox xml 已勾選",
    "step5.alt345": "Rekordbox 喜好設定畫面",
    "step5.alt67": "Rekordbox 右鍵選單匯入播放清單",
    "step5.callout2": "② 確認已勾選",
    "step5.callout3": "③ 進階",
    "step5.callout4": "④ 資料庫",
    "step5.callout5": "⑤ 選 XML,按瀏覽",
    "step5.callout6": "⑥ 你的播放列表",
    "step5.callout7": "⑦ 按右鍵→匯入播放清單",

    "footer.privacy": "隱私權政策",
    "footer.disclaimer": "免責聲明",
    "footer.reportIssue": "回報問題",
    "footer.contactEmail": "或寄信給我們",
    "footer.blogHotcue": "Hot Cue 同步教學",
    "footer.faq": "常見問題",

    "status.serato.loaded": "已讀取 {count} 個 .crate 播放列表:{shown}{suffix}",
    "status.serato.loadedSuffix": " 等,共 {n} 個",
    "status.serato.scannedNoCrate": "掃到 {count} 個檔案,但裡面沒有任何 .crate(例如:{sample})。請確認選到的資料夾底下真的有 Subcrates 資料夾、裡面是 .crate 檔案。",

    "step2.rootLabel": "「{folder}」資料夾在你電腦上的完整路徑:",
    "step2.rootPlaceholder": "例如 /Users/yourname/Music/{folder}",
    "step2.rootWhyHint": "為什麼還要另外輸入路徑?基於瀏覽器安全限制,網頁沒辦法自動偵測資料夾在你電腦上的實際位置,需要手動貼上才能產生正確的檔案位置。",
    "status.music.selectedIgnored": "已選擇「{folder}」,共 {count} 個音樂檔案(這裡只支援單一資料夾,已忽略:{ignored})",
    "status.music.selected": "已選擇 {count} 個音樂檔案",

    "progress.scanning": "掃描音樂檔案並讀取 Cue 資訊",
    "progress.loadingCrates": "讀取 Serato 播放列表",
    "progress.buildingXml": "產生 Rekordbox XML",
    "progress.labelFormat": "{label} ({done}/{total})",

    "log.scanDone": "掃描完成:OK {ok}、NOCUE {nocue}、ERROR {error}",
    "log.playlistsLoaded": "已讀取 {count} 個播放列表",
    "log.done": "完成!可以下載 XML 了。",
    "log.unexpectedError": "發生未預期的錯誤:{error}",

    "summary.main": "共 {total} 個檔案:OK {ok}、NOCUE {nocue}、ERROR {error}。",
    "summary.playlistMatch": " 播放列表比對:缺少 {missing}、模糊比對 {fuzzy}。",
    "summary.noPlaylist": " 沒有匯入播放列表。",

    "privacy.title": "隱私權政策 — Serato → Rekordbox 轉換工具",
    "privacy.h1": "隱私權政策",
    "privacy.subtitle": "Serato → Rekordbox 轉換工具(離線網頁版)",
    "privacy.section1.h2": "這個工具怎麼處理你的資料",
    "privacy.section1.p1": `本工具是一個純前端(client-side)網頁應用程式。你選取或拖入的音樂檔案、Serato 播放列表(<code>.crate</code>)資料,全部只會在<strong>你自己電腦上的瀏覽器裡</strong>被讀取與解析,用來產生 Rekordbox XML 檔案。整個過程中,這些檔案內容<strong>不會透過網路上傳、傳送或儲存到任何伺服器</strong>,包含本網站本身的伺服器在內。`,
    "privacy.section1.p2": "你關閉分頁或重新整理頁面後,所有已讀取的資料就會從瀏覽器記憶體中清除。",
    "privacy.section2.h2": "本機儲存(localStorage)",
    "privacy.section2.p1": `為了方便使用,本工具會用瀏覽器的 <code>localStorage</code> 記住你輸入過的「音樂資料夾絕對路徑」文字,純粹是為了下次不用重新輸入。這筆資料只存在你自己的瀏覽器裡,不會被傳送出去,你可以隨時透過瀏覽器設定清除網站資料來移除它。`,
    "privacy.section3.h2": "Cookie 與廣告",
    "privacy.section3.p1": `本網站使用 <strong>Google AdSense</strong> 刊登廣告。Google 及其廣告合作夥伴可能會使用 Cookie 或類似技術,依你先前造訪本網站及其他網站的紀錄,投放個人化廣告。這部分的資料蒐集與使用由 Google 主導,與本工具的「轉檔功能」完全分開(轉檔功能仍是 100% 在你自己的瀏覽器裡執行,不會上傳任何音樂檔案或路徑資訊)。你可以前往 <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google 廣告設定</a> 管理或關閉個人化廣告,也可以參考 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Google 合作夥伴網站如何使用 Cookie</a> 的說明。`,
    "privacy.section4.h2": "網站託管",
    "privacy.section4.p1": `本網站由 GitHub Pages 提供靜態網頁託管。GitHub 可能依其自身服務需求,記錄基本的伺服器存取紀錄(例如 IP 位址、瀏覽器資訊),這部分不屬於本工具的控制範圍,詳情請參考 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub 的隱私權聲明</a>。`,
    "privacy.section5.h2": "未來若有變更",
    "privacy.section5.p1": "若本工具未來新增其他會蒐集資料的功能(例如網站流量分析工具),會在此頁面更新說明。",
    "common.backToTool": "← 回到轉換工具",

    "faq.title": "常見問題 — Serato → Rekordbox 轉換工具",
    "faq.h1": "常見問題",
    "faq.q1.h2": "這個工具跟 Serato、Pioneer DJ(rekordbox)官方有合作或授權關係嗎?",
    "faq.q1.p1": `沒有。這是個人開發、免費提供的非官方工具,與 Serato Inc.、AlphaTheta Corporation(rekordbox / Pioneer DJ)並無任何隸屬、合作或授權關係,詳見<a href="disclaimer.html">免責聲明</a>。`,
    "faq.q2.h2": "我的音樂檔案會被上傳到伺服器嗎?",
    "faq.q2.p1": `不會。整個轉換過程 100% 在你自己的瀏覽器裡執行,音樂檔案與路徑資訊都不會透過網路傳送到任何伺服器,詳見<a href="privacy.html">隱私權政策</a>。`,
    "faq.q3.h2": "支援哪些音樂檔案格式?",
    "faq.q3.p1": "MP3、FLAC、WAV、AIFF、M4A/ALAC。",
    "faq.q4.h2": "Hot Cue、Loop 資訊轉換的準確度如何?",
    "faq.q4.p1": "工具會直接讀取 Serato 原始的 Cue 資料並對應到 Rekordbox 的格式,絕大多數情況能正確轉換。不過兩邊軟體的 Cue 系統設計不完全相同(例如顏色顯示、數量上限等細節),建議匯入 Rekordbox 後實際比對一次,確認結果符合預期。",
    "faq.q5.h2": "為什麼還要手動輸入音樂資料夾路徑,不能自動偵測嗎?",
    "faq.q5.p1": "基於瀏覽器安全限制,網頁沒辦法自動讀取資料夾在你電腦上的實際絕對路徑,只能取得檔案本身的內容與檔名。所以需要手動貼上路徑文字,產生的 XML 才能讓 Rekordbox 正確找到音樂檔案的位置。",
    "faq.q6.h2": "轉換完成後,要怎麼把 XML 匯入 Rekordbox?",
    "faq.q6.p1": `回到<a href="index.html">轉換工具首頁</a>,下方步驟⑤有完整的圖文教學(含截圖),照著操作即可。匯入後如果發現 Hot Cue 是空的,可以參考這篇<a href="blog-hotcue-sync.html">Hot Cue 同步教學</a>,說明了 Rekordbox 匯入機制的原理與正確檢查步驟。`,
    "faq.q7.h2": "下載的報告裡,ERROR 或 NOCUE 是什麼意思?",
    "faq.q7.p1": "ERROR 代表這首歌在轉換時發生錯誤(例如檔案格式不支援或已損毀);NOCUE 代表沒有讀取到這首歌的 Serato Cue 資訊(可能是這首歌原本在 Serato 裡就沒有設定過 Hot Cue/Loop)。可以下載 report.txt 查看詳細清單。",
    "faq.q8.h2": "使用前為什麼建議先備份?",
    "faq.q8.p1": "本工具設計上只會「讀取」你的檔案,不會覆寫或修改任何原始檔案。但任何操作前先備份都是好習慣,可以避免與本工具無關的意外(例如硬碟或作業系統問題)造成資料遺失。",
    "faq.q9.h2": "這個工具需要付費嗎?",
    "faq.q9.p1": "完全免費。原始碼採用 MIT 授權,公開在 GitHub 上。",
    "faq.q10.h2": "支援手機或平板使用嗎?",
    "faq.q10.p1": "建議使用桌面版瀏覽器(如 Chrome、Edge、Firefox)。因為需要選取整個音樂資料夾,手機瀏覽器普遍不支援這項功能。",
    "faq.q11.h2": "Windows 和 Mac 都能用嗎?",
    "faq.q11.p1": "都可以。這是純網頁工具,只要瀏覽器支援即可,不需要另外安裝任何軟體。",
    "faq.q12.h2": "使用時遇到問題,或有功能建議,要怎麼回報?",
    "faq.q12.p1": `歡迎到 <a href="https://github.com/mingforwork68-source/serato2rekordbox-web/issues" target="_blank" rel="noopener">GitHub Issues</a> 頁面回報,連結也在每個頁面的頁尾。`,

    "disclaimer.title": "免責聲明 — Serato → Rekordbox 轉換工具",
    "disclaimer.h1": "免責聲明",
    "disclaimer.section1.h2": "非官方工具",
    "disclaimer.section1.p1": `本工具為個人開發、提供給 DJ 自行轉換自己音樂庫用的非官方小工具,與 Serato Inc.、AlphaTheta Corporation(rekordbox / Pioneer DJ)並無任何隸屬、合作、授權或背書關係。「Serato」「rekordbox」等名稱及商標均為其個別公司所有。`,
    "disclaimer.section2.h2": "使用範圍",
    "disclaimer.section2.p1": `本工具僅供使用者轉換<strong>自己合法擁有或有權使用</strong>的音樂檔案與播放列表資料,音樂檔案本身的著作權仍歸原創作者/發行方所有。使用者須自行確保對所處理的音樂檔案與中繼資料擁有合法使用權限,並自行負責後續使用行為是否合乎當地法規。`,
    "disclaimer.section3.h2": "建議先備份",
    "disclaimer.section3.p1": `本工具在設計上只會「讀取」你的音樂檔案與 <code>_Serato_</code> 資料夾內容,不會寫入或修改任何原始檔案。即便如此,仍強烈建議在使用本工具前,先備份好你的音樂資料夾與 Serato 資料庫,以避免任何與本工具無關的意外(例如作業系統、硬碟或其他軟體造成的問題)導致資料遺失。`,
    "disclaimer.section4.h2": "不保證結果正確",
    "disclaimer.section4.p1": "本工具以「現狀」(as-is)提供,不保證產生的 Rekordbox XML 檔案在所有情況下都完全正確,也不保證能相容所有版本的 Rekordbox。匯入前後請自行核對曲目、播放列表、Hot Cue/Loop 等資訊是否符合預期。",
    "disclaimer.section5.h2": "責任限制",
    "disclaimer.section5.p1": "使用本工具即表示你已詳閱並同意本聲明的內容,並自行承擔使用本工具的一切風險。在法律允許的最大範圍內,開發者不對因使用或無法使用本工具而導致的任何資料遺失、損毀或其他損失負責。",

    "article1.title": "Hot Cue 沒有同步?一次搞懂 Rekordbox 匯入 Serato 播放列表的原理 — Serato → Rekordbox 轉換工具",
    "article1.h1": "Hot Cue 沒有同步?一次搞懂 Rekordbox 匯入 Serato 播放列表的原理",
    "article1.subtitle": "為什麼匯入播放列表後,Hot Cue、Memory Cue 卻是空的",
    "article1.section1.h2": "你是不是也遇過這個狀況",
    "article1.section1.p1": "用轉換工具把 Serato 的播放列表轉成 Rekordbox 的 XML,匯入後打開清單,歌曲都在,順序也對,但點開歌曲一看,Hot Cue 卻完全沒有,好像轉換沒有生效一樣。別急著懷疑轉換工具出錯,這其實是 Rekordbox 匯入機制本身的行為,幾乎每個第一次從 Serato 換過來的 DJ 都會踩到。",
    "article1.section2.h2": "Rekordbox 匯入 XML 時,到底做了什麼",
    "article1.section2.p1": `當你透過「偏好設定 → 進階 → 資料庫 → 匯入資料庫」載入一個 rekordbox XML 檔案時,Rekordbox 做的事情其實只有兩件:第一,讀取 XML 裡列出的曲目路徑,把這些路徑對應到你電腦上真正存在的音樂檔案;第二,依照 XML 裡的播放列表結構,把曲目「連結」進對應的播放列表。整個過程只處理路徑跟清單結構,並不會主動去分析音檔本身、也不會把 Cue 點資料寫進 Rekordbox 自己的曲庫資料庫裡,即使 XML 檔案裡其實已經包含了完整的 Hot Cue、Memory Cue 座標資訊。`,
    "article1.section3.h2": "Cue 點資料其實一直都在,只是還沒「寫入」",
    "article1.section3.p1": "真正觸發 Rekordbox 讀取並寫入 Cue 點的動作,是你實際打開這首歌——不管是雙擊播放清單裡的曲目載入到 Deck,或是在瀏覽器裡按右鍵選擇播放預覽,只要 Rekordbox 真正解析過這首歌的音檔一次,它才會把 XML 裡附帶的 Cue 點資訊寫進自己的資料庫,之後這些 Cue 點才會固定顯示在曲目資訊裡,不用每次都重新載入。換句話說,匯入播放列表只是完成了「牽線」的動作,Cue 點資料的「入庫」還需要你親自把每首歌至少開過一次。",
    "article1.section4.h2": "正確的匯入後檢查流程",
    "article1.section4.list": `<ol><li>匯入播放列表後,先展開清單確認曲目數量、順序是否正確</li><li>依序點開播放列表裡的每一首歌(雙擊載入到任一個 Deck 即可,不需要真的播放完)</li><li>載入後留意 Deck 畫面下方是否出現 Hot Cue 色塊、或波形上出現 Memory Cue 標記</li><li>全部載入過一輪後,再回到播放列表任意點開一首歌確認 Cue 點是否已經穩定顯示(此時不用再重新載入就能看到)</li><li>若曲目數量非常多,建議分批處理,例如先處理當週要用的歌單,而不是整個曲庫一次全部點開</li></ol>`,
    "article1.section5.h2": "順手就能避免的坑",
    "article1.section5.p1": "部分 DJ 會因為看到播放列表已經匯入、曲目數量也對就直接關掉 Rekordbox,下次到場地才發現 Cue 點是空的。建議養成「匯入當下就把要用的歌單全部點開過一次」的習慣,尤其是表演前一天轉換曲庫時,千萬別留到上場前才發現沒做這一步。",
    "article1.cta.h2": "還沒轉換過自己的曲庫?",
    "article1.cta.p1": `如果你還沒轉換過自己的 Serato 曲庫,可以直接使用免費的 <a href="index.html">Serato → Rekordbox 轉換工具</a>,或觀看首頁內嵌的完整教學影片,一步一步跟著操作。有任何轉換上的問題,也歡迎到 <a href="https://github.com/mingforwork68-source/serato2rekordbox-web/issues" target="_blank" rel="noopener">GitHub Issues</a> 回報。`,
  },

  "zh-Hans": {
    "meta.title": "Serato → Rekordbox 转换工具(离线网页版)",
    "app.title": "Serato → Rekordbox 转换工具",
    "app.subtitle": "离线网页版 · 纯浏览器端执行",
    "notice.clientSide": "这个页面完全在你的浏览器里执行,音乐文件只会在本机被读取来解析 Cue 信息,不会通过网络传送到任何地方,也不会离开这台电脑。关掉分页数据就消失了。",
    "notice.backup": `<strong>建议:</strong>虽然本工具只会「读取」你的音乐文件与 Serato 资料库、不会覆写或修改原始文件,转换前还是建议先备份好你的音乐文件夹与 <code>_Serato_</code> 文件夹,以防万一(例如硬盘异常、误删等与本工具无关的意外)。`,

    "common.btnSelectFolder": "选择文件夹",
    "common.notSelected": "尚未选择",
    "common.btnClearReselect": "清空重选",
    "common.macHeading": "🍎 macOS",
    "common.winHeading": "🪟 Windows",
    "common.pathUsuallyIs": "路径通常是:",

    "video.heading": "📺 教学影片",
    "step1.heading": "① Serato 播放列表(选填,用来还原歌曲顺序)",
    "step1.dropzoneText": `把 <code>_Serato_</code> 文件夹或单一 <code>.crate</code> 文件拖到这里,或`,
    "step1.btnSelectFile": "选择 .crate 文件",
    "step1.help.summary": `❓ 不知道 <code>.crate</code> 文件在哪里?点这里看说明`,
    "step1.help.macDesc": `里面每一个 <code>.crate</code> 文件就是一个 Serato 播放列表(crate),文件名就是列表名称。可以整个 <code>_Serato_</code> 文件夹一起拖进上面,或是只挑几个 <code>.crate</code> 文件上传。`,
    "step1.help.winPathExample": `C:\\Users\\你的账号\\Music\\_Serato_\\Subcrates\\`,
    "step1.help.winDesc": `同样地,每个 <code>.crate</code> 文件就是一个播放列表。如果列表名称里有用文件夹分类(子列表),文件名会用 <code>%%</code> 分隔,例如 <code>Techno%%Hard.crate</code> 代表「Techno」文件夹下面的「Hard」子列表,不影响直接选取使用。`,

    "step2.heading": "② 音乐文件夹(单一文件夹)",
    "step2.dropzoneText": "把「一个」音乐文件夹拖到这里,或",
    "step2.rootPlaceholderDefault": "例如 /Users/yourname/Music/IMDJ",
    "step2.help.summary": "❓ 不知道怎么找到完整路径?点这里看 Mac / Windows 教学",
    "step2.help.mac.li1": `用 Spotlight(<kbd>⌘</kbd>+<kbd>空格键</kbd>)打开「终端 Terminal」`,
    "step2.help.mac.li2": "直接把你的音乐文件夹从 Finder 拖进 Terminal 窗口里",
    "step2.help.mac.li3": `路径文字会自动打出来,选起来复制(<kbd>⌘C</kbd>),贴到上面的栏位就好(不用按 Enter)`,
    "step2.help.mac.terminalTitle": "终端",
    "step2.help.mac.dragHint": "拖进来 →",
    "step2.help.win.li1": `在文件资源管理器里,点一下「选取」你的音乐文件夹(不要打开它)`,
    "step2.help.win.li2": `按住 <kbd>Shift</kbd> 再按鼠标右键,菜单里点「复制为路径」`,
    "step2.help.win.li3": `贴到上面的栏位;如果前后有引号 <code>"</code>,记得删掉`,
    "step2.help.win.title": "📁 文件资源管理器",
    "step2.help.win.selectedHint": "(已选取)",
    "step2.help.win.menuOpen": "打开",
    "step2.help.win.menuCopyPath": "复制为路径",
    "step2.help.win.menuRename": "重命名",
    "step2.help.win.hintline": `<kbd>Shift</kbd> + 右键`,

    "step3.heading": "③ 选项",
    "step3.checkboxLabel": "转换 Hot Cue / Loop 信息",
    "step3.desc": "开启:Hot Cue、Loop 完全比照 Serato 原始设定转换过去。关闭:完全不处理 Cue/Hot Cue/Loop,只转换歌曲本身的信息(标题、演出者、专辑等)。",

    "step4.heading": "④ 开始转换",
    "step4.btnConvert": "开始转换",
    "step4.progressNotStarted": "尚未开始",
    "step4.btnDownloadXml": "下载 Rekordbox XML",
    "step4.btnDownloadReport": "下载报告(report.txt)",

    "step5.heading": "⑤ 怎么把 XML 导入 Rekordbox",
    "step5.li1": `打开 Rekordbox,点左上角菜单进入「<strong>喜好設定</strong>」(偏好设置)`,
    "step5.li2": `上方标签点「<strong>檢視</strong>」(视图),再点左边的「<strong>配置</strong>」(布局),在「<strong>樹狀檢視</strong>」(树状视图)里确认「<strong>rekordbox xml</strong>」已经打勾(没打勾的话,导入后左侧列表不会出现这个项目)`,
    "step5.li3": `上方标签点「<strong>進階</strong>」(高级),再点左边的「<strong>資料庫</strong>」(数据库)`,
    "step5.li4": `找到「<strong>rekordbox xml</strong>」区块里的「<strong>匯入資料庫</strong>」(导入数据库)栏位,按旁边的「<strong>瀏覽</strong>」(浏览)按钮`,
    "step5.li5": `选你刚刚下载的那个 <code>.xml</code> 文件(通常在「下载项目」文件夹里),选完关掉偏好设置窗口`,
    "step5.li6": `左侧列表会自动出现「<strong>rekordbox xml</strong>」项目,展开就能看到「全部音轨」和你的播放列表`,
    "step5.li7": `在想要的播放列表上按<strong>右键</strong>,选择「<strong>匯入播放清單</strong>」(导入播放列表),才算真正加进你的曲库(单纯看得到不算导入)`,
    "step5.note1": `💡 小提示:Rekordbox 导入播放列表时只会读取歌曲路径,建立曲目与播放列表的连接;实际的 Hot Cue、Memory Cue 数据要等你点开这首歌曲播放/加载后,Rekordbox 才会真正分析并写入。所以导入后,建议把播放列表里的歌曲都点开播放一次,确保 Cue 点数据正确同步显示。`,
    "step5.help.summary": "❓ 不知道画面在哪里?点这里看图解教学(附截图)",
    "step5.caption2": "步骤②:偏好设置 → 视图 → 配置,确认「rekordbox xml」已勾选",
    "step5.caption345": "步骤③④⑤:偏好设置 → 高级 → 数据库,选好 XML 文件再按浏览",
    "step5.caption67": "步骤⑥⑦:左侧会出现「rekordbox xml」,在播放列表上按右键选「导入播放列表」",
    "step5.alt2": "Rekordbox 视图设置,确认 rekordbox xml 已勾选",
    "step5.alt345": "Rekordbox 偏好设置画面",
    "step5.alt67": "Rekordbox 右键菜单导入播放列表",
    "step5.callout2": "② 确认已勾选",
    "step5.callout3": "③ 進階(高级)",
    "step5.callout4": "④ 資料庫(数据库)",
    "step5.callout5": "⑤ 选 XML,按浏览",
    "step5.callout6": "⑥ 你的播放列表",
    "step5.callout7": "⑦ 按右键→导入播放列表",

    "footer.privacy": "隐私权政策",
    "footer.disclaimer": "免责声明",
    "footer.reportIssue": "反馈问题",
    "footer.contactEmail": "或给我们发邮件",
    "footer.blogHotcue": "Hot Cue 同步教程",
    "footer.faq": "常见问题",

    "status.serato.loaded": "已读取 {count} 个 .crate 播放列表:{shown}{suffix}",
    "status.serato.loadedSuffix": " 等,共 {n} 个",
    "status.serato.scannedNoCrate": "扫到 {count} 个文件,但里面没有任何 .crate(例如:{sample})。请确认选到的文件夹底下真的有 Subcrates 文件夹、里面是 .crate 文件。",

    "step2.rootLabel": "「{folder}」文件夹在你电脑上的完整路径:",
    "step2.rootPlaceholder": "例如 /Users/yourname/Music/{folder}",
    "step2.rootWhyHint": "为什么还要另外输入路径?基于浏览器安全限制,网页没办法自动侦测文件夹在你电脑上的实际位置,需要手动贴上才能生成正确的文件位置。",
    "status.music.selectedIgnored": "已选择「{folder}」,共 {count} 个音乐文件(这里只支持单一文件夹,已忽略:{ignored})",
    "status.music.selected": "已选择 {count} 个音乐文件",

    "progress.scanning": "扫描音乐文件并读取 Cue 信息",
    "progress.loadingCrates": "读取 Serato 播放列表",
    "progress.buildingXml": "生成 Rekordbox XML",
    "progress.labelFormat": "{label} ({done}/{total})",

    "log.scanDone": "扫描完成:OK {ok}、NOCUE {nocue}、ERROR {error}",
    "log.playlistsLoaded": "已读取 {count} 个播放列表",
    "log.done": "完成!可以下载 XML 了。",
    "log.unexpectedError": "发生未预期的错误:{error}",

    "summary.main": "共 {total} 个文件:OK {ok}、NOCUE {nocue}、ERROR {error}。",
    "summary.playlistMatch": " 播放列表比对:缺少 {missing}、模糊比对 {fuzzy}。",
    "summary.noPlaylist": " 没有导入播放列表。",

    "privacy.title": "隐私权政策 — Serato → Rekordbox 转换工具",
    "privacy.h1": "隐私权政策",
    "privacy.subtitle": "Serato → Rekordbox 转换工具(离线网页版)",
    "privacy.section1.h2": "这个工具怎么处理你的数据",
    "privacy.section1.p1": `本工具是一个纯前端(client-side)网页应用程序。你选取或拖入的音乐文件、Serato 播放列表(<code>.crate</code>)数据,全部只会在<strong>你自己电脑上的浏览器里</strong>被读取与解析,用来生成 Rekordbox XML 文件。整个过程中,这些文件内容<strong>不会通过网络上传、传送或存储到任何服务器</strong>,包含本网站本身的服务器在内。`,
    "privacy.section1.p2": "你关闭分页或重新整理页面后,所有已读取的数据就会从浏览器内存中清除。",
    "privacy.section2.h2": "本机存储(localStorage)",
    "privacy.section2.p1": `为了方便使用,本工具会用浏览器的 <code>localStorage</code> 记住你输入过的「音乐文件夹绝对路径」文字,纯粹是为了下次不用重新输入。这笔数据只存在你自己的浏览器里,不会被传送出去,你可以随时通过浏览器设置清除网站数据来移除它。`,
    "privacy.section3.h2": "Cookie 与广告",
    "privacy.section3.p1": `本网站使用 <strong>Google AdSense</strong> 投放广告。Google 及其广告合作伙伴可能会使用 Cookie 或类似技术,依你之前访问本网站及其他网站的记录,投放个性化广告。这部分数据的收集与使用由 Google 主导,与本工具的「转换功能」完全分开(转换功能仍是 100% 在你自己的浏览器里执行,不会上传任何音乐文件或路径信息)。你可以前往 <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google 广告设置</a> 管理或关闭个性化广告,也可以参考 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Google 合作伙伴网站如何使用 Cookie</a> 的说明。`,
    "privacy.section4.h2": "网站托管",
    "privacy.section4.p1": `本网站由 GitHub Pages 提供静态网页托管。GitHub 可能依其自身服务需求,记录基本的服务器访问记录(例如 IP 地址、浏览器信息),这部分不属于本工具的控制范围,详情请参考 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub 的隐私权声明</a>。`,
    "privacy.section5.h2": "未来若有变更",
    "privacy.section5.p1": "若本工具未来新增其他会收集数据的功能(例如网站流量分析工具),会在此页面更新说明。",
    "common.backToTool": "← 回到转换工具",

    "faq.title": "常见问题 — Serato → Rekordbox 转换工具",
    "faq.h1": "常见问题",
    "faq.q1.h2": "这个工具跟 Serato、Pioneer DJ(rekordbox)官方有合作或授权关系吗?",
    "faq.q1.p1": `没有。这是个人开发、免费提供的非官方工具,与 Serato Inc.、AlphaTheta Corporation(rekordbox / Pioneer DJ)并无任何隶属、合作或授权关系,详见<a href="disclaimer.html">免责声明</a>。`,
    "faq.q2.h2": "我的音乐文件会被上传到服务器吗?",
    "faq.q2.p1": `不会。整个转换过程 100% 在你自己的浏览器里执行,音乐文件与路径信息都不会通过网络传送到任何服务器,详见<a href="privacy.html">隐私权政策</a>。`,
    "faq.q3.h2": "支持哪些音乐文件格式?",
    "faq.q3.p1": "MP3、FLAC、WAV、AIFF、M4A/ALAC。",
    "faq.q4.h2": "Hot Cue、Loop 信息转换的准确度如何?",
    "faq.q4.p1": "工具会直接读取 Serato 原始的 Cue 数据并对应到 Rekordbox 的格式,绝大多数情况能正确转换。不过两边软件的 Cue 系统设计不完全相同(例如颜色显示、数量上限等细节),建议导入 Rekordbox 后实际比对一次,确认结果符合预期。",
    "faq.q5.h2": "为什么还要手动输入音乐文件夹路径,不能自动侦测吗?",
    "faq.q5.p1": "基于浏览器安全限制,网页没办法自动读取文件夹在你电脑上的实际绝对路径,只能取得文件本身的内容与文件名。所以需要手动贴上路径文字,生成的 XML 才能让 Rekordbox 正确找到音乐文件的位置。",
    "faq.q6.h2": "转换完成后,要怎么把 XML 导入 Rekordbox?",
    "faq.q6.p1": `回到<a href="index.html">转换工具首页</a>,下方步骤⑤有完整的图文教学(含截图),照着操作即可。导入后如果发现 Hot Cue 是空的,可以参考这篇<a href="blog-hotcue-sync.html">Hot Cue 同步教程</a>,说明了 Rekordbox 导入机制的原理与正确检查步骤。`,
    "faq.q7.h2": "下载的报告里,ERROR 或 NOCUE 是什么意思?",
    "faq.q7.p1": "ERROR 代表这首歌在转换时发生错误(例如文件格式不支持或已损坏);NOCUE 代表没有读取到这首歌的 Serato Cue 信息(可能是这首歌原本在 Serato 里就没有设置过 Hot Cue/Loop)。可以下载 report.txt 查看详细清单。",
    "faq.q8.h2": "使用前为什么建议先备份?",
    "faq.q8.p1": "本工具设计上只会「读取」你的文件,不会覆写或修改任何原始文件。但任何操作前先备份都是好习惯,可以避免与本工具无关的意外(例如硬盘或操作系统问题)导致数据丢失。",
    "faq.q9.h2": "这个工具需要付费吗?",
    "faq.q9.p1": "完全免费。源代码采用 MIT 许可证,公开在 GitHub 上。",
    "faq.q10.h2": "支持手机或平板使用吗?",
    "faq.q10.p1": "建议使用桌面版浏览器(如 Chrome、Edge、Firefox)。因为需要选取整个音乐文件夹,手机浏览器普遍不支持这项功能。",
    "faq.q11.h2": "Windows 和 Mac 都能用吗?",
    "faq.q11.p1": "都可以。这是纯网页工具,只要浏览器支持即可,不需要另外安装任何软件。",
    "faq.q12.h2": "使用时遇到问题,或有功能建议,要怎么反馈?",
    "faq.q12.p1": `欢迎到 <a href="https://github.com/mingforwork68-source/serato2rekordbox-web/issues" target="_blank" rel="noopener">GitHub Issues</a> 页面反馈,链接也在每个页面的页脚。`,

    "disclaimer.title": "免责声明 — Serato → Rekordbox 转换工具",
    "disclaimer.h1": "免责声明",
    "disclaimer.section1.h2": "非官方工具",
    "disclaimer.section1.p1": `本工具为个人开发、提供给 DJ 自行转换自己音乐库用的非官方小工具,与 Serato Inc.、AlphaTheta Corporation(rekordbox / Pioneer DJ)并无任何隶属、合作、授权或背书关系。「Serato」「rekordbox」等名称及商标均为其个别公司所有。`,
    "disclaimer.section2.h2": "使用范围",
    "disclaimer.section2.p1": `本工具仅供使用者转换<strong>自己合法拥有或有权使用</strong>的音乐文件与播放列表数据,音乐文件本身的著作权仍归原创作者/发行方所有。使用者须自行确保对所处理的音乐文件与元数据拥有合法使用权限,并自行负责后续使用行为是否合乎当地法规。`,
    "disclaimer.section3.h2": "建议先备份",
    "disclaimer.section3.p1": `本工具在设计上只会「读取」你的音乐文件与 <code>_Serato_</code> 文件夹内容,不会写入或修改任何原始文件。即便如此,仍强烈建议在使用本工具前,先备份好你的音乐文件夹与 Serato 资料库,以避免任何与本工具无关的意外(例如操作系统、硬盘或其他软件造成的问题)导致数据丢失。`,
    "disclaimer.section4.h2": "不保证结果正确",
    "disclaimer.section4.p1": "本工具以「现状」(as-is)提供,不保证生成的 Rekordbox XML 文件在所有情况下都完全正确,也不保证能兼容所有版本的 Rekordbox。导入前后请自行核对曲目、播放列表、Hot Cue/Loop 等信息是否符合预期。",
    "disclaimer.section5.h2": "责任限制",
    "disclaimer.section5.p1": "使用本工具即表示你已详阅并同意本声明的内容,并自行承担使用本工具的一切风险。在法律允许的最大范围内,开发者不对因使用或无法使用本工具而导致的任何数据丢失、损毁或其他损失负责。",

    "article1.title": "Hot Cue 没有同步?一次搞懂 Rekordbox 导入 Serato 播放列表的原理 — Serato → Rekordbox 转换工具",
    "article1.h1": "Hot Cue 没有同步?一次搞懂 Rekordbox 导入 Serato 播放列表的原理",
    "article1.subtitle": "为什么导入播放列表后,Hot Cue、Memory Cue 却是空的",
    "article1.section1.h2": "你是不是也遇过这个状况",
    "article1.section1.p1": "用转换工具把 Serato 的播放列表转成 Rekordbox 的 XML,导入后打开清单,歌曲都在,顺序也对,但点开歌曲一看,Hot Cue 却完全没有,好像转换没有生效一样。别急着怀疑转换工具出错,这其实是 Rekordbox 导入机制本身的行为,几乎每个第一次从 Serato 换过来的 DJ 都会踩到。",
    "article1.section2.h2": "Rekordbox 导入 XML 时,到底做了什么",
    "article1.section2.p1": `当你透过「偏好设定 → 进阶 → 资料库 → 导入资料库」加载一个 rekordbox XML 文件时,Rekordbox 做的事情其实只有两件:第一,读取 XML 里列出的曲目路径,把这些路径对应到你电脑上真正存在的音乐文件;第二,依照 XML 里的播放列表结构,把曲目「链接」进对应的播放列表。整个过程只处理路径跟清单结构,并不会主动去分析音频本身、也不会把 Cue 点数据写进 Rekordbox 自己的曲库数据库里,即使 XML 文件里其实已经包含了完整的 Hot Cue、Memory Cue 坐标信息。`,
    "article1.section3.h2": "Cue 点数据其实一直都在,只是还没「写入」",
    "article1.section3.p1": "真正触发 Rekordbox 读取并写入 Cue 点的动作,是你实际打开这首歌——不管是双击播放清单里的曲目加载到 Deck,或是在浏览器里右键选择播放预览,只要 Rekordbox 真正解析过这首歌的音频一次,它才会把 XML 里附带的 Cue 点信息写进自己的数据库,之后这些 Cue 点才会固定显示在曲目信息里,不用每次都重新加载。换句话说,导入播放列表只是完成了「牵线」的动作,Cue 点数据的「入库」还需要你亲自把每首歌至少打开过一次。",
    "article1.section4.h2": "正确的导入后检查流程",
    "article1.section4.list": `<ol><li>导入播放列表后,先展开清单确认曲目数量、顺序是否正确</li><li>依序点开播放列表里的每一首歌(双击加载到任一个 Deck 即可,不需要真的播放完)</li><li>加载后留意 Deck 画面下方是否出现 Hot Cue 色块、或波形上出现 Memory Cue 标记</li><li>全部加载过一轮后,再回到播放列表任意点开一首歌确认 Cue 点是否已经稳定显示(此时不用再重新加载就能看到)</li><li>若曲目数量非常多,建议分批处理,例如先处理当周要用的歌单,而不是整个曲库一次全部点开</li></ol>`,
    "article1.section5.h2": "顺手就能避免的坑",
    "article1.section5.p1": "部分 DJ 会因为看到播放列表已经导入、曲目数量也对就直接关掉 Rekordbox,下次到场地才发现 Cue 点是空的。建议养成「导入当下就把要用的歌单全部点开过一次」的习惯,尤其是表演前一天转换曲库时,千万别留到上场前才发现没做这一步。",
    "article1.cta.h2": "还没转换过自己的曲库?",
    "article1.cta.p1": `如果你还没转换过自己的 Serato 曲库,可以直接使用免费的 <a href="index.html">Serato → Rekordbox 转换工具</a>,或观看首页内嵌的完整教学影片,一步一步跟着操作。有任何转换上的问题,也欢迎到 <a href="https://github.com/mingforwork68-source/serato2rekordbox-web/issues" target="_blank" rel="noopener">GitHub Issues</a> 回报。`,
  },

  "en": {
    "meta.title": "Serato → Rekordbox Converter (Offline Web Version)",
    "app.title": "Serato → Rekordbox Converter",
    "app.subtitle": "Offline Web Version · Runs Entirely In Your Browser",
    "notice.clientSide": "This page runs entirely in your browser. Your music files are only read locally to parse Cue data — nothing is sent over the network or leaves this computer. Closing the tab clears everything.",
    "notice.backup": `<strong>Tip:</strong> This tool only <em>reads</em> your music files and Serato database — it never overwrites or modifies the originals. Even so, please back up your music folder and <code>_Serato_</code> folder before converting, just in case (e.g. disk issues or accidental deletion unrelated to this tool).`,

    "common.btnSelectFolder": "Choose Folder",
    "common.notSelected": "Not selected yet",
    "common.btnClearReselect": "Clear & Reselect",
    "common.macHeading": "🍎 macOS",
    "common.winHeading": "🪟 Windows",
    "common.pathUsuallyIs": "The path is usually:",

    "video.heading": "📺 Tutorial Video",
    "step1.heading": "① Serato Playlists (optional — used to restore track order)",
    "step1.dropzoneText": `Drag your <code>_Serato_</code> folder or a single <code>.crate</code> file here, or`,
    "step1.btnSelectFile": "Choose .crate File",
    "step1.help.summary": `❓ Not sure where your <code>.crate</code> files are? Click here`,
    "step1.help.macDesc": `Each <code>.crate</code> file inside is one Serato playlist (crate) — the file name is the playlist name. You can drag the whole <code>_Serato_</code> folder in, or just pick a few <code>.crate</code> files.`,
    "step1.help.winPathExample": `C:\\Users\\YourName\\Music\\_Serato_\\Subcrates\\`,
    "step1.help.winDesc": `Likewise, each <code>.crate</code> file is one playlist. If a playlist is organized in a subfolder, the file name uses <code>%%</code> as a separator — e.g. <code>Techno%%Hard.crate</code> means the "Hard" sub-playlist inside the "Techno" folder. This doesn't affect selecting the files directly.`,

    "step2.heading": "② Music Folder (single folder only)",
    "step2.dropzoneText": "Drag a single music folder here, or",
    "step2.rootPlaceholderDefault": "e.g. /Users/yourname/Music/IMDJ",
    "step2.help.summary": "❓ Not sure how to find the full path? Click here for a Mac / Windows guide",
    "step2.help.mac.li1": `Open Spotlight (<kbd>⌘</kbd>+<kbd>Space</kbd>) and launch "Terminal"`,
    "step2.help.mac.li2": "Drag your music folder from Finder straight into the Terminal window",
    "step2.help.mac.li3": `The path text will appear automatically — select and copy it (<kbd>⌘C</kbd>) and paste it into the field above (no need to press Enter)`,
    "step2.help.mac.terminalTitle": "Terminal",
    "step2.help.mac.dragHint": "Drag in →",
    "step2.help.win.li1": `In File Explorer, click once to "select" your music folder (don't open it)`,
    "step2.help.win.li2": `Hold <kbd>Shift</kbd> and right-click, then choose "Copy as path" from the menu`,
    "step2.help.win.li3": `Paste it into the field above; if there are quote marks <code>"</code> at each end, remove them`,
    "step2.help.win.title": "📁 File Explorer",
    "step2.help.win.selectedHint": "(selected)",
    "step2.help.win.menuOpen": "Open",
    "step2.help.win.menuCopyPath": "Copy as path",
    "step2.help.win.menuRename": "Rename",
    "step2.help.win.hintline": `<kbd>Shift</kbd> + Right-click`,

    "step3.heading": "③ Options",
    "step3.checkboxLabel": "Convert Hot Cue / Loop data",
    "step3.desc": "On: Hot Cues and Loops are converted exactly as set in Serato. Off: Cue/Hot Cue/Loop data is skipped entirely — only the track's own metadata (title, artist, album, etc.) is converted.",

    "step4.heading": "④ Start Conversion",
    "step4.btnConvert": "Start Conversion",
    "step4.progressNotStarted": "Not started yet",
    "step4.btnDownloadXml": "Download Rekordbox XML",
    "step4.btnDownloadReport": "Download Report (report.txt)",

    "step5.heading": "⑤ How to Import the XML into Rekordbox",
    "step5.li1": `Open Rekordbox, click the menu in the top-left corner, and go into "<strong>喜好設定</strong>" (Preferences)`,
    "step5.li2": `Click the "<strong>檢視</strong>" (View) tab at the top, then "<strong>配置</strong>" (Layout) on the left, and make sure "<strong>rekordbox xml</strong>" is checked under "<strong>樹狀檢視</strong>" (Tree View) — otherwise it won't show up in the sidebar after importing`,
    "step5.li3": `Click the "<strong>進階</strong>" (Advanced) tab at the top, then "<strong>資料庫</strong>" (Database) on the left`,
    "step5.li4": `Find the "<strong>匯入資料庫</strong>" (Import Database) field inside the "<strong>rekordbox xml</strong>" section, and click the "<strong>瀏覽</strong>" (Browse) button next to it`,
    "step5.li5": `Select the <code>.xml</code> file you just downloaded (usually in your "Downloads" folder), then close the preferences window`,
    "step5.li6": `A "<strong>rekordbox xml</strong>" entry will automatically appear in the sidebar — expand it to see "All Tracks" and your playlists`,
    "step5.li7": `<strong>Right-click</strong> the playlist you want and choose "<strong>匯入播放清單</strong>" (Import Playlist) — that's what actually adds it to your library (just seeing it listed there doesn't count as imported)`,
    "step5.note1": `💡 Tip: When Rekordbox imports a playlist, it only reads the track paths to link tracks into your library — the actual Hot Cue / Memory Cue data isn't analyzed and written until you actually open/load each track in Rekordbox. So after importing, it's a good idea to load every track in the playlist at least once to make sure the cue points sync and show up correctly.`,
    "step5.help.summary": "❓ Not sure where these screens are? Click here for screenshots",
    "step5.caption2": "Steps ②: Preferences → View → Layout, make sure \"rekordbox xml\" is checked",
    "step5.caption345": "Steps ③④⑤: Preferences → Advanced → Database, pick the XML file then click Browse",
    "step5.caption67": "Steps ⑥⑦: \"rekordbox xml\" appears on the left — right-click a playlist and choose Import Playlist",
    "step5.alt2": "Rekordbox View settings, confirming rekordbox xml is checked",
    "step5.alt345": "Rekordbox Preferences screen",
    "step5.alt67": "Rekordbox right-click menu, Import Playlist",
    "step5.callout2": "② Make sure it's checked",
    "step5.callout3": "③ 進階 (Advanced)",
    "step5.callout4": "④ 資料庫 (Database)",
    "step5.callout5": "⑤ Select XML, click Browse",
    "step5.callout6": "⑥ Your playlists",
    "step5.callout7": "⑦ Right-click → Import Playlist",

    "footer.privacy": "Privacy Policy",
    "footer.disclaimer": "Disclaimer",
    "footer.reportIssue": "Report an Issue",
    "footer.contactEmail": "or email us",
    "footer.blogHotcue": "Hot Cue Sync Guide",
    "footer.faq": "FAQ",

    "status.serato.loaded": "Loaded {count} .crate playlist(s): {shown}{suffix}",
    "status.serato.loadedSuffix": ", and more ({n} total)",
    "status.serato.scannedNoCrate": "Scanned {count} file(s) but found no .crate files (e.g. {sample}). Make sure the selected folder actually contains a Subcrates folder with .crate files inside.",

    "step2.rootLabel": "Full path of the \"{folder}\" folder on your computer:",
    "step2.rootPlaceholder": "e.g. /Users/yourname/Music/{folder}",
    "step2.rootWhyHint": "Why do I need to type the path too? Due to browser security restrictions, the page can't automatically detect a folder's real location on your computer, so it needs to be pasted in manually to generate the correct file paths.",
    "status.music.selectedIgnored": "Selected \"{folder}\" — {count} music file(s) (only a single folder is supported here; ignored: {ignored})",
    "status.music.selected": "Selected {count} music file(s)",

    "progress.scanning": "Scanning music files and reading Cue data",
    "progress.loadingCrates": "Reading Serato playlists",
    "progress.buildingXml": "Generating Rekordbox XML",
    "progress.labelFormat": "{label} ({done}/{total})",

    "log.scanDone": "Scan complete: OK {ok}, NOCUE {nocue}, ERROR {error}",
    "log.playlistsLoaded": "Loaded {count} playlist(s)",
    "log.done": "Done! You can download the XML now.",
    "log.unexpectedError": "Unexpected error: {error}",

    "summary.main": "{total} file(s) total: OK {ok}, NOCUE {nocue}, ERROR {error}.",
    "summary.playlistMatch": " Playlist matching: {missing} missing, {fuzzy} fuzzy-matched.",
    "summary.noPlaylist": " No playlists were imported.",

    "privacy.title": "Privacy Policy — Serato → Rekordbox Converter",
    "privacy.h1": "Privacy Policy",
    "privacy.subtitle": "Serato → Rekordbox Converter (Offline Web Version)",
    "privacy.section1.h2": "How this tool handles your data",
    "privacy.section1.p1": `This tool is a purely client-side web app. Any music files or Serato playlist (<code>.crate</code>) data you select or drag in are read and parsed <strong>entirely inside your own browser</strong>, in order to generate a Rekordbox XML file. At no point is any of this file content <strong>uploaded, transmitted, or stored on any server</strong> — including this site's own server.`,
    "privacy.section1.p2": "Once you close the tab or reload the page, all loaded data is cleared from browser memory.",
    "privacy.section2.h2": "Local storage (localStorage)",
    "privacy.section2.p1": `For convenience, this tool uses the browser's <code>localStorage</code> to remember the "music folder absolute path" text you've typed, purely so you don't have to retype it next time. This data stays only in your own browser, is never transmitted anywhere, and you can remove it any time by clearing this site's data in your browser settings.`,
    "privacy.section3.h2": "Cookies & Advertising",
    "privacy.section3.p1": `This site uses <strong>Google AdSense</strong> to display ads. Google and its advertising partners may use cookies or similar technologies to serve personalized ads based on your prior visits to this and other websites. This data collection and use is handled by Google and is entirely separate from this tool's conversion functionality (which still runs 100% in your own browser and never uploads any music files or path information). You can manage or opt out of personalized ads at <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ads Settings</a>, and learn more at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">How Google uses information from sites that use our services</a>.`,
    "privacy.section4.h2": "Hosting",
    "privacy.section4.p1": `This site is hosted as a static site on GitHub Pages. GitHub may, per its own service needs, log basic server access data (such as IP address and browser info); this is outside this tool's control — see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub's Privacy Statement</a> for details.`,
    "privacy.section5.h2": "If this changes in the future",
    "privacy.section5.p1": "If this tool adds any further data-collecting feature in the future (e.g. website traffic analytics), this page will be updated to disclose it.",
    "common.backToTool": "← Back to the converter",

    "faq.title": "FAQ — Serato → Rekordbox Converter",
    "faq.h1": "Frequently Asked Questions",
    "faq.q1.h2": "Is this tool officially affiliated with or licensed by Serato or Pioneer DJ (rekordbox)?",
    "faq.q1.p1": `No. This is an independently-developed, free, unofficial tool with no affiliation, partnership, or license from Serato Inc. or AlphaTheta Corporation (rekordbox / Pioneer DJ) — see the <a href="disclaimer.html">Disclaimer</a> for details.`,
    "faq.q2.h2": "Are my music files uploaded to a server?",
    "faq.q2.p1": `No. The entire conversion runs 100% in your own browser — music files and path information are never sent over the network to any server. See the <a href="privacy.html">Privacy Policy</a> for details.`,
    "faq.q3.h2": "What audio file formats are supported?",
    "faq.q3.p1": "MP3, FLAC, WAV, AIFF, and M4A/ALAC.",
    "faq.q4.h2": "How accurate is the Hot Cue / Loop conversion?",
    "faq.q4.p1": "The tool reads Serato's original Cue data directly and maps it to Rekordbox's format, which works correctly in the vast majority of cases. That said, the two apps' Cue systems aren't identical in every detail (e.g. color display, maximum count), so it's worth double-checking the result after importing into Rekordbox.",
    "faq.q5.h2": "Why do I still need to type the music folder path manually — can't it be detected automatically?",
    "faq.q5.p1": "Due to browser security restrictions, a web page can't automatically read a folder's real absolute path on your computer — it only gets the file contents and names. That's why the path needs to be pasted in manually, so the generated XML can point Rekordbox to the correct file locations.",
    "faq.q6.h2": "How do I import the XML into Rekordbox after converting?",
    "faq.q6.p1": `Go back to the <a href="index.html">converter homepage</a> — step ⑤ has a full walkthrough with screenshots. If your Hot Cues look empty after importing, check out the <a href="blog-hotcue-sync.html">Hot Cue Sync Guide</a>, which explains how Rekordbox's import actually works and how to verify it.`,
    "faq.q7.h2": "What do ERROR and NOCUE mean in the downloaded report?",
    "faq.q7.p1": "ERROR means that track failed to convert (e.g. an unsupported or corrupted file format). NOCUE means no Serato Cue data was found for that track (it may simply never have had Hot Cues/Loops set in Serato). Download report.txt for the full breakdown.",
    "faq.q8.h2": "Why is backing up recommended before use?",
    "faq.q8.p1": "By design, this tool only reads your files and never overwrites or modifies any original file. Even so, backing up before any operation is good practice, guarding against unrelated mishaps (e.g. disk or OS issues) causing data loss.",
    "faq.q9.h2": "Does this tool cost anything?",
    "faq.q9.p1": "It's completely free. The source code is open under the MIT License on GitHub.",
    "faq.q10.h2": "Does it work on mobile or tablets?",
    "faq.q10.p1": "A desktop browser (Chrome, Edge, Firefox, etc.) is recommended, since selecting an entire folder isn't generally supported by mobile browsers.",
    "faq.q11.h2": "Does it work on both Windows and Mac?",
    "faq.q11.p1": "Yes, both. It's a pure web tool — any supported browser works, with no separate software to install.",
    "faq.q12.h2": "How do I report a problem or suggest a feature?",
    "faq.q12.p1": `Please open an issue on <a href="https://github.com/mingforwork68-source/serato2rekordbox-web/issues" target="_blank" rel="noopener">GitHub Issues</a> — the link is also in every page's footer.`,

    "disclaimer.title": "Disclaimer — Serato → Rekordbox Converter",
    "disclaimer.h1": "Disclaimer",
    "disclaimer.section1.h2": "Unofficial tool",
    "disclaimer.section1.p1": `This is an independently-developed, unofficial tool made for DJs to convert their own music library, and has no affiliation, partnership, license, or endorsement from Serato Inc. or AlphaTheta Corporation (rekordbox / Pioneer DJ). "Serato", "rekordbox" and related names/trademarks belong to their respective owners.`,
    "disclaimer.section2.h2": "Intended use",
    "disclaimer.section2.p1": `This tool is intended only for converting music files and playlist data that you <strong>legally own or are otherwise authorized to use</strong>. Copyright in the music files themselves remains with the original creators/rightsholders. You are responsible for ensuring you have the legal right to process the files and metadata involved, and for complying with applicable laws in how you use the results.`,
    "disclaimer.section3.h2": "Back up first",
    "disclaimer.section3.p1": `By design, this tool only <em>reads</em> your music files and <code>_Serato_</code> folder contents — it never writes to or modifies any original file. Even so, it's strongly recommended that you back up your music folder and Serato database before use, to guard against any unrelated mishap (e.g. an OS, disk, or other software issue) causing data loss.`,
    "disclaimer.section4.h2": "No guarantee of correctness",
    "disclaimer.section4.p1": "This tool is provided \"as is\", with no guarantee that the generated Rekordbox XML will be correct in every situation, nor that it's compatible with every version of Rekordbox. Please verify tracks, playlists, and Hot Cue/Loop data yourself before and after importing.",
    "disclaimer.section5.h2": "Limitation of liability",
    "disclaimer.section5.p1": "By using this tool, you confirm that you have read and agree to this disclaimer, and that you use it entirely at your own risk. To the maximum extent permitted by law, the developer is not liable for any data loss, corruption, or other damages arising from use or inability to use this tool.",

    "article1.title": "Hot Cues Not Syncing? How Rekordbox Actually Imports a Serato XML — Serato → Rekordbox Converter",
    "article1.h1": "Hot Cues Not Syncing? How Rekordbox Actually Imports a Serato XML",
    "article1.subtitle": "Why Hot Cues and Memory Cues can look empty right after importing a playlist",
    "article1.section1.h2": "Have you run into this?",
    "article1.section1.p1": "You convert your Serato playlist into a Rekordbox XML, import it, and the playlist looks right — all the tracks are there, in the right order. But when you open a track, the Hot Cues are just... gone, as if the conversion didn't work. Don't assume the converter is broken — this is actually how Rekordbox's import behaves, and almost every DJ moving from Serato for the first time hits it.",
    "article1.section2.h2": "What Rekordbox actually does when it imports an XML",
    "article1.section2.p1": `When you load a rekordbox XML file via Preferences → Advanced → Database → Database Import, Rekordbox really only does two things: it reads the track paths listed in the XML and matches them to the actual music files on your computer, and it links those tracks into the playlists described in the XML. That's it — it only processes paths and playlist structure. It does not proactively analyze the audio itself, and it does not write cue point data into Rekordbox's own library database, even though the XML file already contains the full Hot Cue and Memory Cue coordinates.`,
    "article1.section3.h2": "The cue data is already there — it just hasn't been \"written in\" yet",
    "article1.section3.p1": "What actually triggers Rekordbox to read and commit the cue points is you opening the track yourself — either by double-clicking it into a deck, or previewing it from the browser. Only once Rekordbox has actually analyzed that track's audio once does it write the cue point data from the XML into its own database, after which those cues show up permanently without needing to reload the track. In other words, importing a playlist only \"wires up\" the connection — getting the cue data actually stored still requires you to open each track at least once.",
    "article1.section4.h2": "The right way to check after importing",
    "article1.section4.list": `<ol><li>After importing, expand the playlist and confirm the track count and order look right</li><li>Open every track in the playlist one by one (double-clicking to load it into a deck is enough — you don't need to actually play it through)</li><li>After loading, check whether Hot Cue markers and Memory Cue points appear on the waveform</li><li>Once you've gone through the whole list, reopen any track from the playlist and confirm the cues now show up immediately without reloading</li><li>For very large libraries, do this in batches — start with whatever playlist you need for your next gig instead of your entire collection at once</li></ol>`,
    "article1.section5.h2": "An easy mistake to avoid",
    "article1.section5.p1": "Some DJs see the playlist imported with the right track count and close Rekordbox right away, only to discover at the venue that the cues are empty. Make it a habit to open every track in a playlist right after importing it — especially the night before a gig, so you're not finding out the hard way right before you go on.",
    "article1.cta.h2": "Haven't converted your library yet?",
    "article1.cta.p1": `If you haven't converted your Serato library yet, try the free <a href="index.html">Serato → Rekordbox Converter</a>, or watch the full tutorial video embedded on the homepage to follow along step by step. Run into an issue? Feel free to report it on <a href="https://github.com/mingforwork68-source/serato2rekordbox-web/issues" target="_blank" rel="noopener">GitHub Issues</a>.`,
  },
};

window.S2R_I18N = (function () {
  var STORAGE_KEY = "s2r_lang";
  var SUPPORTED = ["zh-Hant", "zh-Hans", "en"];

  function detectDefault() {
    try {
      var fromUrl = new URLSearchParams(location.search).get("lang");
      if (fromUrl && SUPPORTED.indexOf(fromUrl) !== -1) {
        try { localStorage.setItem(STORAGE_KEY, fromUrl); } catch (e) {}
        return fromUrl;
      }
    } catch (e) {}
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var nav = (navigator.language || "zh-Hant").toLowerCase();
    if (nav.indexOf("zh") === 0) {
      return nav.indexOf("hans") !== -1 || nav.indexOf("cn") !== -1 || nav.indexOf("sg") !== -1 ? "zh-Hans" : "zh-Hant";
    }
    if (nav.indexOf("en") === 0) return "en";
    return "zh-Hant";
  }

  var currentLang = detectDefault();

  function format(str, params) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, function (m, k) {
      return params[k] !== undefined ? params[k] : m;
    });
  }

  function t(key, params) {
    var dict = window.S2R_DICT[currentLang] || window.S2R_DICT["zh-Hant"];
    var fallback = window.S2R_DICT["zh-Hant"];
    var str = (dict && dict[key]) || (fallback && fallback[key]) || key;
    return format(str, params);
  }

  function applyStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-lang-switcher]").forEach(function (el) {
      el.value = currentLang;
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    location.reload();
  }

  function getLang() { return currentLang; }

  return { t: t, getLang: getLang, setLang: setLang, applyStaticTranslations: applyStaticTranslations, SUPPORTED: SUPPORTED };
})();

window.S2R_I18N.applyStaticTranslations();
