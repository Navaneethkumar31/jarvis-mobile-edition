const chat = document.getElementById('chat');
const input = document.getElementById('msg');
const send = document.getElementById('send');

send.onclick = async () => {

    const t = input.value.trim();

    if (!t) return;

    add('YOU: ' + t, 'user');

    input.value = '';
    send.disabled = true;

    const thinking = document.createElement('div');
    thinking.className = 'msg ai';
    thinking.innerText = 'J.A.R.V.I.S: Thinking...';
    chat.appendChild(thinking);

    try {

        // TEMPORARY TEST ONLY
        const API_KEY = "YOUR_API_KEY_HERE";

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": API_KEY
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: t
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I couldn't generate a response.";

        thinking.innerText =
            "J.A.R.V.I.S: " + answer;

    } catch (error) {

        thinking.innerText =
            "J.A.R.V.I.S ERROR: " + error.message;

        console.error(error);

    } finally {

        send.disabled = false;
        chat.scrollTop = chat.scrollHeight;
    }
};


function add(text, who) {

    const d = document.createElement('div');

    d.className = 'msg ' + who;

    d.innerText = text;

    chat.appendChild(d);

    chat.scrollTop = chat.scrollHeight;
}