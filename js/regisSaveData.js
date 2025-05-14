document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const registerButton = document.getElementById('registerButton');
    const messageArea = document.getElementById('messageArea');
    const passwordInput = document.getElementById('password');
    const avatarRadios = document.querySelectorAll('input[name="avatar"]');
    const LOCAL_STORAGE_KEY = 'all_registration_data';

    if (!registrationForm || !registerButton || !messageArea || !passwordInput || avatarRadios.length === 0) {
        console.error("必需的表单元素未找到（包括新添加的密码或头像选项）。");
        return;
    }

    registerButton.addEventListener('click', function () {
        const userData = {};

        const userNameInput = document.getElementById('userName');
        if (userNameInput) userData.userName = userNameInput.value.trim();

        const userRoleSelect = document.getElementById('userRole');
        if (userRoleSelect) {
            const selectedOption = userRoleSelect.options[userRoleSelect.selectedIndex];
            userData.userRoleValue = selectedOption.value;
            userData.userRoleText = selectedOption.text;
        }

        let selectedAvatar = null;
        for (const radio of avatarRadios) {
            if (radio.checked) {
                selectedAvatar = radio.value;
                break;
            }
        }
        userData.avatar = selectedAvatar;

        const touchValInput = document.getElementById('touchVal');
        if (touchValInput) userData.touchValue = touchValInput.value.trim();

        userData.password = passwordInput.value;

        const genderRadios = document.querySelectorAll('input[name="gender"]');
        for (const radio of genderRadios) {
            if (radio.checked) {
                userData.gender = radio.value;
                break;
            }
        }

        const hobbyCheckboxes = document.querySelectorAll('input[name="hobbies"]:checked');
        userData.hobbies = [];
        hobbyCheckboxes.forEach(checkbox => {
            userData.hobbies.push(checkbox.value);
        });

        const notesTextarea = document.getElementById('notes');
        if (notesTextarea) userData.notes = notesTextarea.value.trim();

        const labelText = document.getElementById('touchValLabel') ? document.getElementById('touchValLabel').textContent.replace('：', '') : '相关ID';
        if (!userData.userName || !userData.touchValue || !userData.password) {
            displayMessage(`姓名、${labelText}和密码是必填项。`, 'error');
            return;
        }
        if (userData.avatar === null) {
            displayMessage("请选择一个头像。", 'error');
            return;
        }

        let allUsers = [];
        const storedDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (storedDataJSON) {
            try {

                allUsers = JSON.parse(storedDataJSON);

                if (!Array.isArray(allUsers)) {
                    console.warn("LocalStorage 数据格式不正确，重新初始化为空数组。");
                    allUsers = [];
                }
            } catch (e) {
                console.error("解析 LocalStorage 数据失败:", e);
                displayMessage("读取已保存数据失败，将创建新列表。", 'error');
                allUsers = [];
            }
        }

        const isDuplicate = allUsers.some(existingUser => {
            return existingUser.userName === userData.userName &&
                existingUser.userRoleValue === userData.userRoleValue &&
                existingUser.touchValue === userData.touchValue;
        });

        if (isDuplicate) {
            displayMessage("该用户已注册，请勿重复提交！", 'error');
            return;
        }

        userData.registrationTimestamp = Date.now();

        allUsers.push(userData);

        try {
            const updatedDataJSON = JSON.stringify(allUsers);
            localStorage.setItem(LOCAL_STORAGE_KEY, updatedDataJSON);
            displayMessage("保存成功，当前已注册用户数：" + allUsers.length, 'success');

        } catch (e) {
            console.error("保存数据到 LocalStorage 失败:", e);
            if (e.name === 'QuotaExceededError') {
                displayMessage("保存失败：浏览器存储空间不足。", 'error');
            } else {
                displayMessage("保存失败，请检查浏览器或稍后再试。", 'error');
            }
        }
    });

    function displayMessage(msg, type) {
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

    messageArea.textContent = '';
});