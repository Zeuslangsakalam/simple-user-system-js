document.addEventListener('DOMContentLoaded', function () {
    const infoUserName = document.getElementById('infoUserName');
    const infoUserAvatar = document.getElementById('infoUserAvatar');
    const infoTouchValue = document.getElementById('infoTouchValue');
    const infoGender = document.getElementById('infoGender');
    const infoUserRole = document.getElementById('infoUserRole');
    const infoHobbies = document.getElementById('infoHobbies');
    const infoNotes = document.getElementById('infoNotes');
    const messageArea = document.getElementById('messageArea');
    const infoTable = document.querySelector('#info-table');
    const CURRENT_USER_STORAGE_KEY = 'current_user';
    const avatarImagesMap = {
        '1': '../imgs/pixel_cactus.jpg',
        '2': '../imgs/pixel_orange.jpg',
        '3': '../imgs/pixel_travelfrog.jpg'
    };

    if (messageArea) {
        messageArea.textContent = '';
        messageArea.className = '';
    }

    function displayMessage(msg, type) {
        if (!messageArea) {
            console.warn("Message area element not found.");
            return;
        }
        messageArea.textContent = msg;
        messageArea.className = '';
        messageArea.classList.add(type + '-message');

        if (messageArea.timeoutId) {
            clearTimeout(messageArea.timeoutId);
        }
        if (type === 'success') {
            messageArea.timeoutId = setTimeout(() => {
                messageArea.textContent = '';
                messageArea.className = '';
            }, 5000);
        } else {
            messageArea.timeoutId = setTimeout(() => {
                messageArea.textContent = '';
                messageArea.className = '';
            }, 30000);
        }
    }

    const currentUserJSON = sessionStorage.getItem(CURRENT_USER_STORAGE_KEY);

    if (currentUserJSON) {
        try {
            const currentUser = JSON.parse(currentUserJSON);

            if (currentUser && typeof currentUser === 'object' && currentUser.userName) {
                if (infoUserName && infoTouchValue && infoGender && infoUserRole && infoHobbies && infoNotes && infoUserAvatar && infoTable) {
                    infoUserName.textContent = currentUser.userName || 'N/A';
                    infoTouchValue.textContent = currentUser.touchValue || 'N/A';
                    let genderText = 'N/A';
                    if (currentUser.gender === '1') genderText = '男';
                    else if (currentUser.gender === '0') genderText = '女';
                    infoGender.textContent = genderText;

                    infoUserRole.textContent = currentUser.userRoleText || 'N/A';
                    const hobbiesText = (Array.isArray(currentUser.hobbies) && currentUser.hobbies.length > 0) ? currentUser.hobbies.join(', ') : '无';
                    infoHobbies.textContent = hobbiesText;

                    infoNotes.textContent = currentUser.notes || '无';

                    const avatarValue = currentUser.avatar;
                    const avatarSrc = avatarImagesMap[avatarValue];
                    if (avatarSrc) {
                        infoUserAvatar.src = avatarSrc;
                        infoUserAvatar.style.display = 'inline-block';
                    } else {
                        infoUserAvatar.style.display = 'none';
                        infoUserAvatar.src = '';
                    }

                    infoTable.style.display = '';

                } else {
                    console.error("INFO: 部分表格元素未找到，无法完全填充信息。");
                    if (infoArea) infoTable.style.display = '';
                }

            } else {
                console.error("Invalid user data format in sessionStorage. Clearing and redirecting.");
                sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
                handleNotLoggedIn();
            }

        } catch (e) {
            console.error("Error parsing user data from sessionStorage:", e);
            sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
            handleNotLoggedIn();
        }

    } else {
        handleNotLoggedIn();
    }

    function handleNotLoggedIn() {
        displayMessage("未登录，请先登录！3秒后跳转至登录页...", 'error');

        if (infoTable) {
            infoTable.style.display = 'none';
        }

        setTimeout(() => {
            window.location.href = '../htmls/login.html';
        }, 3000);
    }
});