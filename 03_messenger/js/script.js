import { db, ref, update, get, onValue, push, set } from './firebase.js';

const loginForm = document.getElementById("loginForm");
const loginInput = document.getElementById("login");
const signInPage = document.querySelector(".login-container");
const chatPage = document.querySelector(".chat-container");

let nickname = "";

const checkOwnNickname = async () => {
    try {
        const userListRef = ref(db, "users/userList");
        const snapshot = await get(userListRef);
        const userList = snapshot.val() || {};
        const ownNickname = userList.nicknames && userList.nicknames.find(nick => nick === nickname);

        if (ownNickname) {
            return ownNickname;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    nickname = loginInput.value.trim();

    if (nickname) {
        try {
            const userListRef = ref(db, 'users/userList');
            const snapshot = await get(userListRef);
            const currentData = snapshot.val() || {};
            const updatedNicknames = [...(currentData.nicknames || []), nickname];

            await update(userListRef, {
                nicknames: updatedNicknames
            });

            signInPage.classList.remove("active");
            chatPage.classList.add("active");

            loadMessages();

        } catch (error) {
            alert(`닉네임을 저장하는 데 문제가 발생했습니다: ${error.message}`);
        }
    } else {
        alert("닉네임을 입력해주세요.");
    }
});

const messagesContainer = document.getElementById("messageContainer");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("sendMessage");

const generateHexCode = () => {
    return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, "0")}`;
};

const messagesRef = ref(db, 'chat/messages');

const loadMessages = async () => {
    try {
        const ownNickname = await checkOwnNickname();

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            const messages = data ? Object.values(data) : [];

            messagesContainer.innerHTML = messages.map(msg => {
                const isOwnMessage = msg.nickname === ownNickname;
                return `
                <li class="chat-message-item ${isOwnMessage ? 'right' : ''}">
                    <strong class="chat-message-nickname" style="background-color: ${msg.color};">
                        💁🏻‍ ${msg.nickname}
                    </strong>
                    <p class="chat-message-text">${msg.text}</p>
                    <span class="chat-message-date">${msg.timestamp}</span>
                </li>
                `;
            }).join('');

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    } catch (error) {
        console.error("메시지 로딩 오류:", error);
    }
};

messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputMessage = messageInput.value.trim();

    if (inputMessage) {
        try {
            const currentDateTime = new Date();
            const hours = currentDateTime.getHours();
            const minutes = currentDateTime.getMinutes();
            const ampm = hours >= 12 ? '오후' : '오전';
            const formattedHours = hours % 12 || 12;
            const formattedDateTime = `${currentDateTime.getMonth() + 1}월 ${currentDateTime.getDate()}일 ${ampm} ${formattedHours}시 ${minutes}분`;

            const newMessage = {
                nickname: nickname,
                text: inputMessage,
                timestamp: formattedDateTime,
                color: generateHexCode()
            };

            const newMessageRef = push(messagesRef);
            await set(newMessageRef, newMessage);

            messageInput.value = "";
        } catch (error) {
            alert("메시지를 전송하는 데 문제가 발생했습니다.");
        }
    }
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        messageForm.requestSubmit();
    }
});