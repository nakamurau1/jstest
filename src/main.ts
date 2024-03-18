import './style.css'

// 要素の取得
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
    <div>
        <h1>My Test Site</h1>
        <p>This is a test site for embedding a verification JS tag.</p>
        <button id="saveRequestIdButton">Set Request ID</button>
        <button id="sendConversionEventButton">Send Conversion Event</button>
        <div id="ad-info"></div>
    </div>
`;

const adInfo = document.querySelector<HTMLDivElement>('#ad-info')!;
const saveRequestIdButton = document.querySelector<HTMLButtonElement>('#saveRequestIdButton')!;
const sendConversionEventButton = document.querySelector<HTMLButtonElement>('#sendConversionEventButton')!;


// メッセージハンドラの型定義
interface MessageHandler {
  postMessage(message: any): void;
}

// ウィンドウオブジェクトの型定義
interface CustomWindow extends Window {
  webkit?: {
    messageHandlers: {
      saveRequestId?: MessageHandler;
      sendConversionEvent?: MessageHandler;
    };
  };
}

// カスタムウィンドウオブジェクトの取得
const customWindow = window as unknown as CustomWindow;

// リクエストIDの保存
const saveRequestId = () => {
  const requestId = 'test-request-id';
  if (customWindow.webkit?.messageHandlers?.saveRequestId) {
    customWindow.webkit.messageHandlers.saveRequestId.postMessage(requestId);
    adInfo.textContent = `Request ID "${requestId}" has been sent to the app.`;
  } else {
    adInfo.textContent = 'Save Request ID handler not found.';
  }
};

// コンバージョンイベントの送信
const sendConversionEvent = () => {
  const conversionUrl = 'https://example.com/conversion?requestId={requestId}';
  if (customWindow.webkit?.messageHandlers?.sendConversionEvent) {
    customWindow.webkit.messageHandlers.sendConversionEvent.postMessage(conversionUrl);
    adInfo.textContent = `Conversion event with URL "${conversionUrl}" has been sent to the app.`;
  } else {
    adInfo.textContent = 'Send Conversion Event handler not found.';
  }
};

// ボタンのクリックイベントリスナーの設定
saveRequestIdButton.addEventListener('click', saveRequestId);
sendConversionEventButton.addEventListener('click', sendConversionEvent);
