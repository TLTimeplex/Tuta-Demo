// Types
enum ResultType { file, folder }

// CONSTS
const SERVER_URL = "https://localhost"
// By https://uibakery.io/regex-library/url
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
const DEBOUNCE_TIMER = 500 //ms

// HTML Elements
const InURL = document.getElementById("url") as HTMLInputElement
const OutInfo = document.getElementById("info") as HTMLParagraphElement
const OutResult = document.getElementById("result") as HTMLParagraphElement

// Listener
InURL.addEventListener("keyup", (e) => {
  processInput(InURL.value)
})

// Functions
var timeout: number;

function processInput(input: string): void {
  OutResult.innerText = ""

  if (!URL_REGEX.test(input)) {
    OutInfo.innerText = "Input doesn't match the format of an URL"
    clearTimeout(timeout)
    return
  }

  OutInfo.innerText = ""

  clearTimeout(timeout)

  timeout = setTimeout(() => {
    console.log("FETCH")
    mockFetch(SERVER_URL, { method: "POST", body: JSON.stringify({ data: input }) }).then((data) => {
      OutResult.innerText = "The URL is a " + (data == ResultType.file ? "file" : "folder")
    })
  }, DEBOUNCE_TIMER)
}

async function mockFetch(url: string, parameter: Object): Promise<ResultType> {
  return new Promise((resolve, _) => {
    let rdm = Math.random()
    if (rdm < 0.5)
      resolve(ResultType.file)
    resolve(ResultType.folder)
  })
}