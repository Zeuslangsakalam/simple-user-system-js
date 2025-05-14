document.addEventListener('DOMContentLoaded', function () {
    const userInfoArea = document.getElementById('userInfoArea');
    const userNameSpan = userInfoArea ? userInfoArea.querySelector('span') : null;
    const logoutButton = document.getElementById('logoutButton');
    const navLinks = document.getElementById('navLinks');
    const messageArea = document.getElementById('messageArea');
    const currentUserAvatar = document.getElementById('currentUserAvatar');
    const CURRENT_USER_STORAGE_KEY = 'current_user';
    const avatarImagesMap = {
        '1': 'pixel_cactus.jpg',
        '2': 'pixel_orange.jpg',
        '3': 'pixel_travelfrog.jpg'
    };
    const isHtmlsSubdir = window.location.pathname.includes('/htmls/');
    const imgPathPrefix = isHtmlsSubdir ? '../imgs/' : 'imgs/';

    if (!userInfoArea || !userNameSpan || !logoutButton || !currentUserAvatar) {
        console.error("WARN: 首页/信息页必需的头部元素未找到。Login status display will not work fully.");
    }

    function updateHeaderDisplay() {
        const currentUserJSON = sessionStorage.getItem(CURRENT_USER_STORAGE_KEY);

        if (currentUserJSON) {
            try {
                const currentUser = JSON.parse(currentUserJSON);
                if (userNameSpan) userNameSpan.textContent = `欢迎 ${currentUser.userName} (${currentUser.userRoleText})`;
                if (userInfoArea) userInfoArea.classList.add('logged-in');

                const avatarValue = currentUser.avatar;
                const imageFileName = avatarImagesMap[avatarValue];
                const avatarSrc = imageFileName ? imgPathPrefix + imageFileName : '';
                if (currentUserAvatar) {
                    currentUserAvatar.src = avatarSrc;
                    currentUserAvatar.style.display = avatarSrc ? 'inline-block' : 'none';
                }

                if (logoutButton) logoutButton.style.display = 'inline-block';

                if (navLinks) {
                    navLinks.classList.add('hide-links');
                }

            } catch (e) {
                console.error("Error parsing current user data from sessionStorage:", e);
                sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
                updateHeaderDisplay();
            }
        } else {
            if (userNameSpan) userNameSpan.textContent = '';
            if (userInfoArea) userInfoArea.classList.remove('logged-in');

            if (currentUserAvatar) {
                currentUserAvatar.src = '';
            }

            if (logoutButton) logoutButton.style.display = 'none';

            if (navLinks) {
                navLinks.classList.remove('hide-links');
            }
        }
    }

    function displayMessage(msg, type) {
        if (!messageArea) {
            console.warn("Message area element not found.");
            return;
        }
        messageArea.textContent = msg;
        messageArea.className = '';
        messageArea.classList.add(type + '-message');

        // 消息显示一段时间后消失（可选）
        if (messageArea.timeoutId) {
            clearTimeout(messageArea.timeoutId);
        }
        messageArea.timeoutId = setTimeout(() => {
            messageArea.textContent = '';
            messageArea.className = '';
        }, type === 'success' ? 5000 : 10000);
    }

    function handleLogout() {
        sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
        updateHeaderDisplay();
        displayMessage("您已退出登录。", 'success');
    }

    updateHeaderDisplay();

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    if (messageArea) {
        messageArea.textContent = '';
    }
});