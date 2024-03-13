import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>My Test Site</h1>
    <p>This is a test site for embedding a verification JS tag.</p>
    <button id="getAdIdButton">Get Advertising ID</button>
    <div id="ad-info"></div>
  </div>
`

const getAdIdButton = document.querySelector<HTMLButtonElement>('#getAdIdButton');
getAdIdButton?.addEventListener('click', () => {
  // @ts-ignore
  getAdvertisingId();
});