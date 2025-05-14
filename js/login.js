document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const messageArea = document.getElementById('messageArea');
    const userInfoArea = document.getElementById('userInfoArea');
    const logoutButton = document.getElementById('logoutButton');
    const touchValLabel = document.getElementById('touchValLabel');
    const userRoleSelect = document.getElementById('userRole');
    const touchValInput = document.getElementById('touchVal');
    const passwordInput = document.getElementById('password');
    const currentUserAvatar = document.getElementById('currentUserAvatar');
    const ALL_USERS_STORAGE_KEY = 'all_registration_data';
    const CURRENT_USER_STORAGE_KEY = 'current_user';
    const avatarImages = {
        '1': '../imgs/pixel_cactus.jpg',
        '2': '../imgs/pixel_orange.jpg',
        '3': '../imgs/pixel_travelfrog.jpg'
    };

    if (!loginForm || !loginButton || !messageArea || !userInfoArea || !logoutButton || !touchValLabel || !userRoleSelect || !touchValInput || !passwordInput || !currentUserAvatar) { // 添加了对 currentUserAvatar 的检查
        console.error("登录页必需的元素未找到（包括新添加的头像图片元素）。");
        return;
    }

    function updateTouchField() {
        const selectedValue = userRoleSelect.value;
        let labelText = '';
        let placeholderText = '';
        switch (selectedValue) {
            case '1': // 管理员
                labelText = 'ID：';
                placeholderText = '输入ID';
                break;
            case '2': // 教师
                labelText = '工号：';
                placeholderText = '输入工号';
                break;
            case '3': // 学生
                labelText = '学号：';
                placeholderText = '输入学号';
                break;
            case '4': // 职工
                labelText = '工号：';
                placeholderText = '输入工号';
                break;
            default:
                labelText = '学号：';
                placeholderText = '输入学号';
                break;
        }
        if (touchValLabel) touchValLabel.textContent = labelText;
        if (touchValInput) touchValInput.placeholder = placeholderText;
    }

    function displayMessage(msg, type) {
        if (!messageArea) return;
        messageArea.textContent = msg;
        messageArea.className = '';
        messageArea.classList.add(type + '-message');

        if (messageArea.timeoutId) {
            clearTimeout(messageArea.timeoutId);
        }
        messageArea.timeoutId = setTimeout(() => {
            messageArea.textContent = '';
            messageArea.className = '';
        }, type === 'success' ? 5000 : 10000);
    }

    function updateHeader() {
        const currentUserJSON = sessionStorage.getItem(CURRENT_USER_STORAGE_KEY);
        const userNameSpan = userInfoArea.querySelector('span');

        if (currentUserJSON) {
            try {
                const currentUser = JSON.parse(currentUserJSON);
                userNameSpan.textContent = `欢迎 ${currentUser.userName} (${currentUser.userRoleText})`;
                userInfoArea.classList.add('logged-in');

                const avatarValue = currentUser.avatar;
                const avatarSrc = avatarImages[avatarValue] || '';
                if (currentUserAvatar) {
                    currentUserAvatar.src = avatarSrc;
                    currentUserAvatar.style.display = avatarSrc ? 'inline-block' : 'none';
                }

                logoutButton.style.display = 'inline-block';

            } catch (e) {
                console.error("解析当前登录用户数据失败:", e);
                sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
                updateHeader();
            }
        } else {
            userNameSpan.textContent = '';
            userInfoArea.classList.remove('logged-in');

            if (currentUserAvatar) {
                currentUserAvatar.src = '';
                currentUserAvatar.style.display = 'none';
            }
            logoutButton.style.display = 'none';
        }
    }

    userRoleSelect.addEventListener('change', updateTouchField);

    loginButton.addEventListener('click', function () {
        const inputUserName = document.getElementById('userName').value.trim();
        const inputUserRoleValue = document.getElementById('userRole').value;
        const inputTouchValue = document.getElementById('touchVal').value.trim();
        const inputPassword = document.getElementById('password').value;

        const currentLabelText = touchValLabel.textContent.replace('：', '');
        if (!inputUserName || !inputTouchValue || !inputPassword) {
            displayMessage(`请输入姓名、${currentLabelText}和密码。`, 'error');
            return;
        }

        const storedDataJSON = localStorage.getItem(ALL_USERS_STORAGE_KEY);
        let allUsers = [];

        if (storedDataJSON) {
            try {
                allUsers = JSON.parse(storedDataJSON);
                if (!Array.isArray(allUsers)) {
                    console.warn("LocalStorage 数据格式不正确，重置为无数据。");
                    allUsers = [];
                }
            } catch (e) {
                console.error("解析 LocalStorage 数据失败:", e);
                displayMessage("读取注册数据失败，无法登录。", 'error');
                return;
            }
        }

        if (allUsers.length === 0) {
            displayMessage("数据库中没有注册用户，请先注册。", 'error');
            return;
        }

        const foundUser = allUsers.find(user => {
            return user.userName === inputUserName &&
                user.userRoleValue === inputUserRoleValue &&
                user.touchValue === inputTouchValue &&
                user.password === inputPassword;
        });

        if (foundUser) {
            displayMessage("登录成功！即将跳转至首页...", 'success');

            try {
                sessionStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(foundUser));
                updateHeader();
                loginForm.reset();
                setTimeout(() => { window.location.href = '../index.html'; }, 2000);
            } catch (e) {
                console.error("保存当前登录用户到 SessionStorage 失败:", e);
                displayMessage("登录状态保存失败，请稍后再试。", 'error');
            }

        } else {
            displayMessage(`登录失败：用户名、身份、${currentLabelText}或密码不匹配。`, 'error');
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            sessionStorage.removeItem(CURRENT_USER_STORAGE_KEY);
            updateHeader();
            loginForm.reset();
            displayMessage("您已退出登录。", 'success');
        });
    }

    updateHeader();
    updateTouchField();
    if (messageArea) messageArea.textContent = '';
});