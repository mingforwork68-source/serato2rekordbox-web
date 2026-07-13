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

    "status.serato.loaded": "已讀取 {count} 個 .crate 播放列表:{shown}{suffix}",
    "status.serato.loadedSuffix": " 等,共 {n} 個",
    "status.serato.scannedNoCrate": "掃到 {count} 個檔案,但裡面沒有任何 .crate(例如:{sample})。請確認選到的資料夾底下真的有 Subcrates 資料夾、裡面是 .crate 檔案。",

    "step2.rootLabel": "「{folder}」資料夾在你電腦上的完整路徑:",
    "step2.rootPlaceholder": "例如 /Users/yourname/Music/{folder}",
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
    "privacy.section3.h2": "Cookie 與追蹤",
    "privacy.section3.p1": "本工具目前沒有使用任何 Cookie、分析工具(如 Google Analytics)或廣告。",
    "privacy.section4.h2": "網站託管",
    "privacy.section4.p1": `本網站由 GitHub Pages 提供靜態網頁託管。GitHub 可能依其自身服務需求,記錄基本的伺服器存取紀錄(例如 IP 位址、瀏覽器資訊),這部分不屬於本工具的控制範圍,詳情請參考 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub 的隱私權聲明</a>。`,
    "privacy.section5.h2": "未來若有變更",
    "privacy.section5.p1": "若本工具未來新增任何會蒐集資料、使用 Cookie 或投放廣告的功能,會在此頁面更新說明。",
    "common.backToTool": "← 回到轉換工具",

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

    "status.serato.loaded": "已读取 {count} 个 .crate 播放列表:{shown}{suffix}",
    "status.serato.loadedSuffix": " 等,共 {n} 个",
    "status.serato.scannedNoCrate": "扫到 {count} 个文件,但里面没有任何 .crate(例如:{sample})。请确认选到的文件夹底下真的有 Subcrates 文件夹、里面是 .crate 文件。",

    "step2.rootLabel": "「{folder}」文件夹在你电脑上的完整路径:",
    "step2.rootPlaceholder": "例如 /Users/yourname/Music/{folder}",
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
    "privacy.section3.h2": "Cookie 与追踪",
    "privacy.section3.p1": "本工具目前没有使用任何 Cookie、分析工具(如 Google Analytics)或广告。",
    "privacy.section4.h2": "网站托管",
    "privacy.section4.p1": `本网站由 GitHub Pages 提供静态网页托管。GitHub 可能依其自身服务需求,记录基本的服务器访问记录(例如 IP 地址、浏览器信息),这部分不属于本工具的控制范围,详情请参考 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub 的隐私权声明</a>。`,
    "privacy.section5.h2": "未来若有变更",
    "privacy.section5.p1": "若本工具未来新增任何会收集数据、使用 Cookie 或投放广告的功能,会在此页面更新说明。",
    "common.backToTool": "← 回到转换工具",

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

    "status.serato.loaded": "Loaded {count} .crate playlist(s): {shown}{suffix}",
    "status.serato.loadedSuffix": ", and more ({n} total)",
    "status.serato.scannedNoCrate": "Scanned {count} file(s) but found no .crate files (e.g. {sample}). Make sure the selected folder actually contains a Subcrates folder with .crate files inside.",

    "step2.rootLabel": "Full path of the \"{folder}\" folder on your computer:",
    "step2.rootPlaceholder": "e.g. /Users/yourname/Music/{folder}",
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
    "privacy.section3.h2": "Cookies & tracking",
    "privacy.section3.p1": "This tool currently does not use any cookies, analytics tools (e.g. Google Analytics), or ads.",
    "privacy.section4.h2": "Hosting",
    "privacy.section4.p1": `This site is hosted as a static site on GitHub Pages. GitHub may, per its own service needs, log basic server access data (such as IP address and browser info); this is outside this tool's control — see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub's Privacy Statement</a> for details.`,
    "privacy.section5.h2": "If this changes in the future",
    "privacy.section5.p1": "If this tool ever adds any feature that collects data, uses cookies, or serves ads, this page will be updated to disclose it.",
    "common.backToTool": "← Back to the converter",

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
  },
};

window.S2R_I18N = (function () {
  var STORAGE_KEY = "s2r_lang";
  var SUPPORTED = ["zh-Hant", "zh-Hans", "en"];

  function detectDefault() {
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
